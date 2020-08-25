const Auth = require("../controllers/auth");

const express = require("express");
const router = express.Router();

/**
@api {post} /auth/signin Signin
@apiName Signin
@apiGroup Auth

@apiParam {String} username username of the user.
@apiParam {String} password password of the user for the given username.

@apiSuccess {Boolean} success Status of response. True if successful, false if error
@apiSuccess {Number} count Count of the records in data.
@apiSuccess {Object[]} error Error details if success is false.
@apiSuccess {Object[]} data Requested token if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 200 OK
	{
		"success": true,
		"data": [
			{
				"id":"5eb572f950caeb3b9715f300"
			    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVlYjU3MmY5NTBjYWViM2I5NzE1ZjMwMF9GcmkgTWF5IDA4IDIwMjAgMjA6NDQ6NTkgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpIg.QNfQWVmNGybPKtvnEhMrFiLwEI7yqb5J_f-vbSHgp_8"
			}
		],
		"count": 1,
		"error": []
	}
*/
router.post("/signin", Auth.signin);

module.exports = router;
