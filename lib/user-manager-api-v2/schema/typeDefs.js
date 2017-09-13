module.exports = `
  type Group {
    id: ID!
    name: String!
    description: String!
    users: [User]
  }

  type User {
    id: ID!
    fullname: String!
    username: String!
    email: String!
    password: String!
    avatar: String!
    groupId: String
    group: Group
  }

  type Token {
    err: Boolean
    value: String!
  }

  type Query {
    group(id: String!): Group
    groups: [Group]
    user(username: String!): User
    usersByGroup(groupId: String!): [User]
    users: [User]
  }

  input newGroup {
    id: ID!
    name: String!
    description: String!
  }

  input editableGroup {
    name: String
    description: String
  }

  input newUser {
    id: ID!
    fullname: String!
    username: String!
    email: String!
    password: String!
    avatar: String!
    groupId: String
  }

  input editableUser {
    fullname: String
    username: String
    email: String
    password: String
    avatar: String
    groupId: String
  }

  type Mutation {
    saveGroup(group: newGroup): Group
    updateGroup(id: String!, group: editableGroup): Group
    deleteGroup(id: String!): Group
    saveUser(user: newUser): User
    updateUser(id: String!, user: editableUser): User
    deleteUser(id: String!): User
    authenticate(username: String!, password: String!): Token
  }
`
