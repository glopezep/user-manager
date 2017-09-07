const fixtures = require('../fixtures')

class Db {
  saveUser (user) {
    return Promise.resolve(fixtures.getUser())
  }

  getUser (username) {
    return Promise.resolve(fixtures.getUser())
  }
}

module.exports = Db
