module.exports = `
  type Group {
    id: ID!
    name: String!
    description: String!
    users: [User]
    updatedAt: String
    createdAt: String
  }

  type User {
    id: ID!
    fullname: String!
    username: String!
    email: String!
    password: String!
    avatar: String
    isActive: Boolean
    groupId: String
    group: Group
  }

  type Token {
    token: String!
  }

  input newGroup {
    name: String!
    description: String!
  }

  input editableGroup {
    name: String
    description: String
  }

  input newUser {
    fullname: String!
    username: String!
    email: String!
    password: String!
    isActive: Boolean
    avatar: String
    groupId: String
  }

  input editableUser {
    fullname: String
    username: String
    email: String
    password: String
    avatar: String
    isActive: Boolean
    groupId: String
  }

  type Query {
    group(id: String!): Group
    groups: [Group]
    user(username: String!): User
    usersByGroup(groupId: String!): [User]
    users: [User]
  }

  type Mutation {
    saveGroup(group: newGroup): Group
    updateGroup(id: String!, group: editableGroup): Group
    deleteGroup(id: String!): Group
    saveUser(user: newUser): User
    updateUser(username: String!, user: editableUser): User
    deleteUser(username: String!): User
    authenticate(username: String!, password: String!): Token
    verifyToken(token: String!): User
  }
`
