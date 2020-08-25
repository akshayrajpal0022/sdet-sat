const db		= require('../core/database')
const async 	= require('async')

const Schema	= db.Database.Schema
const ObjectId	= Schema.Types.Oid

const schema 	= new Schema(
	{
		id 			: ObjectId,
		parent		: { type: ObjectId, required: true },
		name 		: { type: String, required: true },
		details 	: { type: String, required: true },
		status 		: { type: Boolean, default: true },
		created_at 	: { type: Date, default: Date.now },
		updated_at 	: { type: Date, default: Date.now },
	}, 
	{
		toObject: { virtuals: true },
		toJSON  : { virtuals: true }
	}
)

var Categories 	= db.Database.model('categories', schema)

Categories.getCategories = function(req, callback) {

	async.waterfall([

			(callback) => {

				let query = {status: true}
				if(req.params.category_id) {
					query._id = req.params.category_id
				}

				Categories.countDocuments(query, function(err, count) {
					if(err) {
						return callback(err)
					}

					return callback(null, count)
				})
			},

			(count, callback) => {

				if(count == 0) {

					let response = {
						count: count,
						data : []
					}
					return callback(null, response)
				}

				let query = []
				if(req.params.category_id) {
					query.push({ "$match": { "_id": db.Database.Types.ObjectId(req.params.category_id) }  })
				}
				query.push({
				        "$lookup": {
				            "from": "categories",
				            "localField": "_id",
				            "foreignField": "parent",
				            "as": "sub_categories"
				        }
				    })

				Categories.aggregate(query).exec((err, categories) => {

					if(err) {
						return callback(err)
					}

					return callback(null, {
						count: count,
						data : categories
					} )
				})
			}

		], callback)
}


Categories.createCategory = function(req, callback) { 

	if (!req.body.parent || req.body.parent.toString().trim() == '') {
		return callback("Parent category is missing.", null)
	}
	if (!req.body.name || req.body.name.toString().trim() == '') {
		return callback("Category name is missing.", null)
	}
	if (!req.body.details || req.body.details.toString().trim() == '') {
		return callback("Category details is missing.", null)
	}

	async.waterfall([

		(callback) => {

			let insertData = {
				"parent" 		: req.body.parent ? db.Database.Types.ObjectId(req.body.parent) : null,
				"name"			: req.body.name,
			    "details" 		: req.body.details
			}
			Categories.create(insertData, (err, res) => {
				return callback(err, res)
			})
		}

	], callback)
}


module.exports = Categories