const fixtures = require('../fixtures')

class Db {
  saveUser (user) {
    return Promise.resolve(fixtures.getUser())
  }

  getUser (username) {
    return Promise.resolve(fixtures.getUser())
  }

  getUsers () {
    return Promise.resolve(fixtures.getUsers())
  }
}

module.exports = Db
