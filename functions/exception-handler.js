const { ApolloError, toApolloError } = require("apollo-server-lambda");
const { ValidationErrorItem, ValidationError } = require("sequelize");

function exceptionHandler(graphQLError) {
  const { originalError, path, locations } = graphQLError;
  const errors = [];

  if (originalError) {
    if (originalError.errors) {
      for (const error of originalError.errors) {
        if (
          error instanceof ValidationErrorItem ||
          error instanceof ValidationError
        ) {
          errors.push(error.message);
        }
      }
    } else if (originalError instanceof ApolloError) {
      if (originalError.message) {
        errors.push(originalError.message);
      }
    }
  }

  if (!errors.length) {
    return graphQLError;
  }

  return errors.map((message) =>
    toApolloError({
      path,
      locations,
      message,
    })
  );
}

module.exports = exceptionHandler;
