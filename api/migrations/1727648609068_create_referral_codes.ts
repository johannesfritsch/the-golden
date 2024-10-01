import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('referral_codes')
		.addColumn('id', 'uuid', (c) => c.primaryKey().defaultTo(sql`uuid_generate_v4()`))
		// Verknüpfung zu einem Referrer
		.addColumn('referrerId', 'uuid')
		.addColumn('maxRedemptions', 'integer', (c) => c.notNull().defaultTo(1))
		// Verknüpfung zu einem User
		//.addColumn('userId', 'uuid', (c) => c.references('users.id'))
		// Verknüpfung zu einem waitlist_member
		.addColumn('waitlistMemberId', 'varchar(100)', c => c.unique())
		// Code (zufällig generiert)
		.addColumn('code', 'text', (c) => c.notNull().unique())
		// Preis der 1. Periode (199€ für das EAP)
		.addColumn('initialPrice', 'integer')
		// Länge 1. Periode Mitgliedschaft (2 Jahre)
		.addColumn('initialPeriodLength', 'integer')
		// Preis Folgeperioden (299€ generell)
		.addColumn('extensionPrice', 'integer')
		// Länge 1. Periode Mitgliedschaft (2 Jahre)
		.addColumn('extensionPeriodLength', 'integer')
		// Automatische Verlängerung der Mitgliedschaft
		.addColumn('autoExtend', 'boolean')
		// Wie viel Priorisierung in der Warteliste (0-100)
		.addColumn('waitlistBoost', 'integer')
		// Rabatt pro Event (für PepperKunden 500€)
		.addColumn('eventDiscount', 'integer')
		// Bezeichnung Rabattierung (PepperParties-Rabatt)
		.addColumn('eventDiscountName', 'text')
		// Beschreibung Rabattierung (Erklärung wieso Rabatt)
		.addColumn('eventDiscountDescription', 'text')
		.addForeignKeyConstraint('referral_codes_fk_referrerId', ['referrerId'], 'referrers', ['id'], fk => fk.onDelete('cascade'))
		//.addForeignKeyConstraint('referral_codes_fk_userId', ['userId'], 'users', ['id'], fk => fk.onDelete('cascade'))
		.addForeignKeyConstraint('referral_codes_fk_waitlistMemberId', ['waitlistMemberId'], 'waitlist_members', ['deviceUniqueId'], fk => fk.onDelete('cascade'))
		.execute();
		// Webinar Teilnahme
		// Waitlist Plätze, die übersprungen werden (PepperParties Kunden 1 MIO)
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('referral_codes').execute();
}
