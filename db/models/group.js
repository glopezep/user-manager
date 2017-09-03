const Sequelize = require('sequelize')
const setupSequelize = require('../lib/setupSequelize')

module.exports = (config) => {
  const sequelize = setupSequelize(config)

  const Group = sequelize.define('group', {
    id: {
      type: Sequelize.CHAR(36),
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Group
}
