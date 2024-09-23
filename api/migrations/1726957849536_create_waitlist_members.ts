import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createType("waitlist_age_group")
		.asEnum([
			'18-25',
			'26-35',
			'36-45',
			'46-55',
			'56-65',
			'66-75',
			'76-85',
			'86-95',
			'other'
		])
		.execute();

	await db.schema
		.createType("waitlist_gender")
		.asEnum([
			'm',
			'f',
			'o'
		])
		.execute();

	await db.schema.createTable('waitlist_members')
		// Keys
		.addColumn('deviceUniqueId', 'varchar(100)', col => col.notNull())
		.addForeignKeyConstraint('waitlist_members_fk_deviceUniqueId', ['deviceUniqueId'], 'devices', ['uniqueId'], fk => fk.onDelete('cascade'))
		.addPrimaryKeyConstraint('waitlist_members_pk', ['deviceUniqueId'])
		// Infos
		.addColumn('ageGroup', sql`waitlist_age_group`, col => col.notNull())
		.addColumn('gender', sql`waitlist_gender`, col => col.notNull())
		.addColumn('country', 'varchar(2)', col => col.notNull())
		// Timestamps
		.addColumn('createdAt', 'timestamp', col => col.notNull().defaultTo('now()'))
		.addColumn('updatedAt', 'timestamp', col => col.notNull().defaultTo('now()'))

		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('waitlist_members').execute();
}
