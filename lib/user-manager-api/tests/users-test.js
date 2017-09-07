const test = require('ava')
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')
// const request = require('axios')
const fixtures = require('./fixtures')
const users = require('../users')

test.beforeEach(async t => {
  const server = micro(users)
  const url = await listen(server)
  t.context.url = url
})

test('POST /save', async t => {
  const user = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}/save`,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, user)
})

test('GET /:id', async t => {
  const user = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/${user.username}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, user)
})
