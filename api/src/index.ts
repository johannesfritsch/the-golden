import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { config } from 'dotenv';
import { verifyDeviceId } from './device-verification.js';
import { decrypt, encrypt } from './utils/crypto.js';
import * as crypto from 'crypto';

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
    loginWithNfc: t.procedure.input(z.string()).mutation(async ({ input, ctx: { currentDevice } }) => {
        const encryptedRandB = Buffer.from(input, 'hex');
        const randB = decrypt(encryptedRandB, Buffer.alloc(16), Buffer.alloc(16), 'aes-128-cbc');
        console.log('randB', randB);

        const randA = await new Promise((resolve) => crypto.randomBytes(16, (_, buf) => resolve(buf))) as Buffer;
        const randBRotatedLeft = Buffer.concat([randB.subarray(1), randB.subarray(0, 1)]);
        const resultToEncrypt = Buffer.concat([randA, randBRotatedLeft]);

        const encryptedResult = encrypt(
            resultToEncrypt,
            Buffer.alloc(16),
            Buffer.alloc(16),
            'aes-128-cbc'
        );

        return { success: true, result: encryptedResult.toString('hex') };
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
    console.log('Listening on http://localhost:' + process.env.PORT);
});

export type AppRouter = typeof appRouter;