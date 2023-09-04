const AppError = require("../utils/AppError")

class NoteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ title, description, rating, tags, author, author_avatar, user_id }) {
    if (rating < 0 || rating > 5) {
      throw new AppError("Rating must be between 0 and 5.")
    }

    const noteCreated = await this.noteRepository.create({ title, description, rating, tags, author, author_avatar, user_id })

    return noteCreated
  }
}

module.exports = NoteService;