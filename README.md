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
Run users service

```bash
npm run users-service

or

yarn users-service
```

Run groups service

```bash
npm run groups-service

or

yarn groups-service
```

### API Client Module

```js
const client = userManager.createClient()

client.saveUser(userData, (err, savedUser) => {
  // do something with savedUser
})

client.saveUser().then(user => {
  // do something with savedUser
}).catch(err => {
  // do something with user
})

```
