const { createClient } = require('user-manager-client')
const utils = require('user-manager-utils')
const config = require('../../config')

const client = createClient(config.client)

module.exports = {
  Query: {
    group: (rootValue, args) => {
      client.getGroup(args.id, (err, group) => {
        if (err) return err
        return group
      })
    },

    groups: (rootValue, args) => {
      client.getGroups((err, groups) => {
        if (err) return err
        return groups
      })
    },

    user: (rootValue, args) => {
      client.getUser(args.username, (err, user) => {
        if (err) return error
        return user
      })
    },

    users: (rootValue, args) => {
      client.getUsers((err, users) => {
        if (err) return err
        return users
      })
    },

    usersByGroup: async (rootValue, args) => {
      client.getUsersByGroup(args.id, (err, users) => {
        if (err) return err
        return users
      })
    }

  },

  Mutation: {
    saveGroup: (rootValue, args) => {
      client.saveGroup(args.group, (err, group) => {
        if (err) return err
        return group
      })
    },

    updateGroup: (rootValue, args) => {
      client.updateGroup(args.id, args.group, (err, group) => {
        if (err) return error
        return group
      })
    },

    deleteGroup: (rootValue, args) => {
      client.deleteGroup(args.id, (err, group) => {
        if (err) return err
        return group
      })
    },

    saveUser: (rootValue, args) => {
      client.saveUser(args.user, (err, user) => {
        if (err) return err
        return user
      })
    },

    updateUser: (rootValue, args) => {
      client.updateUser(args.username, args.user, (err, user) => {
        if (err) return err
        return user
      })
    },

    deleteUser: (rootValue, args) => {
      client.deleteUser(args.id, (err, user) => {
        if (err) return err
        return user
      })
    },

    authenticate: async (rootValue, args) => {
      const { username, password } = args
      const auth = await client.authenticate(username, password)

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
      const user = await client.getUser(decoded.username)
      return user
    }
  }
}
