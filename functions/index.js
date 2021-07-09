const { ApolloServer, makeExecutableSchema } = require("apollo-server-lambda");
const { applyMiddleware } = require("graphql-middleware");

const typeDefs = require("./schemas/");
const resolvers = require("./resolvers/");
const db = require("../database/models/");

const permissionsMiddleware = require("./middlewares");
const exceptionHandler = require("./exception-handler");
const { ERROR } = require("../util/messages");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const middleware = [permissionsMiddleware];

const schemaWithMiddleware = applyMiddleware(
  schema,
  ...middleware,
  (resolve, parent, args, context, info) => {
    if (!context.secure) {
      throw new ApolloError(ERROR.METHOD_WITHOUT_PERMISSION);
    }
    return resolve(parent, args, context, info);
  }
);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  formatError: exceptionHandler,
  async context({ event }) {
    return {};
  },
  playground: {
    endpoint: "/dev/graphql",
  },
});

db.sequelize.authenticate();

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
