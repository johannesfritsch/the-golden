import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createType("provision_value_type")
		.asEnum([
			'percent',
			'absolute',
		])
		.execute();

	await db.schema.createTable('referrers')
		.addColumn('id', 'uuid', (c) => c.primaryKey().defaultTo(sql`uuid_generate_v4()`))
		.addColumn('name', 'text', (c) => c.notNull())
		// Initiale provision (Pepper: 130)
		.addColumn('initialProvision', 'integer', (c) => c.notNull())
		// Initiale provision in Prozent oder absolut (Pepper: absolut)
		.addColumn('initialProvisionType', sql`provision_value_type`, (c) => c.notNull())
		// Verdient bei Verlängerung des Vertrags Betrag (Pepper: 0)
		.addColumn('extensionProvision', 'integer', (c) => c.notNull())
		// Verdient bei Verlängerung des Vertrags Betrag in Prozent oder absolut (Pepper: prozent)
		.addColumn('extensionProvisionType', sql`provision_value_type`, (c) => c.notNull())
		// Maximale Provisionsdauer in Tagen (Pepper: 0)
		.addColumn('maxProvisionDuration', 'integer', (c) => c.notNull()).execute();

	await db.schema.createTable('referrer_addresses')
		.addColumn('id', 'uuid', (c) => c.primaryKey().defaultTo(sql`uuid_generate_v4()`))
		.addColumn('referrerId', 'uuid', (c) => c.notNull().references('referrers.id'))
		.addColumn('nameLine1', 'text', (c) => c.notNull())
		.addColumn('nameLine2', 'text')
		.addColumn('street', 'text', (c) => c.notNull())
		.addColumn('zip', 'text', (c) => c.notNull())
		.addColumn('city', 'text', (c) => c.notNull())
		.addColumn('countryISO', 'varchar(2)', (c) => c.notNull()).execute();

	await db.schema.createTable('referrer_bank_details')
		.addColumn('id', 'uuid', (c) => c.primaryKey().defaultTo(sql`uuid_generate_v4()`))
		.addColumn('referrerId', 'uuid', (c) => c.notNull().references('referrers.id'))
		.addColumn('bankName', 'text', (c) => c.notNull())
		.addColumn('iban', 'text', (c) => c.notNull())
		.addColumn('bic', 'text', (c) => c.notNull()).execute();

	await db.schema.createTable('referrer_contacts')
		.addColumn('id', 'uuid', (c) => c.primaryKey().defaultTo(sql`uuid_generate_v4()`))
		.addColumn('referrerId', 'uuid', (c) => c.notNull().references('referrers.id'))
		.addColumn('name', 'text', (c) => c.notNull())
		.addColumn('email', 'text', (c) => c.notNull())
		.addColumn('phone', 'text', (c) => c.notNull()).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('referrer_addresses').execute();
	await db.schema.dropTable('referrer_bank_details').execute();
	await db.schema.dropTable('referrer_contacts').execute();
	await db.schema.dropTable('referrers').execute();
}
