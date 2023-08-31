const { Router } = require("express");

const NotesController = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.get("/:id", notesController.show)
notesRoutes.get("/", notesController.index)
notesRoutes.post("/:id", notesController.create)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes