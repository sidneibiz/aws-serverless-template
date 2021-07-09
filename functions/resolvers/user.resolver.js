module.exports = {
  Query: {
    users() {
      return [{ name: "TESTE" }];
    },
    user() {
      return { name: "TESTE" };
    },
    currentUser() {
      return { name: "TESTE" };
    },
  },
};
