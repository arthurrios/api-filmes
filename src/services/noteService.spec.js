const NoteService = require("./NoteService")
const NoteRepositoryInMemory = require("../repositories/notes/NoteRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("NoteService", () => {
  let noteRepository = null
  let noteService = null

  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory()
    noteService = new NoteService(noteRepository)
  })

  it("note should be created", async () => {
    const note = {
      title: "Title",
      description: "Description",
      rating: 5,
      author: "Author",
      author_avatar: "avatar.png",
      user_id: 1
    }

    console.log(note);

    const noteCreated = await noteService.execute(note)

    await expect(noteCreated).toHaveProperty("id")
  })
})