const jwt = require("jwt-simple");
const config = require("../config/");
const bcrypt = require("bcryptjs");

// var authController = require('../controllers/auth');

const Authenticator = function () {};

Authenticator.prototype.generatePassword = function (passwordText, callback) {
  bcrypt.hash(passwordText.trim(), config.SECURITY.SALT_ROUNDS, function (
    err,
    hash
  ) {
    if (err) {
      console.log(err);
      return callback("Error generating password.", false);
    }

    return callback(false, hash);
  });
};

Authenticator.prototype.comparePassword = function (
  comparisionObject,
  callback
) {
  if (typeof comparisionObject != "object") {
    return callback("Invalid input", false);
  }

  if (comparisionObject.password == undefined) {
    return callback("Invalid input", false);
  }

  if (comparisionObject.hash == undefined) {
    return callback("Invalid input", false);
  }

  bcrypt.compare(
    comparisionObject.password.trim(),
    comparisionObject.hash.trim(),
    function (err, res) {
      return callback(err, res);
    }
  );
};

Authenticator.prototype.generateToken = function (userInfo, callback) {
  if (typeof userInfo != "object") {
    return callback("Invalid user data.");
  }

  if (userInfo.id == undefined) {
    return callback("Invalid user data.");
  }

  // ** Generating current date to randomise token
  let now = new Date();
  let generatedToken = jwt.encode(
    userInfo.id + "_" + now,
    config.SECURITY.SALT
  );

  userInfo.token = generatedToken;

  return callback(false, userInfo);
};

module.exports = new Authenticator();
