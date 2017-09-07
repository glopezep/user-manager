const test = require('ava')
const nock = require('nock')
const userManager = require('../')
const fixtures = require('./fixtures')

const options = {
  endpoints: {
    users: 'http://api.usermanager.test/users',
    groups: 'http://api.usermanager.test/groups'
  }
}

test.beforeEach(t => {
  const client = userManager.createClient(options)
  t.context.client = client
})

test('Client methods', t => {
  const client = t.context.client

  t.is(typeof client.saveGroup, 'function', 'Should be a function')
  t.is(typeof client.getGroup, 'function', 'Should be a function')
  t.is(typeof client.getGroups, 'function', 'Should be a function')
  t.is(typeof client.updateGroup, 'function', 'Should be a function')
  t.is(typeof client.deleteGroup, 'function', 'Should be a function')
  t.is(typeof client.saveUser, 'function', 'Should be a function')
  t.is(typeof client.getUser, 'function', 'Should be a function')
  t.is(typeof client.getUsers, 'function', 'Should be a function')
  t.is(typeof client.updateUser, 'function', 'Should be a function')
  t.is(typeof client.deleteUser, 'function', 'Should be a function')
})

test('client#saveGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .post('/save', group)
    .reply(201, group)

  const response = await client.saveGroup(group)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, group)
})

test('client#getGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .get(`/${group.id}`)
    .reply(200, group)

  const response = await client.getGroup(group.id)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('client#getGroups', async t => {
  const client = t.context.client
  const groups = fixtures.getGroups()

  nock(options.endpoints.groups)
    .get('/list')
    .reply(200, groups)

  const response = await client.getGroups()

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, groups)
})

test('client#updateGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .put(`/${group.id}`, group)
    .reply(200, group)

  const response = await client.updateGroup(group.id, group)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})

test('client#deleteGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .delete(`/${group.id}`)
    .reply(200, group)

  const response = await client.deleteGroup(group.id)

  t.is(response.statusCode, 200)
  t.deepEqual(response.body, group)
})
