import { NfcTech, type NfcManager } from "react-native-nfc-manager";

const compareArrays = (a: Array<number>, b: Array<number>) =>
    a.length === b.length &&
    a.every((element: number, index: number) => element === b[index]);


export class NfcAuth {

    private nfcManager: NfcManager;

    constructor(nfcManager: NfcManager) {
        this.nfcManager = nfcManager;
    }

    public async initiate() {
        await this.nfcManager.requestTechnology(NfcTech.IsoDep);
        console.log('requestTechnology successful');
    }

    public async selectApplicationFile() {
        const response = await this.sendCommand(
            [0x00, 0xa4, 0x00, 0x0c], // APDU header for SELECTFILE command
            [] as number[],
            [
                0xe1, 0x10 // application
            ],
        );
        if (!compareArrays(response, [0x90, 0x00])) 
            throw new Error('selectApplicationFile failed');
        console.log('selectApplicationFile successful');
    }

    public async authenticateEv2FirstPartOne(keySlot: number) {
        const response = await this.sendCommand(
            [0x90, 0x71, 0x00, 0x00], // APDU header
            [keySlot, 0x03, 0x00, 0x00, 0x00], // command header
            [], // command data
        );

        const status = response.slice(16, 18);
        const randBEncrypted = response.slice(0, 16);

        console.log('status', status);
        if (!compareArrays(status, [0x91, 0xAF])) 
            throw new Error('authenticateEv2FirstPartOne failed');

        console.log('authenticateEv2FirstPartOne successful');
        console.log('randBEncrypted', randBEncrypted);

        return randBEncrypted;
    }

    public async authenticateEv2FirstPartTwo(data: number[]) {
        console.log('authenticateEv2FirstPartTwo');
        console.log('data', data);
        console.log('data.length', data.length);

        const response = await this.sendCommand(
            [0x90, 0xAF, 0x00, 0x00], // APDU header
            [], // command header
            data, // command data
        );

        const responseBytes = response.slice(0, 32);
        const statusBytes = response.slice(32, 34);
        
        console.log('statusBytes', statusBytes);

        if (!compareArrays(statusBytes, [0x91, 0x00])) 
            throw new Error('authenticateEv2FirstPartTwo failed');

        console.log('authenticateEv2FirstPartTwo successful');
        console.log('response', response);

        return responseBytes;
    }

    public async sendCommand(apduHeader: number[], commandHeader: number[], commandData: number[]) {
        const commandLength = commandHeader.length + commandData.length;
        const response = await this.nfcManager.isoDepHandler.transceive([
            ...apduHeader,
            ...(commandLength > 0 ? [commandLength] : []),
            ...commandHeader,
            ...commandData,
            0x00,
        ]);
        console.log('sendCommand successful');
        console.log('response', response);
        return response;
    }

    public async terminate() {
        await this.nfcManager.cancelTechnologyRequest();
        console.log('cancelTechnologyRequest successful');
    }

};