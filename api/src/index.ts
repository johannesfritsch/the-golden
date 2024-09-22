import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { config } from 'dotenv';
import { verifyDeviceId } from './device-verification.js';

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
        return { waitlistEntered: true, estimatedTimeRemaining: 1000000000, waitlistPosition: 1000 };
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