const express = require('express')
const userManger = require('user-manager-client')
const debug = require('debug')('user-manager:api')
const config = require('../../config')

const client = userManger.createClient(config.client)
const api = express.Router()

api.post('/users/save', (req, res) => {
  const user = req.body

  client.saveUser(user, (err, usr) => {
    if (err) {
      debug(err)
      return res.status(500).send(err)
    }
    res.send(usr)
  })
})

api.get('/users/:id', (req, res) => {
  const id = req.params.id

  client.getUser(id, (err, user) => {
    if (err) {
      debug(err)
      return res.status(404).send(err)
    }
    res.send(user)
  })
})

api.get('/users/list', (req, res) => {
  client.getUser((err, users) => {
    if (err) {
      debug(err)
      return res.status(404).send(err)
    }
    res.send(users)
  })
})

api.put('/users', (req, res) => {
  const id = req.params.id
  const data = req.body

  client.updateUser(id, data, (err, user) => {
    if (err) {
      debug(err)
      return res.status(500).send(err)
    }
    res.send(user)
  })
})

api.delete('/users/:id', (req, res) => {
  const id = req.params.id

  client.deleteUser(id, (err, user) => {
    if (err) {
      debug(err)
      return res.status(500).send(err)
    }
    res.send(user)
  })
})

module.exports = api
