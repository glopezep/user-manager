const Promise = require('bluebird')
const setupSequelize = require('./setupSequelize')
const getModels = require('../models')
const defaults = require('../config')

class Db {
  constructor (config = defaults) {
    this.config = config
    this.sequelize = setupSequelize(this.config)
    this.models = getModels(this.config)
  }

  async saveGroup (group, callback) {
    try {
      if (!group) throw new Error('group data is empty')
      const created = await this.models.Group.create(group)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getGroup (id, callback) {
    try {
      if (!id) throw new Error('id is empty')

      const group = await this.models.Group.findOne({
        where: { id }
      })

      if (!group) throw new Error('not found')

      return Promise.resolve(group).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getGroups (callback) {
    try {
      const groups = await this.models.Group.findAll()

      if (!groups.length) throw new Error('not found')

      return Promise.resolve(groups).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateGroup (id, data, callback) {
    try {
      if (!id) throw new Error('id is empty')

      const group = await this.getGroup(id)

      if (!data) throw new Error('data is empty')

      const updated = await group.update(data, { fields: [
        'name',
        'description'
      ]})

      return Promise.resolve(updated).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteGroup (id, callback) {
    try {
      if (!id) throw new Error('id is empty')

      const group = await this.getGroup(id)
      const deleted = JSON.parse(JSON.stringify(group))
      await group.destroy()

      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveUser (user, callback) {
    try {
      if (!user) throw new Error('user data is empty')
      const created = await this.models.User.create(user)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      if (!username) throw new Error('username is empty')

      const user = await this.models.User.findOne({
        where: { username }
      })

      if (!user) throw new Error('not found')

      return Promise.resolve(user).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUsers (callback) {
    try {
      const users = await this.models.User.findAll()

      if (!users.length) throw new Error('not found')

      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateUser (username, data, callback) {
    try {
      if (!username) throw new Error('username is empty')

      const user = await this.getUser(username)

      if (!data) throw new Error('new data is empty')

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
      if (!username) throw new Error('username is empty')

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
