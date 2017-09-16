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
