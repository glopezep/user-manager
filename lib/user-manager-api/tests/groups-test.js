const test = require('ava')
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')
const fixtures = require('./fixtures')
const groups = require('../groups')

test.beforeEach(async t => {
  const server = micro(groups)
  const url = await listen(server)
  t.context.url = url
})

test('POST /', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}/save`,
    json: true,
    body: group,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, group)
})

test('GET /:id', async t => {
  const group = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/${group.id}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('GET /list', async t => {
  const groups = fixtures.getGroups()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, groups)
})

test('PUT /:id', async t => {
  const data = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'PUT',
    uri: `${url}/${data.id}`,
    json: true,
    body: data,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, data)
})

test('DELETE /:id', async t => {
  const data = fixtures.getGroup()
  const url = t.context.url

  const options = {
    method: 'DELETE',
    uri: `${url}/${data.id}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, data)
})
