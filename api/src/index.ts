import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { config } from 'dotenv';
import { verifyDeviceId } from './device-verification.js';
import { decrypt, encrypt } from './utils/crypto.js';
import * as crypto from 'crypto';
import { compareArrays } from './utils/array.js';
import jwt from 'jsonwebtoken';
import { db } from './db.js';

config();

// created for each request
const createContext = async ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const deviceId = await verifyDeviceId(req);
    return {
        currentDevice: {
            id: deviceId,
        },
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
        const token = jwt.sign({ deviceId: currentDevice.id, cardUid: loginSession.cardUid }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

        return { token };
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
});

export type AppRouter = typeof appRouter;