const fs = require("fs");
const path = require("path");

const RESOLVER_SUFFIX = "resolver.js";

const resolvers = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith(RESOLVER_SUFFIX))
  .map((file) => {
    const resolver = require(path.join(__dirname, file));

    return resolver;
  });

module.exports = resolvers;
