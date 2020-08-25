const Product = require("../controllers/product");

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

/**
@api {get} /products/ Get Products
@apiName Products Get
@apiGroup Product

@apiParam {String} category_id Query parameter comma separated category ids.

@apiSuccess {Boolean} success Status of response. True if successful, false if error
@apiSuccess {Number} count Count of the records in data.
@apiSuccess {Object[]} error Error details if success is false.
@apiSuccess {Object[]} data Requested list of products if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 200 OK
	{
		"success": true,
	    "count": 6,
	    "data": [
	        {
	            "_id": "5ced16766ff7c3520b271f39",
	            "parent": null,
	            "name": "Men",
	            "details": "Mens shoes collection",
	            "status": true,
	            "sub_categories": [
	                {
	                    "_id": "5ced16ac6ff7c3520b2721ed",
	                    "parent": "5ced16766ff7c3520b271f39",
	                    "name": "Shoes",
	                    "details": "Men's shoe collections",
	                    "status": true
	                },
	                {
	                    "_id": "5ced2dd96ff7c3520b283c26",
	                    "parent": "5ced16766ff7c3520b271f39",
	                    "name": "Sunglasses",
	                    "details": "Men's Sunglases collections",
	                    "status": true
	                }
	            ]
	        },
	        {
	            "_id": "5ced1da86ff7c3520b2774b3",
	            "parent": "5ced16ac6ff7c3520b2721ed",
	            "name": "Sports & Fitness",
	            "details": "Men's sports shoe collections",
	            "status": true,
	            "sub_categories": []
	        }
	    ],
		"error": []
	}

*/
router.get("/", Product.getProducts);

/**
@api {get} /products/:product_id Get Product By Id
@apiName Products Get By Id
@apiGroup Product

@apiParam {String} product_id Product id.

@apiSuccess {Boolean} success Status of response. True if successful, false if error
@apiSuccess {Number} count Count of the records in data.
@apiSuccess {Object[]} error Error details if success is false.
@apiSuccess {Object[]} data Requested details of product if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 200 OK
	{
		"success": true,
	    "count": 1,
	    "data": [
	        {
	            "_id": "5cee4cceb0c05422f3911ee2",
	            "name": "Rebook Crossfit 1.0",
	            "categories": [
	                "5ced1da86ff7c3520b2774b3"
	            ],
	            "categoryObject": [
	                {
	                    "_id": "5ced1da86ff7c3520b2774b3",
	                    "parent": "5ced16ac6ff7c3520b2721ed",
	                    "name": "Sports & Fitness",
	                    "details": "Men's sports shoe collections",
	                    "status": true
	                }
	            ],
	            "description": "Rebook Crossfit 1.0",
	            "price": 100000
	        }
	    ],
		"error": []
	}

*/
router.get("/:product_id", Product.getProducts);

/**
@api {post} /products/ Create Product
@apiName Product Create
@apiGroup Product

@apiParam {String} name Name of category.
@apiParam {Array} categories Array of categories.
@apiParam {String} description Description of product.
@apiParam {Number} price Price of product.

@apiSuccess (201) {Boolean} success Status of response. True if successful, false if error
@apiSuccess (201) {Number} count Count of the records in data.
@apiSuccess (201) {Object[]} error Error details if success is false.
@apiSuccess (201) {Object[]} data Details of newly created product if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 201 OK
	{
		"success": true,
		"data": [
			{
			    "status": true,
			    "_id": "5cee4d366949732d4749cf9d",
			    "name": "Rebook Crossfit 2.0",
			    "categories": "5ced1da86ff7c3520b2774b3",
			    "description": "Rebook Crossfit 2.0",
			    "price": 10500,
			    "created_at": "2019-05-29T09:13:26.812Z",
			    "updated_at": "2019-05-29T09:13:26.812Z",
			    "__v": 0
			}
		],
		"count": 1,
		"error": []
	}

*/
router.post("/", auth.authenticate, Product.createProduct);

/**
@api {put} /products/:product_id Update Product
@apiName Product Update
@apiGroup Product

@apiParam {String} name Name of category.
@apiParam {Array} categories Array of categories.
@apiParam {String} description Description of product.
@apiParam {Number} price Price of product.

@apiSuccess (201) {Boolean} success Status of response. True if successful, false if error
@apiSuccess (201) {Number} count Count of the records in data.
@apiSuccess (201) {Object[]} error Error details if success is false.
@apiSuccess (201) {Object[]} data Details of updated product if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 201 OK
	{
		"success": true,
		"data": [
			{
			    "status": true,
			    "_id": "5cee4d366949732d4749cf9d",
			    "name": "Rebook Crossfit 2.0",
			    "categories": "5ced1da86ff7c3520b2774b3",
			    "description": "Rebook Crossfit 2.0",
			    "price": 10500,
			    "created_at": "2019-05-29T09:13:26.812Z",
			    "updated_at": "2019-05-29T09:13:26.812Z",
			    "__v": 0
			}
		],
		"count": 1,
		"error": []
	}

*/
router.put("/:product_id", auth.authenticate, Product.updateProduct);

module.exports = router;
