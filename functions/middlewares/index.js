const { makePermission } = require("./permission");

module.exports = {
  Query: {
    ping: makePermission(true),
  },
  Mutation: {
    ping: makePermission(true),
  },
};
