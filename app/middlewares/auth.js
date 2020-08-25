const jwt = require("jwt-simple");
const config = require("../config/");
const Users = require("../models/users-model");
const CODES = require("../lib/status_codes");

module.exports.authenticate = function (req, res, next) {
  var token = getToken(req.headers);

  if (!token) {
    return res.status(CODES.UNAUTHORIZED).send("Unauthorized");
  }

  try {
    var decodedToken = jwt.decode(token, config.SECURITY.SALT);
  } catch (err) {
    return res.status(CODES.UNAUTHORIZED).send("Unauthorized");
  }

  var userId = getUserIdFromDecodedToken(decodedToken);

  //validate user id from received token
  Users.findById(userId, { password: 0 }, (err, user) => {
    if (err) res.status(500).send("Something went wrong.");
    // console.log(err,user);
    if (!user) {
      return res.status(CODES.UNAUTHORIZED).send("Unauthorized");
    }
    console.log("user", user);
    req.user_info = user._id;
    return next();
  });
};

// ========================================== FUNCTIONS ==========================================
var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");

    if (parted.length != 2) {
      return null;
    }

    if (parted[0] != "Bearer") {
      return null;
    }

    return parted[1];
  } else {
    return null;
  }
};

var getUserIdFromDecodedToken = function (decodedToken) {
  var parted = decodedToken.split("_");
  return parted[0];
};
