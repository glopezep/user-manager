const test = require('ava')
const Db = require('../')
const config = require('../config')
const fixtures = require('./fixtures')

config.database = 'user_manager_db_test'

const db = new Db(config)

test.beforeEach(async t => {
  await db.setup()
})

test.afterEach.always(async t => {
  await db.drop()
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
