const Db = require('user-manager-db')
const utils = require('user-manager-utils')
const config = require('../../config')

const db = new Db(config.db)

module.exports = {
  Query: {
    user: async (rootValue, args) => {
      const user = await db.getUser(args.username)
      return JSON.parse(JSON.stringify(user))
    },
  },

  Mutation: {
    saveUser: async (rootValue, args) => {
      const user = await db.saveUser(args.user)
      return JSON.parse(JSON.stringify(user))
    },

    authenticate: async (rootValue, args) => {
      const { username, password } = args
      const auth = await db.authenticate(username, password)

      if (!auth) {
        return new Error('username or password incorrect')
      }

      const token = await utils.signToken({ username }, config.secret)

      return { value: token }
    }
  }
}
