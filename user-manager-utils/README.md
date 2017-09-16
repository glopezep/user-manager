# User Manger Utils

## Usage

```js
const utils = require('user-manager-utils')

const password = 'myPass'

utils.encrypt(password).then(hash => {
  // do something with password hash
}).catch(e => {
  // do something with err
})
```

Or

```js
utils.encrypt(password, (err, hash) => {
  if (err) {
    // do something with err
  }
  // do something with hash
})
```

## API

```js
utils.encrypt(password, [callback]) -> hash
utils.signToken(token, secret, [options], [callback]) -> token
utils.verifyToken(token, secret, [options], [callback]) -> decoded
utils.extractToken(req, [callback]) -> token
```
