import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('login_pieces')
		.addColumn('cardUid', 'varchar(14)', col => col.notNull())
		.addColumn('pin', 'varchar(6)', col => col.notNull())
		.addColumn('masterKey', 'varchar(32)', col => col.notNull())
		.addColumn('applicationKeySlot', 'int2', col => col.notNull())
		.addColumn('applicationKey', 'varchar(32)', col => col.notNull())
		.addColumn('createdAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('updatedAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.addPrimaryKeyConstraint('login_pieces_pk', ['cardUid']).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('login_pieces').execute();
}
