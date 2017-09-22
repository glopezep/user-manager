const test = require('ava')
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')
const fixtures = require('./fixtures')
const users = require('../users')

test.beforeEach(async t => {
  const server = micro(users)
  const url = await listen(server)
  t.context.url = url
})

test('POST /groups/save', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}/groups/save`,
    json: true,
    body: group,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, group)
})

test('GET /groups/:id', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/groups/${group.id}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('GET /groups/list', async t => {
  const groups = fixtures.getGroups()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/groups/list`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, groups)
})

test('GET /groups/:id/users', async t => {
  const group = fixtures.getGroup()
  const users = fixtures.getUsers()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/groups/${group.id}/users`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, users)
})

test('PUT /groups/:id', async t => {
  const data = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'PUT',
    uri: `${url}/groups/${data.id}`,
    json: true,
    body: data,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, data)
})

test('DELETE /groups/:id', async t => {
  const data = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'DELETE',
    uri: `${url}/groups/${data.id}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, data)
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

test('GET /:username', async t => {
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

test('GET /list', async t => {
  const users = fixtures.getUsers()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, users)
})

test('PUT /:username', async t => {
  const data = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'PUT',
    uri: `${url}/${data.username}`,
    json: true,
    body: data,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, data)
})

test('DELETE /:username', async t => {
  const user = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'DELETE',
    uri: `${url}/${user.username}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, user)
})
