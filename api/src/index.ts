import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { config } from 'dotenv';
import { privateDecrypt, constants } from 'crypto';
import { createDeviceStore } from './store.js';

config();

console.log('APP_PRIVATE_KEY', process.env.APP_PRIVATE_KEY);

// created for each request
const createContext = async ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const deviceId = await verifyDeviceId(req);
    const deviceStore = createDeviceStore(deviceId);
    return {
        currentDevice: {
            id: deviceId,
            store: deviceStore,
        },
    };
}

const verifyDeviceId = async (req: express.Request) => {
    if (req.headers['x-device-sign'] && req.headers['x-device-time'] && req.headers['x-unique-id']) {
        const base64str = req.headers['x-device-sign'].toString();
        const datetime = req.headers['x-device-time'].toString();
        const uniqueId = req.headers['x-unique-id'].toString();
        const encryptedBuffer = Buffer.from(base64str, 'base64');

        try {
            const decryptedData = privateDecrypt({
                key: process.env.APP_PRIVATE_KEY as string,
                padding: constants.RSA_PKCS1_OAEP_PADDING, // Adjust if necessary
                oaepHash: 'sha256', // Match the hash function used during encryption
            }, encryptedBuffer);
            const decryptedStr = decryptedData.toString();

            const [decryptedUniqueId, decryptedDatetime] = decryptedStr.split(' | ');

            if (decryptedUniqueId === uniqueId && decryptedDatetime === datetime) {
                console.log('Device authorized', uniqueId);
                return uniqueId;
            } else {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Your device is not authorized',
                });
            }
        } catch (e) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Your device is not authorized',
            });
        }

    } else {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Your device is not authorized',
        });
    }
}

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
    getWaitlistStatus: t.procedure.input(z.string()).query(async ({ ctx: { currentDevice } }) => {
        return currentDevice.store.getWaitlistStatus();
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