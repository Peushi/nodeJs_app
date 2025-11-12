import * as songService from '../services/songService.js'

export const getAllSongs = (req, res) => {
	try {
		const songs = songService.getAllSongs()
		res.status(200).json(songs)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const getSongById = (req, res) => {
	try {
		const { id } = req.params
		const song = songService.getSongById(id)
		
		if (!song) {
			return res.status(404).json({ message: "Song not found" })
		}
		
		res.status(200).json(song)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const createSong = (req, res) => {
	try {
		const { title, artist } = req.body
		
		if (!title || !artist) {
			return res.status(400).json({ message: "Title and artist are required" })
		}
		
		const newSong = songService.createSong(req.body)
		res.status(201).json(newSong)
	} catch (error) {
		if (error.message === 'Song title already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

export const updateSong = (req, res) => {
	try {
		const { id } = req.params
		const updatedSong = songService.updateSong(id, req.body)
		
		if (!updatedSong) {
			return res.status(404).json({ message: "Song not found" })
		}
		
		res.status(200).json(updatedSong)
	} catch (error) {
		if (error.message === 'Song title already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

export const deleteSong = (req, res) => {
	try {
		const { id } = req.params
		const deleted = songService.deleteSong(id)
		
		if (!deleted) {
			return res.status(404).json({ message: "Song not found" })
		}
		
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}


