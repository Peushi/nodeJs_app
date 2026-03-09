import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let dbPath

// Use /tmp in Docker/production, otherwise use local path
if (process.env.NODE_ENV === 'production') {
  dbPath = '/tmp/database.sqlite'
} else if (path.isAbsolute(config.databaseUrl)) {
  dbPath = config.databaseUrl
} else {
  dbPath = path.join(__dirname, '../../', config.databaseUrl)
}

console.log(`📊 Database path: ${dbPath}`)

// Allow SQLite to create the file if it doesn’t exist
const db = new Database(dbPath, { fileMustExist: false })

db.pragma('foreign_keys = ON')

export default db