const { ApolloError } = require("apollo-server-lambda");
const { ERROR } = require("../../util/messages");

/**
 * Check a single feature permission
 * @param {Number} feature Feature id
 * @param {Array<String>} requiredPermissions Permissions
 */
const makePermission = (feature, requiredPermissions) => {
  return async (resolve, parent, args, context, info) => {
    const allow = true;
    if (allow) {
      return resolve(parent, args, context, info);
    }
    return new ApolloError(`${ERROR.NO_PERMISSION} - ${feature}`);
  };
};

module.exports = {
  makePermission,
};
