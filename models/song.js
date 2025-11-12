import db from '../config/database.js'

class Song {
	static tableName = 'songs'

	static createTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				artist TEXT NOT NULL,
				album TEXT,
				duration TEXT,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`
		db.exec(sql)
		console.log(`✅ Table '${this.tableName}' created/verified`)
	}

	static findAll() {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`)
		return stmt.all()
	}

	static findById(id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
		return stmt.get(id)
	}

	static findByTitle(title) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE title = ?`)
		return stmt.get(title)
	}

	static create(songData) {
		const { title, artist, album, duration } = songData
		const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (title, artist, album, duration)
			VALUES (?, ?, ?, ?)
		`)
		const result = stmt.run(title, artist, album || null, duration || null)
		return this.findById(result.lastInsertRowid)
	}

	static update(id, songData) {
		const { title, artist, album, duration } = songData
		const updates = []
		const values = []

		if (title !== undefined) {
			updates.push('title = ?')
			values.push(title)
		}
		if (artist !== undefined) {
			updates.push('artist = ?')
			values.push(artist)
		}
		if (album !== undefined) {
			updates.push('album = ?')
			values.push(album)
		}
		if (duration !== undefined) {
			updates.push('duration = ?')
			values.push(duration)
		}

		updates.push('updated_at = CURRENT_TIMESTAMP')

		if (updates.length === 1) {
			return this.findById(id)
		}

		values.push(id)

		const stmt = db.prepare(`
			UPDATE ${this.tableName}
			SET ${updates.join(', ')}
			WHERE id = ?
		`)
		stmt.run(...values)
		return this.findById(id)
	}

	static delete(id) {
		const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
		const result = stmt.run(id)
		return result.changes > 0
	}

	static titleExists(title, excludeId = null) {
		let stmt
		if (excludeId) {
			stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE title = ? AND id != ?`)
			return stmt.get(title, excludeId) !== undefined
		} else {
			stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE title = ?`)
			return stmt.get(title) !== undefined
		}
	}

	static count() {
		const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
		return stmt.get().count
	}

	static seed() {
		const count = this.count()
		if (count === 0) {
			console.log('🎵 Seeding songs table...')
			const sampleSongs = [
				{ title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
				{ title: 'House of cards', artist: 'BTS', album: 'The Most Beautiful Moment in Life: Young Forever.', duration: '3:46' },
				{ title: 'Burning Blue', artist: 'Mariah the Scientist', album: 'Hearts Sold Separately', duration: '3:25' },
				{ title: 'No One Noticed', artist: 'The Marias', album: 'Submarine', duration: '3:57' }
			]
			sampleSongs.forEach(song => this.create(song))
			console.log(`✅ Seeded ${sampleSongs.length} songs`)
		}
	}
}

export default Song
