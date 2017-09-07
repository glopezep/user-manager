const { send, json } = require('micro')
const { router, post } = require('microrouter')
const utils = require('user-manager-utils')
const Db = require('user-manager-db')
const DbStub = require('./tests/stub/db')
const config = require('../../config')

let db = new Db(config.db)

if (process.env.NODE_ENV === 'test') {
  db = new DbStub()
}

async function authenticate (req, res) {
  const credentials = await json(req)
  const { username, password } = credentials
  const auth = await db.authenticate(username, password)

  if (!auth) {
    return send(res, 401, { err: 'username or password incorrect' })
  }

  const payload = { username }
  const token = await utils.signToken(payload, config.secret)

  send(res, 200, token)
}

module.exports = router(
  post('/', authenticate),
)
