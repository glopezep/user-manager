const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const tokenExtractor = require('token-extractor');
const Promise = require('bluebird')

exports.encrypt = (password) => {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

exports.signToken = (payload, secret, options, callback) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

exports.verifyToken = (token, secret, options, callback) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

exports.extractToken = (req, callback) => {
  return new Promise((resolve, reject) => {
    tokenExtractor(req, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}
