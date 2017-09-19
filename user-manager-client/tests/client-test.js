const test = require('ava')
const nock = require('nock')
const userManager = require('../')
const fixtures = require('./fixtures')

const options = {
  endpoints: {
    users: 'http://api.usermanager.test/users',
    groups: 'http://api.usermanager.test/groups',
    auth: 'http://api.usermanager.test/auth'
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

  const result = await client.saveGroup(group)

  t.deepEqual(result, group)
})

test('client#getGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .get(`/${group.id}`)
    .reply(200, group)

  const result = await client.getGroup(group.id)

  t.deepEqual(result, group)
})

test('client#getGroups', async t => {
  const client = t.context.client
  const groups = fixtures.getGroups()

  nock(options.endpoints.groups)
    .get('/list')
    .reply(200, groups)

  const result = await client.getGroups()

  t.deepEqual(result, groups)
})

test('client#updateGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .put(`/${group.id}`, group)
    .reply(200, group)

  const result = await client.updateGroup(group.id, group)

  t.deepEqual(result, group)
})

test('client#deleteGroup', async t => {
  const client = t.context.client
  const group = fixtures.getGroup()

  nock(options.endpoints.groups)
    .delete(`/${group.id}`)
    .reply(200, group)

  const result = await client.deleteGroup(group.id)

  t.deepEqual(result, group)
})

test('client#saveUser', async t => {
  const client = t.context.client
  const user = fixtures.getUser()

  nock(options.endpoints.users)
    .post('/save', user)
    .reply(201, user)

  const result = await client.saveUser(user)

  t.deepEqual(result, user)
})

test('client#getUser', async t => {
  const client = t.context.client
  const user = fixtures.getUser()

  nock(options.endpoints.users)
    .get(`/${user.username}`)
    .reply(200, user)

  const result = await client.getUser(user.username)

  t.deepEqual(result, user)
})

test('client#getUsers', async t => {
  const client = t.context.client
  const users = fixtures.getUsers()

  nock(options.endpoints.users)
    .get('/list')
    .reply(200, users)

  const result = await client.getUsers()

  t.deepEqual(result, users)
})

test('client#getUsersByGroup', async t => {
  const client = t.context.client
  const users = fixtures.getUsers()
  const group = fixtures.getGroup()

  nock(options.endpoints.users)
    .get(`/${group.id}/users`)
    .reply(200, users)

  const result = await client.getUsersByGroup(group.id)

  t.deepEqual(result, users)
})

test('client#updateUser', async t => {
  const client = t.context.client
  const user = fixtures.getUser()

  nock(options.endpoints.users)
    .put(`/${user.username}`, user)
    .reply(200, user)

  const result = await client.updateUser(user.username, user)

  t.deepEqual(result, user)
})

test('client#deleteUser', async t => {
  const client = t.context.client
  const user = fixtures.getUser()

  nock(options.endpoints.users)
    .delete(`/${user.username}`)
    .reply(200, user)

  const result = await client.deleteUser(user.username)

  t.deepEqual(result, user)
})

test('client#authenticate', async t => {
  const client = t.context.client
  const user = fixtures.getUser()
  const { username, password } = user
  const token = 's3cr3t'

  nock(options.endpoints.auth)
    .post('/', { username, password })
    .reply(200, token)

  const result = await client.authenticate(user.username, user.password)

  t.deepEqual(result, token)
})
