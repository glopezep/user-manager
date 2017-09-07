const uuid = require('uuid/v4')

function getGroup () {
  const id = uuid()
  return {
    id: 'a348fc06-9358-11e7-abc4-cec278b6b50a',
    name: `Group`,
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
    id: 'a348fc06-9358-11e7-abc4-cec278b6b50a',
    fullname: `Jhon Doe a348fc06-9358-11e7-abc4-cec278b6b50a`,
    username: `jhon-doe-a348fc06-9358-11e7-abc4-cec278b6b50a`,
    password: '1234',
    email: `jhon-doe-a348fc06-9358-11e7-abc4-cec278b6b50a@test.com`,
    avatar: `a348fc06-9358-11e7-abc4-cec278b6b50a.jpg`
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
