const uuid = require('uuid/v4')

function getGroup () {
  const id = uuid()
  return {
    id: id,
    name: `Group ${id}`,
    description: 'This is a example group description'
  }
}

function getGroups () {
  return [
    getGroup(),
    getGroup(),
    getGroup()
  ]
}

function getUser () {
  const id = uuid()
  return {
    id: id,
    fullname: `Jhon Doe, ${id}`,
    username: `jhon-doe-${id}`,
    password: '1234',
    email: `jhon-doe-${id}@test.com`,
    avatar: `${id}.jpg`
  }
}

function getUsers () {
  return [
    getUser(),
    getUser(),
    getUser()
  ]
}

module.exports = {
  getGroup,
  getGroups,
  getUser,
  getUsers
}
