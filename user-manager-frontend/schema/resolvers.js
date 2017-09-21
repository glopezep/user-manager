const { createClient } = require('user-manager-client')
const utils = require('user-manager-utils')
const config = require('../../config')

const client = createClient(config.client)

module.exports = {
  Query: {
    group: async (rootValue, args) => {
      try {
        const group = await client.getGroup(args.id)
        return group
      } catch (e) {
        return new Error(e.message)
      }
    },

    groups: async (rootValue, args) => {
      try {
        const groups = await client.getGroups()
        return groups
      } catch (e) {
        return new Error(e.message)
      }
    },

    user: async (rootValue, args) => {
      try {
        const user = await client.getUser(args.username)
        return user
      } catch (e) {
        return new Error(e.message)
      }
    },

    users: async (rootValue, args) => {
      try {
        const users = await client.getUsers()
        return users
      } catch (e) {
        return new Error(e.message)
      }
    },

    usersByGroup: async (rootValue, args) => {
      try {
        const users = await client.getUsersByGroup(args.id)
        return users
      } catch (e) {
        return new Error(e.message)
      }
    }
  },

  Mutation: {
    saveGroup: (rootValue, args) => {
      try {
        const group = await client.saveGroup(args.group)
        return group
      } catch (e) {
        return new Error(e.message)
      }
    },

    updateGroup: async (rootValue, args) => {
      try {
        const group = await client.updateGroup(args.id, args.group)
        return group
      } catch (e) {
        return new Error(e.message)
      }
    },

    deleteGroup: async (rootValue, args) => {
      try {
        const group = await client.deleteGroup(args.id)
        return group
      } catch (e) {
        return new Error(e.message)
      }
    },

    saveUser: async (rootValue, args) => {
      try {
        const user = await client.saveUser(args.user)
        return user
      } catch (e) {
        return new Error(e.message)
      }
    },

    updateUser: async (rootValue, args) => {
      try {
        const user = await client.updateUser(args.username, args.user)
        return user
      } catch (e) {
        return new Error(e.message)
      }
    },

    deleteUser: async (rootValue, args) => {
      try {
        const user = await client.deleteUser(args.username)
        return user
      } catch (e) {
        return new Error(e.message)
      }
    },

    authenticate: async (rootValue, args) => {
      try {
        const { username, password } = args
        const token = await client.authenticate(username, password)
        return { token }
      } catch (e) {
        return new Error(e.message)
      }
    },

    verifyToken: async (rootValue, args) => {
      try {
        const decoded = await utils.verifyToken(args.token, config.secret)
        const user = await client.getUser(decoded.username)
        return user
      } catch (e) {
        return new Error(e.message)
      }
    }
  }
}
