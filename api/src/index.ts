import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { config } from 'dotenv';
import { verifyDeviceId } from './device-verification.js';
import { crc32, decrypt, encrypt } from './utils/crypto.js';
import * as crypto from 'crypto';
import { compareArrays } from './utils/array.js';
import jwt from 'jsonwebtoken';
import { db } from './db.js';
import { sampleEvents } from './data/event.js';

config();

// created for each request
const createContext = async ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const deviceId = await verifyDeviceId(req);
    // Extract the token from the request

    const token = req.headers['authorization']?.split(' ')[1];
    console.log('VERIFY token', token);
    console.log('VERIFY process.env.JWT_SECRET', process.env.JWT_SECRET);
    const decryptedToken = token ? jwt.verify(token, process.env.JWT_SECRET as string) : null;
    console.log('decryptedToken', decryptedToken);
    return {
        currentDevice: {
            id: deviceId,
        },
        currentUser: decryptedToken,
    };
}

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
    getWaitlistStatus: t.procedure.input(z.string()).query(async ({ ctx: { currentDevice } }) => {
        return { waitlistEntered: true, estimatedTimeRemaining: 1000000000, waitlistPosition: 5486 };
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

        const decryptionKeyFromPin = crc32(Buffer.from('12345678', 'hex'));

        const keyBuffer = Buffer.concat([decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin]);
        console.log('SIGN: keyBuffer length', keyBuffer.length);
        const encryptedToken = encrypt(Buffer.from(token + '                                  '), Buffer.alloc(16), keyBuffer, 'aes-128-cbc');
        const decryptedToken = decrypt(encryptedToken, Buffer.alloc(16), keyBuffer, 'aes-128-cbc');
        console.log('SIGN: decryptedToken', decryptedToken.toString('utf8'));

        return { token: encryptedToken.toString('hex') };
    }),
    getEvents: t.procedure.query(async ({ ctx: { currentUser } }) => {
        if (!currentUser) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Please login!' });

        return sampleEvents;
    }),
});

const app = express();
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);
app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});

export type AppRouter = typeof appRouter;