const fs = require("fs");
const path = require("path");

const SCHEMA_SUFFIX = "schema.js";

const schemas = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith(SCHEMA_SUFFIX))
  .map((file) => {
    const schema = require(path.join(__dirname, file));
    return schema;
  });
module.exports = schemas;
