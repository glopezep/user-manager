const Db = require('user-manager-db')
const utils = require('user-manager-utils')
const config = require('../../config')

const db = new Db(config.db)

module.exports = {
  Query: {
    group: async (rootValue, args) => {
      const group = await db.getGroup(args.id)
      return JSON.parse(JSON.stringify(group))
    },

    groups: async (rootValue, args) => {
      const groups = await db.getGroups()
      return JSON.parse(JSON.stringify(groups))
    },

    user: async (rootValue, args) => {
      const user = await db.getUser(args.username)
      return JSON.parse(JSON.stringify(user))
    },

    users: async (rootValue, args) => {
      const users = await db.getUsers()
      return JSON.parse(JSON.stringify(users))
    },

    usersByGroup: async (rootValue, args) => {
      const users = await db.getUsersByGroup(args.id)
      return JSON.parse(JSON.stringify(users))
    }
  },

  Mutation: {
    saveGroup: async (rootValue, args) => {
      const group = await db.saveGroup(args.group)
      return JSON.parse(JSON.stringify(group))
    },

    updateGroup: async (rootValue, args) => {
      const group = await db.updateGroup(args.id, args.group)
      return JSON.parse(JSON.stringify(group))
    },

    deleteGroup: async (rootValue, args) => {
      const group = await db.deleteGroup(args.id)
      return group
    },

    saveUser: async (rootValue, args) => {
      const user = await db.saveUser(args.user)
      return JSON.parse(JSON.stringify(user))
    },

    updateUser: async (rootValue, args) => {
      const user = await db.updateUser(args.username, args.user)
      return JSON.parse(JSON.stringify(user))
    },

    deleteUser: async (rootValue, args) => {
      const user = await db.deleteUser(args.username)
      return user
    },

    authenticate: async (rootValue, args) => {
      const { username, password } = args
      const auth = await db.authenticate(username, password)

      if (!auth) {
        return new Error('username or password incorrect')
      }

      const token = await utils.signToken({ username }, config.secret, {
        expiresIn: '15m'
      })

      return { token }
    },

    verifyToken: async (rootValue, args) => {
      const decoded = await utils.verifyToken(args.token, config.secret)
      const user = await db.getUser(decoded.username)
      return JSON.parse(JSON.stringify(user))
    }
  }
}
