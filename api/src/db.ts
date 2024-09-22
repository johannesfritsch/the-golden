import { DB } from './db.d.js' // this is the Database interface we defined earlier
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: 'thegolden',
    host: 'localhost',
    user: 'thegolden',
    port: 5432,
    max: 10,
    password: 'thegolden',
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})


