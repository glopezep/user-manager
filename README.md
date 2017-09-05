# user-manager

## Usage

### Database Module
Database functions can be used like promise or callback patterns

```js
const { Db } = require('user-manager')

const config = {
  database: 'user_manager_db_test',
  username: 'usernameDb',
  password: 'userPass',
  host: 'localhost',
  dialect: 'mysql' // or postgres
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

### API Rest Module
Run users serivce

```bash
npm run users

or

yarn users
```

Run auth serivce

```bash
npm run auth

or

yarn auth
```
