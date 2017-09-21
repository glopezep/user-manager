const { send, json } = require('micro')
const { router, post, get, put, del } = require('microrouter')
const Db = require('user-manager-db')
const DbStub = require('./tests/stub/db')
const config = require('../config')

let db = new Db(config.db)

if (process.env.NODE_ENV === 'test') {
  db = new DbStub()
}

async function saveGroup (req, res) {
  try {
    const group = await json(req)
    const created = await db.saveGroup(group)
    send(res, 201, created)
  } catch (e) {
    send(res, 500, { err: e.message })
  }
}

async function getGroup (req, res) {
  try {
    const id = req.params.id
    const group = await db.getGroup(id)
    send(res, 200, group)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function getGroups (req, res) {
  try {
    const groups = await db.getGroups()
    send(res, 200, groups)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function getUsersByGroup (req, res) {
  try {
    const id = req.params.id
    const users = await db.getUsersByGroup(id)
    send(res, 200, users)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function updateGroup (req, res) {
  try {
    const id = req.params.id
    const data = await json(req)
    const group = await db.updateGroup(id, data)
    send(res, 200, group)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function deleteGroup (req, res) {
  try {
    const id = req.params.id
    const group = await db.deleteGroup(id)
    send(res, 200, group)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function saveUser (req, res) {
  try {
    const user = await json(req)
    const created = await db.saveUser(user)
    send(res, 201, created)
  } catch (e) {
    send(res, 500, { err: e.message })
  }
}

async function getUser (req, res) {
  try {
    const username = req.params.username
    const user = await db.getUser(username)
    send(res, 200, user)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function getUsers (req, res) {
  try {
    const users = await db.getUsers()
    send(res, 200, users)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function updateUser (req, res) {
  try {
    const username = req.params.username
    const data = await json(req)
    const user = await db.updateUser(username, data)
    send(res, 200, user)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function deleteUser (req, res) {
  try {
    const username = req.params.username
    const user = await db.deleteUser(username)
    send(res, 200, user)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

module.exports = router(
  post('/groups/save', saveGroup),
  get('/groups/list', getGroups),
  get('/groups/:id', getGroup),
  get('/groups/:id/users', getUsersByGroup),
  put('/groups/:id', updateGroup),
  del('/groups/:id', deleteGroup),
  post('/save', saveUser),
  get('/list', getUsers),
  get('/:username', getUser),
  put('/:username', updateUser),
  del('/:username', deleteUser)
)
