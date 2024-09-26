import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('device_checkins')
		// Keys
		.addColumn('deviceUniqueId', 'varchar(100)', col => col.notNull())
		.addForeignKeyConstraint('device_checkins_fk_deviceUniqueId', ['deviceUniqueId'], 'devices', ['uniqueId'], fk => fk.onDelete('cascade'))
		.addColumn('hash', 'varchar(255)', col => col.notNull())
		.addPrimaryKeyConstraint('pk', ['deviceUniqueId', 'hash'])
		// Common infos
		.addColumn('deviceId', 'varchar(255)', col => col.notNull())
		.addColumn('buildVersion', 'varchar(255)', col => col.notNull())
		.addColumn('buildNumber', 'varchar(255)', col => col.notNull())
		.addColumn('manufacturer', 'varchar(255)', col => col.notNull())
		.addColumn('systemName', 'varchar(255)', col => col.notNull())
		.addColumn('systemVersion', 'varchar(255)', col => col.notNull())
		.addColumn('isTablet', 'boolean', col => col.notNull())
		.addColumn('deviceType', 'varchar(255)', col => col.notNull())
		.addColumn('buildType', 'varchar(255)', col => col.notNull())
		// Platform specific
		.addColumn('instanceId', 'varchar(255)')
		.addColumn('androidId', 'varchar(255)')
		.addColumn('deviceToken', 'text')
		// Timestamps
		.addColumn('createdAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('updatedAt', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
		.execute();
	await db.schema.createIndex('device_checkins_deviceUniqueId_hash').on('device_checkins').columns(['deviceUniqueId', 'hash']).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropIndex('device_checkins_deviceUniqueId_hash').execute();
	await db.schema.dropTable('device_checkins').execute();
}
