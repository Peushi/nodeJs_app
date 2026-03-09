import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'  

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use a container-safe path if DATABASE_URL is relative
let dbPath
if (path.isAbsolute(config.databaseUrl)) {
  dbPath = config.databaseUrl
} else {
  // Use /tmp inside containers if running in production
  if (process.env.NODE_ENV === 'production') {
    dbPath = '/tmp/database.sqlite'
  } else {
    dbPath = path.join(__dirname, '../../', config.databaseUrl)
  }
}

console.log(`📊 Database path: ${dbPath}`)

// Allow SQLite to create the file if it doesn't exist
const db = new Database(dbPath, { fileMustExist: false })

db.pragma('foreign_keys = ON')

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

export default db