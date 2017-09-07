const crypto = require('crypto')

exports.encrypt = function encrypt (password) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}
