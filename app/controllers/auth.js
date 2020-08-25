const Controller = require("../core/controller");

// Models
const models = require("../models");

var Auth = function () {
  Controller.call(this);
};

Auth.prototype = Object.create(Controller.prototype);
Auth.prototype.constructor = Auth;

Auth.prototype.signin = function (req, res) {
  models.users.signin(req, function (err, token) {
    if (err) {
      return Auth.prototype.processErrorReponse(res, err);
    }
    return Auth.prototype.processSuccessReponse(res, token);
  });
};

module.exports = new Auth();
