const Db = require('user-manager-db')
const userService = require('./user-manager-api/users')
const groupService = require('./user-manager-api/groups')
const userManager = require('user-manager-client')

const services = {
  users: userService,
  groups: groupService
}

module.exports = {
  Db,
  userManager,
  services
}
