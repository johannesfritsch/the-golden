import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('devices')
		.addColumn('uniqueId', 'varchar(100)', col => col.notNull().primaryKey())
		.addColumn('createdAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('updatedAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('devices').execute();
}
