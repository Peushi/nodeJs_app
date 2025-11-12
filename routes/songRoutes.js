import express from "express"
import { logMiddleware } from "../middleware/middleware.js"
import * as songController from "../controllers/songController.js"

const router = express.Router()

router.get("/", logMiddleware, songController.getAllSongs)
router.get("/:id", songController.getSongById)
router.post("/", songController.createSong)
router.put("/:id", songController.updateSong)
router.delete("/:id", songController.deleteSong)

export default router