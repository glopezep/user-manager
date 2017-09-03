const test = require('ava')
const debug = require('debug')('user-manager:db:test')
const Db = require('../')
const config = require('../config')
const fixtures = require('./fixtures')

config.database = 'user_manager_db_test'
config.logging = (msg) => debug(msg)

const db = new Db(config)

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

test.serial('db#getUsers', async t => {
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

test.serial('db#saveUser', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  const created = await db.saveUser(userFixture)
  const plainUser = created.get({ plain: true })

  t.is(plainUser.id, userFixture.id)
  t.is(plainUser.fullname, userFixture.fullname)
  t.is(plainUser.username, userFixture.username)
  t.is(plainUser.email, userFixture.email)
  t.is(plainUser.password, userFixture.password)
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
