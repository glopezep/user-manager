const { send, json } = require('micro')
const { router, post } = require('microrouter')
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

module.exports = router(
  post('/save', saveUser)
)
