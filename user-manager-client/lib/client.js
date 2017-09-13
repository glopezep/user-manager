const Promise = require('bluebird')
const request = require('request-promise-native')
const defaults = require('../../config')

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

  getGroups (callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.groups}/list`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  updateGroup (id, data, callback) {
    const options = {
      method: 'PUT',
      uri: `${this.options.endpoints.groups}/${id}`,
      json: true,
      body: data,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  deleteGroup (id, callback) {
    const options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.groups}/${id}`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  saveUser (user, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/save`,
      json: true,
      body: user,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getUser (username, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getUsers (callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/list`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  updateUser (username, data, callback) {
    const options = {
      method: 'PUT',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true,
      body: data,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  deleteUser (username, callback) {
    const options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true,
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  authenticate (username, password, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      json: true,
      body: {
        username,
        password
      },
      resolveWithFullResponse: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }
}

module.exports = Client
