const Promise = require('bluebird')
const setupSequelize = require('./setupSequelize')
const getModels = require('../models')
const defaults = require('../config')

class Db {
  constructor (config = defaults) {
    this.config = config
    this.models = getModels(this.config)
    this.sequelize = setupSequelize(this.config)
  }

  async saveUser (user, callback) {
    try {
      if (!user) return Promise.reject(new Error('user data is empty'))
      const created = await this.models.User.create(user)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      if (!username) return Promise.reject(new Error('username is empty'))

      const user = await this.models.User.findOne({
        where: { username }
      })

      if (!user) return Promise.reject(new Error('not found'))

      return Promise.resolve(user).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUsers (callback) {
    try {
      const users = await this.models.User.findAll()

      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateUser (username, data, callback) {
    try {
      if (!username) return Promise.reject(new Error('username is empty'))

      const user = await this.getUser(username)

      if (!data) return Promise.reject(new Error('new data is empty'))

      const updated = await user.update(data, { fields: [
        'fullname',
        'username',
        'email',
        'password',
        'avatar',
        'updatedAt'
      ]})

      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteUser (username, callback) {
    try {
      if (!username) return Promise.reject(new Error('username is empty'))

      const user = await this.getUser(username)
      const deleted = JSON.parse(JSON.stringify(user))
      await user.destroy()

      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async setup (callback) {
    try {
      await this.sequelize.sync()
      return Promise.resolve('Setup Database Completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async drop (callback) {
    try {
      await this.sequelize.drop()
      return Promise.resolve('Drop Database Completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }
}

module.exports = Db
