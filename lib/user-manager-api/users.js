const { send, json } = require('micro')
const { router, post, get, put, del } = require('microrouter')
const Db = require('user-manager-db')
const DbStub = require('./tests/stub/db')
const config = require('../../config')

let db = new Db(config.db)

if (process.env.NODE_ENV === 'test') {
  db = new DbStub()
}

async function saveUser (req, res) {
  try {
    const user = await json(req)
    const created = await db.saveUser(user)
    send(res, 201, created)
  } catch (e) {
    send(res, 500, e)
  }
}

async function getUser (req, res) {
  try {
    const username = req.params.username
    const user = await db.getUser(username)
    send(res, 200, user)
  } catch (e) {
    send(res, 404, e)
  }
}

async function getUsers (req, res) {
  try {
    const users = await db.getUsers()
    send(res, 200, users)
  } catch (e) {
    send(res, 404, e)
  }
}

async function updateUser (req, res) {
  try {
    const username = req.params.username
    const data = await json(req)
    const user = await db.updateUser(username, data)
    send(res, 200, user)
  } catch (e) {
    send(res, 404, e)
  }
}

async function deleteUser (req, res) {
  try {
    const username = req.params.username
    const user = await db.deleteUser(username)
    send(res, 200, user)
  } catch (e) {
    send(res, 404, e)
  }
}

module.exports = router(
  post('/save', saveUser),
  get('/list', getUsers),
  get('/:username', getUser),
  put('/:username', updateUser),
  del('/:username', deleteUser)
)
