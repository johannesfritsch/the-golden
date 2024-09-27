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

declare module 'react-native-aes-ecb' {
    export function encrypt(data: string, key: string): string;
    export function decrypt(data: string, key: string): string;
}

declare module 'react-native-config' {
    export interface NativeConfig {
        API_DEVELOPMENT_BASE_URL: string;
        API_PRODUCTION_BASE_URL: string;
    }

    export const Config: NativeConfig
    export default Config
}

declare module 'react-native-confetti';