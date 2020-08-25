const db = require("../core/database");
const async = require("async");
const authenticator = require("../lib/authenticator");

const Schema = db.Database.Schema;
const ObjectId = Schema.Types.Oid;

const schema = new Schema(
  {
    id: ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

var Users = db.Database.model("users", schema);

Users.signin = function (req, callback) {
  if (!req.body.username || req.body.username.toString().trim() == "") {
    return callback("username is missing.", null);
  }
  if (!req.body.password || req.body.password.toString().trim() == "") {
    return callback("password is missing.", null);
  }

  async.waterfall(
    [
      (callback) => {
        Users.findOne({ username: req.body.username }, function (err, user) {
          if (err) return callback(err);
          if (!user) return callback("No user found.", null);

          // check if the password is valid
          authenticator.comparePassword(
            { password: req.body.password, hash: user.password },
            function (err, res) {
              if (err) return callback(err, null);
              if (!res) return callback("Invalid Input", null);
              authenticator.generateToken({ id: user._id }, function (
                err,
                res
              ) {
                return callback(err, {count:1,data:res});
                // if (err) return callback(err, null);
                // var data = res;
                //save token
                // Tokens.saveToken(data,function(err){
                // 	return callback(err,{data:data});
                // })
              });
            }
          );
        });
      },
    ],
    callback
  );
};

module.exports = Users;
