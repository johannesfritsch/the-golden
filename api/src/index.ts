import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';
import { config } from 'dotenv';

config();

// created for each request
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
const appRouter = t.router({
    getWaitlistStatus: t.procedure.input(z.string()).query(async (opts) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { waitlistEntered: true, waitlistPosition: 2345 };
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