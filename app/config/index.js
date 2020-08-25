const database = require("./database");
const serverConfig = require("./server");

var Config = function () {
  var environment;

  class Config {
    constructor() {}
  }

  environment =
    process.env.NODE_ENV === void 0 ? "default" : process.env.NODE_ENV;

  // server configurations
  Config.server = {
    port: serverConfig[environment].port,
    env: environment,
  };

  // database configurations
  Config.database = {
    host: database[environment].host,
    port: database[environment].port,
    database: database[environment].database,
    username: database[environment].username,
    password: database[environment].password,
    dialect: database[environment].dialect,
    logging: database[environment].logging,
  };

  Config.SECURITY = { SALT: "$2a$10$/S/KNoZmO/rpjo.G56Akee" };

  return Config;
}.call(this);

module.exports = Config;
