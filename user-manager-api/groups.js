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
  const group = await json(req)
  const created = await db.saveGroup(group)
  send(res, 201, created)
}

async function getGroup (req, res) {
  const id = req.params.id
  const group = await db.getGroup(id)
  send(res, 200, group)
}

async function getGroups (req, res) {
  const groups = await db.getGroups()
  send(res, 200, groups)
}

async function getUsersByGroup (req, res) {
  const id = req.params.id
  const users = await db.getUsersByGroup(id)
  send(res, 200, users)
}

async function updateGroup (req, res) {
  const id = req.params.id
  const data = await json(req)
  const group = await db.updateGroup(id, data)
  send(res, 200, group)
}

async function deleteGroup (req, res) {
  const id = req.params.id
  const group = await db.deleteGroup(id)
  send(res, 200, group)
}

module.exports = router(
  post('/save', saveGroup),
  get('/list', getGroups),
  get('/:id', getGroup),
  get('/:id/users', getUsersByGroup),
  put('/:id', updateGroup),
  del('/:id', deleteGroup)
)
