import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let dbPath

if (process.env.NODE_ENV === 'production') {
  dbPath = '/tmp/database.sqlite'
} else if (path.isAbsolute(config.databaseUrl)) {
  dbPath = config.databaseUrl
} else {
  dbPath = path.join(__dirname, '../../', config.databaseUrl)
}

console.log(`📊 Database path: ${dbPath}`)

const db = new Database(dbPath, { fileMustExist: false })
db.pragma('foreign_keys = ON')

// ----- re-add initializeDatabase -----
export const initializeDatabase = async () => {
  console.log('🔧 Initializing database...')

  const User = (await import('../models/User.js')).default
  const Song = (await import('../models/song.js')).default

  User.createTable()
  Song.createTable()

  if (config.isDevelopment()) {
    User.seed()
    Song.seed()
  }

  console.log('✅ Database initialization complete')
}

// ----- keep default export for db -----
export default db