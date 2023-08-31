const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

const knex = require('../database/knex')

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body

    const checkUserExists = await knex("users").where("email", email).first()

    if (checkUserExists) {
      throw new AppError("This email is already in use.")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found.")
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first()
    
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email already in use.")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("You need to provide the old password to make a new one.")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.")
      }

      user.password = await hash(password, 8)

    }

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: (new Date().toISOString().split('T')[0] + ' '
      + new Date().toTimeString().split(' ')[0])
    })

    return res.json();
  }
}

module.exports = UserController

