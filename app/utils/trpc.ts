import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@the-golden-foundation/api/server'
 
export const trpc = createTRPCReact<AppRouter>();