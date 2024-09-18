import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@the-golden-foundation/api'
 
export const trpc = createTRPCReact<AppRouter>();