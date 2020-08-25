const db		= require('../core/database')
const async 	= require('async')

const Schema	= db.Database.Schema
const ObjectId	= Schema.Types.Oid

const schema 	= new Schema(
	{
		id 			: ObjectId,
		categories	: { type: Array, ref: 'categories', required: true },
		name 		: { type: String, required: true },
		description : { type: String, required: true },
		price		: { type: Number, required: true },
		status 		: { type: Boolean, default: true },
		created_at 	: { type: Date, default: Date.now },
		updated_at 	: { type: Date, default: Date.now },
	}, 
	{
		toObject: { virtuals: true },
		toJSON  : { virtuals: true }
	}
)

var Products 	= db.Database.model('products', schema)

Products.getProducts = function(req, callback) {

	// check if categories passed in param or query
	categoryIds = []
	if (req.params.category_id) {
		categoryIds.push( db.Database.Types.ObjectId(req.params.category_id) )
	}
	if (req.query.category_id) {
		categories = req.query.category_id.split(",")
		categories.forEach((category) => {
			categoryIds.push( db.Database.Types.ObjectId(category) )
		})
	}

	async.waterfall([

			(callback) => {

				let query = {status: true}
				if(req.params.category_id || req.query.category_id) {
					query.categories = { $in: categoryIds }
				}
				if (req.params.product_id) {
					query._id = req.params.product_id
				}

				Products.countDocuments(query, function(err, count) {
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

				let query = [
				    {"$unwind": "$categories"},
				    {"$lookup": {
				        "from"		: 'categories', 
				        "localField": 'categories', 
				        "foreignField": '_id', 
				        "as"		: 'categoryObject'}},
				    {"$unwind": "$categoryObject"},
				    {"$match": { "categoryObject.status": true, "status": true, }},
				    {"$group":{
				        "_id":"$_id",
				        "name":"$name",
				        "categories":{"$push": "$categories"},
				        "categoryObject": {"$push": "$categoryObject"},
				        "name": {"$first": "$name"},
				        "description": {"$first": "$description"},
				        "price": {"$first": "$price"}
				    }}
				]
				if(req.params.category_id || req.query.category_id) {
					query.push({"$match": { "categories": { "$in": categoryIds } }})
				}
				if (req.params.product_id) {
					query.push({"$match": { "_id": db.Database.Types.ObjectId(req.params.product_id) }})
				}

				Products.aggregate(query).exec((err, products) => {

					if(err) {
						return callback(err)
					}

					return callback(null, {
						count: count,
						data : products
					} )
				})
			}

		], callback)
}


Products.createProduct = function(req, callback) { 

	if (!req.body.name || req.body.name.toString().trim() === '') {
		return callback("Name is missing.", null)
	}
	if (!req.body.categories || !Array.isArray(req.body.categories)) {
		return callback("Categories should be array of categories.", null)
	}
	if (!req.body.description || req.body.description.toString().trim() === '') {
		return callback("Description is missing.", null)
	}
	if (!req.body.price || isNaN(req.body.price.toString().trim()) === true) {
		return callback("Price should be number.", null)
	}

	async.waterfall([

		(callback) => {
			// validate data
			return callback(null, true)
		},

		(validated, callback) => {

			let categories = []
			req.body.categories.forEach((category) => {
				categories.push( db.Database.Types.ObjectId(category) )
			})

			let insertData = {
				"name" 			: req.body.name,
			    "categories" 	: categories,
			    "description" 	: req.body.name,
			    "price" 		: req.body.price
			}
			Products.create(insertData, (err, res) => {
				return callback(err, res)
			})
		}

	], callback)
}


Products.updateProduct = function(req, callback) { 

	// validations
	if(!req.params.product_id || req.params.product_id.toString().trim()==='') {
		return callback("No param id", null)
	}
	if (!req.body.name || req.body.name.toString().trim() === '') {
		return callback("Name is missing.", null)
	}
	if (!req.body.categories || !Array.isArray(req.body.categories)) {
		return callback("Categories should be array of categories.", null)
	}
	if (!req.body.description || req.body.description.toString().trim() === '') {
		return callback("Description is missing.", null)
	}
	if (!req.body.price || isNaN(req.body.price.toString().trim()) === true) {
		return callback("Price should be number.", null)
	}

	async.waterfall([

		(callback) => {
			// validate data
			return callback(null, true)
		},

		(validated, callback) => { 

			Products.findOne({_id: req.params.product_id}, (err, product) => {

				if(!product) {
					return callback("No product id", null)
				}

				let categories = []
				req.body.categories.forEach((category) => {
					categories.push( db.Database.Types.ObjectId(category) )
				})

				product.name 		= req.body.name
				product.categories	= categories
				product.description = req.body.description
				product.price		= req.body.price

				product.save((err) => {
					if(err) {
						return callback(err)
					}

					return callback(null, true)
				})
			})
		}

	], callback)
}


module.exports = Products
