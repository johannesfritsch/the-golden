import { DB } from './db.d.js' // this is the Database interface we defined earlier
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

console.log('connection parameters to kysely', {
  connectionString: process.env.DATABASE_URL,
});

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})


