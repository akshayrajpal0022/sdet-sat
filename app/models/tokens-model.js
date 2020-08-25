const db = require("../core/database");
const async = require("async");

const Schema = db.Database.Schema;
const ObjectId = Schema.Types.Oid;

const schema = new Schema(
  {
    id: ObjectId,
    user_id: { type: ObjectId, required: true },
    token: { type: String, required: true },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

var Tokens = db.Database.model("tokens", schema);

Tokens.saveToken = function (data, callback) {
  if (!data.id || data.id.toString().trim() == "") {
    return callback("Problem in Signin. Please try again later.", null);
  }
  if (!data.token || data.token.toString().trim() == "") {
    return callback("Problem in Signin. Please try again later.", null);
  }

  async.waterfall(
    [
      (callback) => {
        let filter = {
          user_id: data.id,
        };
        let update = {
          token: data.token,
        };
        Tokens.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true, // Make this update into an upsert
        },(err,res)=>{
            return callback(err,res);
        });
      },
    ],
    callback
  );
};

module.exports = Tokens;
