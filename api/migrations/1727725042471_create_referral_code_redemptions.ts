import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('referral_code_redemptions')
		.addColumn('referralCodeId', 'uuid', (c) => c.references('referral_codes.id').onDelete('cascade').notNull())
		.addColumn('waitlistMemberId', 'varchar(100)', (c) => c.references('waitlist_members.deviceUniqueId').onDelete('cascade').notNull())
		.addColumn('createdAt', 'timestamp', (c) => c.defaultTo(sql`now()`))
		.addColumn('updatedAt', 'timestamp', (c) => c.defaultTo(sql`now()`))
		.addPrimaryKeyConstraint('referral_code_redemptions_pk', ['referralCodeId', 'waitlistMemberId'])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('referral_code_redemptions').execute();
}
