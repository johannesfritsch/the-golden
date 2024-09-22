import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await sql`DROP EXTENSION IF EXISTS "uuid-ossp";`.execute(db);
}
