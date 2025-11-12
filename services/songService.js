import song from '../models/song.js'

export const getAllSongs = () => {
    return song.findAll()
}
export const getSongById = (id) => {
    return song.findById(id)
}
export const createSong = (songData) => {
	const { title, artist, album, duration } = songData
	
	if (title && song.titleExists(title)) {
		throw new Error('Song title already exists')
	}
	
	return song.create({ title, artist, album, duration })
}

export const updateSong = (id, songData) => {
	const { title, artist, album, duration } = songData
	const existingSong = song.findById(id)
	
	if (!existingSong) {
		return null
	}
	
	if (title && title !== existingSong.title && song.titleExists(title, id)) {
		throw new Error('Song title already exists')
	}
	
	return song.update(id, { title, artist, album, duration })
}

export const deleteSong = (id) => {
	return song.delete(id)
}

export const getSongByTitle = (title) => {
	return song.findByTitle(title)
}

export const getSongCount = () => {
	return song.count()
}
