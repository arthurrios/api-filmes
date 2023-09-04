const knex = require("../../database/knex");

class NoteRespository {
  async create({ title, description, rating, tags, author, author_avatar, user_id }) {
    const [ note_id ] = await knex("notes").insert({
      title,
      description,
      rating,
      author,
      author_avatar,
      user_id,
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id,
      }
    })
    await knex("tags").insert(tagsInsert);

    return { id: note_id }
  }
}

module.exports = NoteRespository