const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type User {
    id: Int
    role: Int
    username: String
    email: String
    name: String
    active: Boolean
  }

  input UserFilter {
    id: Int
    username: String
    name: String
  }

  extend type Query {
    users(filter: UserFilter): [User]
    user(id: Int): User
    currentUser: User
  }

  input UserInput {
    id: Int
    name: String
    email: String
    username: String
    password: String
    active: Boolean
  }
`;
