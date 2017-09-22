const Sequelize = require('sequelize')

let sequelize = null

function setupSequelize (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}

module.exports = setupSequelize
