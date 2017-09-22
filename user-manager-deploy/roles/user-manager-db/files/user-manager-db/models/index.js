const setupUserModel = require('./user')
const setupGroupModel = require('./group')

module.exports = (config) => {
  const User = setupUserModel(config)
  const Group = setupGroupModel(config)

  User.belongsTo(Group)
  Group.hasMany(User)

  return {
    User,
    Group
  }
}
