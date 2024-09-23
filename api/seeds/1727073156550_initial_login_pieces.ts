import type { Kysely } from 'kysely'

export async function seed(db: Kysely<any>): Promise<void> {
	await db.insertInto('login_pieces').values([{
		cardUid: '12345678901234',
		pin: '123456',
		masterKey: '12345678901234567890123456789012',
		applicationKeySlot: 1,
		applicationKey: '12345678901234567890123456789012',
	}]).execute();
}
