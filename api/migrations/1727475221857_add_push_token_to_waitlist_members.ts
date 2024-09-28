import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	db.schema.alterTable('waitlist_members')
		.addColumn('pushToken', 'text', col => col.notNull())
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('waitlist_mebers').dropColumn('token').execute()
}
