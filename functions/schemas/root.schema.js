const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Query {
    ping: Boolean
  }

  type Mutation {
    ping: Boolean
  }
`;
