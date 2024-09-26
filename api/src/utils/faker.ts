import { db } from "../db.js"
import crypto from 'crypto';

const createFaker = async () => {
    setInterval(async () => {
        const uniqueId = '00000000-0000-0000-0000-' + crypto.randomBytes(6).toString('hex');

        await db.insertInto('devices').values({
            uniqueId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).onConflict(c => c.doNothing()).execute();

        await db.insertInto('waitlist_members').values({
            deviceUniqueId: uniqueId,
            ageGroup: '18-25',
            gender: 'f',
            countryISO: 'US',
        }).execute();
    }, 60000);
}

export default createFaker;