const Db = require('user-manager-db')
const utils = require('user-manager-utils')
const config = require('../../config')

const db = new Db(config.db)

module.exports = {
  Mutation: {
    saveUser: async (rootValue, args) => {
      const user = await db.saveUser(args.user)
      return JSON.parse(JSON.stringify(user))
    },

    authenticate: async (rootValue, args) => {
      const { username, password } = args
      const auth = await db.authenticate(username, password)

      if (!auth) return { err: true, value: 'username or password incorrect' }

      const token = await utils.signToken({ username }, config.secret)

      return { value: token }
    }
  }
}
