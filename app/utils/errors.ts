import { TRPCClientError } from "@trpc/client";

export function isErrorCode(error: Error, expectedCode: string) {
    const typedError = error as TRPCClientError<any>;
    return typedError.data?.code === expectedCode;
  }