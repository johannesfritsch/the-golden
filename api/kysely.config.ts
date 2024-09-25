import {
	PostgresDriver,
	PostgresAdapter,
	PostgresIntrospector,
	PostgresQueryCompiler,
} from 'kysely'
import pg from 'pg'
import { defineConfig } from 'kysely-ctl'

export default defineConfig({
	dialect: {
		createAdapter() {
			return new PostgresAdapter()
		},
		createDriver() {
			return new PostgresDriver({
				pool: new pg.Pool({
					connectionString: process.env.DATABASE_URL,
				}),
			})
		},
		createIntrospector(db) {
			return new PostgresIntrospector(db)
		},
		createQueryCompiler() {
			return new PostgresQueryCompiler()
		},
	},
})
