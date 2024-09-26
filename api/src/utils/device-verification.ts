import { TRPCError } from "@trpc/server";
import { privateDecrypt, constants, createHash } from 'crypto';
import { db } from '../db.js';
import express from 'express';

const hashedHeaders = [
    'x-device-id',
    'x-build-version',
    'x-build-number',
    'x-build-type', 
    'x-system-version',
    'x-device-type',
    'x-is-tablet',
    'x-system-name',
    'x-manufacturer',
];

const requiredHeaders = [
    'x-build-type', 
    'x-system-version',
    'x-device-type',
    'x-is-tablet',
    'x-device-id',
    'x-build-version',
    'x-device-time',
    'x-android-id',
    'x-unique-id',
    'x-build-number',
    'x-system-name',
    'x-instance-id',
    'x-manufacturer',
];

export const verifyDeviceId = async (req: express.Request) => {
    if (!req.headers['x-device-sign'] || !req.headers['x-device-time'] || !req.headers['x-unique-id']) throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Your device is not authorized. Missing hashed header.',
    });

    for (const header of requiredHeaders) {
        if (!req.headers[header]) throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Your device is not authorized. Missing required headers.',
        });
    }

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

        if (decryptedUniqueId !== uniqueId || decryptedDatetime !== datetime) throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Your device is not authorized. Invalid signature.',
        });

        try {
            await db.insertInto('devices').values({ uniqueId }).onConflict(db => db.column('uniqueId').doUpdateSet({ updatedAt: new Date() })).execute();

            const hash = createHash('sha256').update(hashedHeaders.map(header => (req.headers[header] || '').toString()).join(' | '), 'utf8').digest('hex');

            await db.insertInto('device_checkins').values({
                deviceUniqueId: uniqueId,
                hash: hash,
                deviceId: req.headers['x-device-id']!.toString(),
                buildVersion: req.headers['x-build-version']!.toString(),
                buildNumber: req.headers['x-build-number']!.toString(),
                instanceId: req.headers['x-instance-id']!.toString(),
                androidId: req.headers['x-android-id']!.toString(),
                deviceToken: req.headers['x-device-token']!.toString(),
                manufacturer: req.headers['x-manufacturer']!.toString(),
                systemName: req.headers['x-system-name']!.toString(),
                systemVersion: req.headers['x-system-version']!.toString(),
                isTablet: req.headers['x-is-tablet']!.toString() === 'true',
                deviceType: req.headers['x-device-type']!.toString(),
                buildType: req.headers['x-build-type']!.toString(),
            }).onConflict(db => db.columns(['deviceUniqueId', 'hash']).doUpdateSet({ updatedAt: new Date() })).execute();

        } catch (e) {
            console.error('Error registering device', e);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'There is an error with the server. Try again later.',
            });
        }

        console.log('Device authorized', uniqueId);
        return uniqueId;
    } catch (e) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Your device is not authorized.',
        });
    }
}