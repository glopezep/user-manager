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

const user = db.saveUser(userData, (err, user) => {
  if (err) {
    // do something with error
    console.log(err.message)
  }
  // do something with user
  console.log(user)
})

```