const test = require('ava')
const debug = require('debug')('user-manager:db:test')
const Db = require('../')
const utils = require('../lib/utils')
const config = require('../../../config')
const fixtures = require('./fixtures')

config.db.database = 'user_manager_db_test'
config.db.logging = (msg) => debug(msg)

const db = new Db(config.db)

test.beforeEach(async t => {
  await db.setup()
})

test.afterEach.always(async t => {
  await db.drop()
})

test.serial('db#saveGroup', async t => {
  t.is(typeof db.saveGroup, 'function', 'Should be a function')

  const groupFixture = fixtures.getGroup()
  const created = await db.saveGroup(groupFixture)
  const plainGroup = created.get({ plain: true })

  t.is(plainGroup.id, groupFixture.id)
  t.is(plainGroup.name, groupFixture.name)
  t.is(plainGroup.description, groupFixture.description)
  await t.throws(db.saveGroup(null), /group data is empty/)
})

test.serial('db#getGroup', async t => {
  t.is(typeof db.getGroup, 'function', 'Should be a function')

  const groupFixture = fixtures.getGroup()
  await db.saveGroup(groupFixture)
  const group = await db.getGroup(groupFixture.id)
  const plainGroup = group.get({ plain: true })

  t.is(plainGroup.id, groupFixture.id)
  t.is(plainGroup.name, groupFixture.name)
  t.is(plainGroup.description, groupFixture.description)
  await t.throws(db.getGroup(null), /id is empty/)
  await t.throws(db.getGroup('foo'), /not found/)
})

test.serial('db#getGroups', async t => {
  t.is(typeof db.getGroups, 'function', 'Should be a function')

  const groupFixtures = fixtures.getGroups()
  const saveGroups = []

  groupFixtures.forEach(group => {
    saveGroups.push(db.saveGroup(group))
  })

  await Promise.all(saveGroups)

  const groups = await db.getGroups()

  t.is(groups.length, groupFixtures.length)
})

test.serial('db#getGroups - empty', async t => {
  t.is(typeof db.getGroups, 'function', 'Should be a function')

  await t.throws(db.getGroups(), /not found/)
})

test.serial('db#updateGroup', async t => {
  t.is(typeof db.updateGroup, 'function', 'Should be a function')

  const groupFixture = fixtures.getGroup()
  const newData = fixtures.getGroup()
  await db.saveGroup(groupFixture)
  const group = await db.updateGroup(groupFixture.id, newData)
  const plainGroup = group.get({ plain: true })

  t.is(plainGroup.id, groupFixture.id)
  t.is(plainGroup.name, newData.name)
  t.is(plainGroup.description, newData.description)
  await t.throws(db.updateGroup(null), /id is empty/)
  await t.throws(db.updateGroup('foo'), /not found/)
  await t.throws(db.updateGroup(plainGroup.id, null), /data is empty/)
})

test.serial('db#deleteGroup', async t => {
  t.is(typeof db.deleteGroup, 'function', 'Should be a function')

  const groupFixture = fixtures.getGroup()
  await db.saveGroup(groupFixture)
  const group = await db.deleteGroup(groupFixture.id)

  t.is(group.id, groupFixture.id)
  t.is(group.name, groupFixture.name)
  t.is(group.description, groupFixture.description)
  await t.throws(db.deleteGroup(null), /id is empty/)
  await t.throws(db.deleteGroup('foo'), /not found/)
})

test.serial('db#saveUser', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  const plainPassword = userFixture.password
  const created = await db.saveUser(userFixture)
  const plainUser = created.get({ plain: true })

  t.is(plainUser.id, userFixture.id)
  t.is(plainUser.fullname, userFixture.fullname)
  t.is(plainUser.email, userFixture.email)
  t.is(plainUser.username, userFixture.username)
  t.is(plainUser.password, utils.encrypt(plainPassword))
  t.is(plainUser.avatar, userFixture.avatar)
  await t.throws(db.saveUser(null), /user data is empty/)
})

test.serial('db#getUser', async t => {
  t.is(typeof db.getUser, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  await db.saveUser(userFixture)
  const user = await db.getUser(userFixture.username)
  const plainUser = user.get({ plain: true })

  t.is(plainUser.id, userFixture.id)
  t.is(plainUser.fullname, userFixture.fullname)
  t.is(plainUser.username, userFixture.username)
  t.is(plainUser.email, userFixture.email)
  t.is(plainUser.password, userFixture.password)
  t.is(plainUser.avatar, userFixture.avatar)
  await t.throws(db.getUser(null), /username is empty/)
  await t.throws(db.getUser('foo'), /not found/)
})

test.serial('db#getUsers', async t => {
  t.is(typeof db.getUsers, 'function', 'Should be a function')

  const userFixtures = fixtures.getUsers()
  const saveUsers = []

  userFixtures.forEach(user => {
    saveUsers.push(db.saveUser(user))
  })

  await Promise.all(saveUsers)

  const users = await db.getUsers()

  t.is(users.length, userFixtures.length)
})

test.serial('db#getUsers - empty', async t => {
  t.is(typeof db.getUsers, 'function', 'Should be a function')

  await t.throws(db.getUsers(), /not found/)
})

test.serial('db#getUsersByGroup', async t => {
  const groupFixture = fixtures.getGroup()
  const userFixtures = fixtures.getUsers()
  const saveUsers = []

  await db.saveGroup(groupFixture)

  userFixtures.forEach(user => {
    user.groupId = groupFixture.id
    saveUsers.push(db.saveUser(user))
  })

  await Promise.all(saveUsers)

  const users = await db.getUsersByGroup(groupFixture.id)
  t.is(users.length, userFixtures.length)
  await t.throws(db.getUsersByGroup(), /not found/)
})

test.serial('db#updateUser', async t => {
  t.is(typeof db.updateUser, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  const newData = fixtures.getUser()
  await db.saveUser(userFixture)
  const user = await db.updateUser(userFixture.username, newData)
  const plainUser = user.get({ plain: true })

  t.is(plainUser.id, userFixture.id)
  t.is(plainUser.fullname, newData.fullname)
  t.is(plainUser.username, newData.username)
  t.is(plainUser.email, newData.email)
  t.is(plainUser.password, newData.password)
  t.is(plainUser.avatar, newData.avatar)
  await t.throws(db.updateUser(null), /username is empty/)
  await t.throws(db.updateUser('foo'), /not found/)
  await t.throws(db.updateUser(plainUser.username, null), /new data is empty/)
})

test.serial('db#deleteUser', async t => {
  t.is(typeof db.deleteUser, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  await db.saveUser(userFixture)
  const user = await db.deleteUser(userFixture.username)

  t.is(user.id, userFixture.id)
  t.is(user.fullname, userFixture.fullname)
  t.is(user.username, userFixture.username)
  t.is(user.email, userFixture.email)
  t.is(user.password, userFixture.password)
  t.is(user.avatar, userFixture.avatar)
  await t.throws(db.deleteUser(null), /username is empty/)
  await t.throws(db.deleteUser('foo'), /not found/)
})

test.serial('db#authenticate', async t => {
  t.is(typeof db.authenticate, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  const { username, password } = userFixture

  await db.saveUser(userFixture)

  const success = await db.authenticate(username, password)
  const fail = await db.authenticate(username, 'foo')
  const failure = await db.authenticate('foo', 'bar')

  t.true(success)
  t.false(fail)
  t.false(failure)
  await t.throws(db.authenticate(), /username or password is empty/)
})
