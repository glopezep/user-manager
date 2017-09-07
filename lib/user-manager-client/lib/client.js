const Promise = require('bluebird')
const request = require('request-promise-native');
const defaults = require('../../../config')

class Client {
  constructor (options) {
    this.options = options || defaults
  }

  saveGroup (group, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.groups}/save`,
      json: true,
      body: group,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getGroup (id, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.groups}/${id}`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getGroups () {}
  updateGroup () {}
  deleteGroup () {}
  saveUser () {}
  getUser () {}
  getUsers () {}
  updateUser () {}
  deleteUser () {}
}

module.exports = Client
