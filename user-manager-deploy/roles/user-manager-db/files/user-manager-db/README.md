# user-manager-db

## Usage

```js
const Db = require('user-manager-db')

const config = {
  database: 'user_manager_db_test',
  username: 'usernameDb',
  password: 'userPass',
  host: 'localhost',
  dialect: 'mysql' || 'postgres',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  setup: false
}

const db = new Db(config)

const user = db.saveUser(userData).then(user => {
  // do something with user
  console.log(user)
}).catch(err => {
  // do something with error
  console.log(err.message)
})
```
Or using callbacks
```js
const user = db.saveUser(userData, (err, user) => {
  if (err) {
    // do something with error
    console.log(err.message)
  }
  // do something with user
  console.log(user)
})

```

## API

```js
db.saveGroup(group, [callback]) -> Group
db.getGroup(groupId, [callback]) -> Group
db.getGroups([callback]) -> [Group]
db.updateGroup(groupId, data, [callback]) -> Group
db.deleteGroup(groupId, [callback]) -> Group
db.saveUser(user, [callback]) -> User
db.getUser(userId, [callback]) -> User
db.getUsers([callback]) -> [User]
db.getUsersByGroup(groupId, [callback]) -> [User]
db.updateUser(userId, data, [callback]) -> User
db.deleteUser(userId, [callback]) -> User
```
