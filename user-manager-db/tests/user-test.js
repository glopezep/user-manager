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
  await t.throws(db.saveUser(null), /empty data/)
})

test.serial('db#getUser', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')

  const userFixture = fixtures.getUser()
  await db.saveUser(userFixture)
  const plainUser = await db.getUser(userFixture.username)
  console.log(plainUser)

  t.is(plainUser.id, userFixture.id)
  t.is(plainUser.fullname, userFixture.fullname)
  t.is(plainUser.username, userFixture.username)
  t.is(plainUser.email, userFixture.email)
  t.is(plainUser.password, userFixture.password)
  t.is(plainUser.avatar, userFixture.avatar)
  await t.throws(db.getUser(null), /empty data/)
  await t.throws(db.getUser('foo'), /not found/)
})
