const fixtures = require('../fixtures')

class Db {
  saveGroup (group) {
    return Promise.resolve(fixtures.getGroup())
  }

  getGroup (id) {
    return Promise.resolve(fixtures.getGroup())
  }

  getGroups () {
    return Promise.resolve(fixtures.getGroups())
  }

  updateGroup (id) {
    return Promise.resolve(fixtures.getGroup())
  }

  deleteGroup (id) {
    return Promise.resolve(fixtures.getGroup())
  }

  saveUser (user) {
    return Promise.resolve(fixtures.getUser())
  }

  getUser (username) {
    return Promise.resolve(fixtures.getUser())
  }

  getUsers () {
    return Promise.resolve(fixtures.getUsers())
  }

  getUsersByGroup (groupId) {
    return Promise.resolve(fixtures.getUsers())
  }

  updateUser (username, data) {
    return Promise.resolve(fixtures.getUser())
  }

  deleteUser (username) {
    return Promise.resolve(fixtures.getUser())
  }

  authenticate (username, password) {
    return Promise.resolve(true)
  }
}

module.exports = Db
