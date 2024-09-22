import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('login_sessions')
		.addColumn('cardUid', 'varchar(14)', col => col.notNull())
		.addColumn('randA', 'varchar(32)', col => col.notNull())
		.addColumn('createdAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.addPrimaryKeyConstraint('login_sessions_pk', ['cardUid', 'createdAt']).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('login_sessions').execute();
}
