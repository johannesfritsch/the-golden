declare module 'react-native-ntag-424' {
    export default class Ntag424 {
        constructor(nfcManager: any);
        initiate(): Promise<void>;
        selectFile(file: string): Promise<void>;
        authenticateEv2First(keySlot: number, key: Buffer): Promise<void>;
        getCardUid(): Promise<string>;
        terminate(): Promise<void>;
    }
}

declare module 'crypto-browserify' {
    export const createCipheriv: any;
    export const createDecipheriv: any;
}