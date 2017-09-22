const test = require('ava')
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')
const utils = require('user-manager-utils')
const fixtures = require('./fixtures')
const auth = require('../auth')
const config = require('../../config')

test.beforeEach(async t => {
  const server = micro(auth)
  const url = await listen(server)
  t.context.url = url
})

test('POST /', async t => {
  const user = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}`,
    json: true,
    body: {
      username: user.username,
      password: user.password,
    },
    resolveWithFullResponse: true
  }

  const response = await request(options)
  const token = response.body
  const decoded = await utils.verifyToken(token, config.secret)

  t.is(response.statusCode, 200)
  t.is(decoded.username, user.username)
})
