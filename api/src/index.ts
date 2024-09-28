import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { verifyDeviceId } from './utils/device-verification.js';
import { crc32, decrypt, encrypt } from './utils/crypto.js';
import * as crypto from 'crypto';
import { compareArrays } from './utils/array.js';
import jwt from 'jsonwebtoken';
import { db } from './db.js';
import { sampleEvents } from './data/event.js';
import i18nCountries from 'i18n-iso-countries';
import createFaker from './utils/faker.js';
import PushNotifications from 'node-pushnotifications';
import fs from 'fs';

// created for each request
const createContext = async ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const deviceId = await verifyDeviceId(req);
    const token = req.headers['authorization']?.split(' ')[1];
    const decryptedToken = token ? jwt.verify(token, process.env.JWT_SECRET as string) : null;
    return {
        currentDevice: {
            id: deviceId,
        },
        currentUser: decryptedToken as {
            deviceId: string;
            cardUid: string;
        },
    };
}

const admissionsPerDay = 20;

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export type GetWaitlistStatusReturnValue = {
    waitlistEntered: false;
} | {
    waitlistEntered: true;
    estimatedTimeRemaining: number;
    waitlistPosition: number;
};

const appRouter = t.router({
    getWaitlistStatus: t.procedure.query(async ({ ctx: { currentDevice } }): Promise<GetWaitlistStatusReturnValue> => {
        const waitlistMember = await db.selectFrom('waitlist_members').selectAll().where('deviceUniqueId', '=', currentDevice.id).executeTakeFirst();
        if (!waitlistMember) return { waitlistEntered: false };

        const res = await db.with('waitlist_members', qb => 
            qb.selectFrom('waitlist_members')
            .selectAll()
            .select(eb => 
                eb.fn.agg<number>('row_number', [])
                .over((ob) => ob.orderBy("createdAt", "asc")) // Add partition by if needed (ob.partitionBy('countryISO'))
                .as('rn'))
            .orderBy('createdAt asc')
        ).selectFrom('waitlist_members')
            .select('rn')
            .where('deviceUniqueId', '=', currentDevice.id)
            .executeTakeFirst();
        
        const admissionRate = 24 * 60 * 60 * 1000 / admissionsPerDay;

        return { waitlistEntered: true, estimatedTimeRemaining: admissionRate * res!.rn, waitlistPosition: res!.rn };
    }),
    enterWaitlist: t.procedure
        .input(z.object({
            ageGroup: z.enum(['18-25', '26-35', '36-45', '46-55', '56-65', '66-75', '76-85', '86-95', 'other']),
            gender: z.enum(['f', 'm', 'o']),
            countryISO: z.string().length(2),
            pushToken: z.string(),
        }))
        .mutation(async ({ input, ctx: { currentDevice } }) => {
            const countryName = i18nCountries.getName(input.countryISO, 'en');
            if (!countryName) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid country code' });
            
            await db.insertInto('waitlist_members').values({ deviceUniqueId: currentDevice.id, ...input }).execute();
            return { success: true };
        }),
    leaveWaitlist: t.procedure
        .mutation(async ({ ctx: { currentDevice } }) => {
            await db.deleteFrom('waitlist_members').where('deviceUniqueId', '=', currentDevice.id).execute();
            return { success: true };
        }),
    loginWithNfcPartOne: t.procedure.input(z.object({
        cardUid: z.string().regex(/^[0-9a-fA-F]{14}$/),
        bytes: z.string().regex(/^[0-9a-fA-F]{32}$/),
    })).mutation(async ({ input: { cardUid: cardUidBytes, bytes }, ctx: { currentDevice } }) => {
        const encryptedRandB = Buffer.from(bytes, 'hex');
        const cardUid = Buffer.from(cardUidBytes, 'hex');

        const randB = decrypt(encryptedRandB, Buffer.alloc(16), Buffer.alloc(16), 'aes-128-cbc');
        const randA = await new Promise((resolve) => crypto.randomBytes(16, (_, buf) => resolve(buf))) as Buffer;

        const randBRotatedLeft = Buffer.concat([randB.subarray(1), randB.subarray(0, 1)]);
        const resultToEncrypt = Buffer.concat([randA, randBRotatedLeft]);

        const encryptedResult = encrypt(
            resultToEncrypt,
            Buffer.alloc(16),
            Buffer.alloc(16),
            'aes-128-cbc'
        );

        await db.insertInto('login_sessions').values({
            cardUid: cardUid.toString('hex'),
            randA: randA.toString('hex'),
        }).execute();

        return { result: encryptedResult.toString('hex') };
    }),
    loginWithNfcPartTwo: t.procedure.input(z.object({
        cardUid: z.string().regex(/^[0-9a-fA-F]{14}$/),
        bytes: z.string(),
    })).mutation(async ({ input: { cardUid, bytes }, ctx: { currentDevice } }) => {
        const loginSession = await db.selectFrom('login_sessions').selectAll().where('cardUid', '=', cardUid).orderBy('createdAt desc').executeTakeFirst();
        if (!loginSession) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Authentication failed. No login session.' });

        const partTwo = decrypt(Buffer.from(bytes, 'hex'), Buffer.alloc(16), Buffer.alloc(16), 'aes-128-cbc');
        const randARotatedLeft = partTwo.subarray(4, 20);
        const randAFromDatabase = Buffer.from(loginSession.randA, 'hex');
        const randARotatedLeftFromSession = Buffer.concat([randAFromDatabase.subarray(1), randAFromDatabase.subarray(0, 1)]);

        if (!compareArrays(Array.from(new Uint8Array(randARotatedLeftFromSession)), Array.from(new Uint8Array(randARotatedLeft))))
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Authentication failed' });

        // Generate jwt token
        console.log('SIGN: process.env.JWT_SECRET', process.env.JWT_SECRET);
        const token = jwt.sign({ deviceId: currentDevice.id, cardUid: loginSession.cardUid }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
        console.log('SIGN: token', token);

        const decryptionKeyFromPin = crc32(Buffer.from('1234', 'hex'));

        const keyBuffer = Buffer.concat([decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin]);
        console.log('SIGN: keyBuffer length', keyBuffer.byteLength);
        // TODO: FIX: This is to avoid the token being capped at 16 bytes
        const encryptedToken = encrypt(Buffer.from(token + '                                  '), Buffer.alloc(16), keyBuffer, 'aes-128-cbc');

        return { token: encryptedToken.toString('hex') };
    }),
    getEvents: t.procedure.query(async ({ ctx: { currentUser } }) => {
        if (!currentUser) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Please login!' });
        return sampleEvents;
    }),
});

const app = express();
app.use(
    '/v:buildnumber/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);
app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});

export type AppRouter = typeof appRouter;

createFaker();



const settings = {
    apn: {
        token: {
            key: process.env.APN_PRIVATE_KEY,
            keyId: process.env.APN_PRIVATE_KEY_ID,
            teamId: process.env.APN_TEAM_ID,
        },
        production: false // true for APN production environment, false for APN sandbox environment,
    },
};
const push = new PushNotifications(settings);

push.send(['a685cf73d103fcf4cb4ec3d539f3dd93322fd99e5b8228cd546a92cd3b5a4fa2'], {
    topic: 'de.jfritsch.thegolden',
    title: 'Hello World4',
    body: 'Hello World4',
}).then((results) => {
    console.log('Results: ', results);
});