const Category = require("../controllers/category");
const Product = require("../controllers/product");

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

/**
@api {get} /categories/ Get Categories
@apiName Category Get
@apiGroup Category

@apiSuccess {Boolean} success Status of response. True if successful, false if error
@apiSuccess {Number} count Count of the records in data.
@apiSuccess {Object[]} error Error details if success is false.
@apiSuccess {Object[]} data Requested list of categories and sub categories if success is true.
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
router.get("/", Category.getCategories);

/**
@api {get} /categories/:category_id Get Category By Id
@apiName Category Get By Id
@apiGroup Category

@apiParam {String} category_id Category id.

@apiSuccess {Boolean} success Status of response. True if successful, false if error
@apiSuccess {Number} count Count of the records in data.
@apiSuccess {Object[]} error Error details if success is false.
@apiSuccess {Object[]} data Requested category details if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 200 OK
	{
		"success": true,
	    "count": 1,
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
	        }
	    ],
		"error": []
	}

*/
router.get("/:category_id", Category.getCategories);

/**
@api {get} /categories/:category_id/products Get Category Products
@apiName Category Products By Id
@apiGroup Category

@apiSuccess {Boolean} success Status of response. True if successful, false if error
@apiSuccess {Number} count Count of the records in data.
@apiSuccess {Object[]} error Error details if success is false.
@apiSuccess {Object[]} data Requested list of products under the category if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 200 OK
	{
		"success": true,
	    "count": 1,
	    "data": [
	        {
	            "_id": "5cee34b46ff7c3520b36ae69",
	            "name": "Fastrack Sunglasses Round",
	            "categories": [
	                "5ced2dd96ff7c3520b283c26"
	            ],
	            "categoryObject": [
	                {
	                    "_id": "5ced2dd96ff7c3520b283c26",
	                    "parent": "5ced16766ff7c3520b271f39",
	                    "name": "Sunglasses",
	                    "details": "Men's Sunglases collections",
	                    "status": true
	                }
	            ],
	            "description": "Fastrack Sunglasses Round",
	            "price": 1500
	        }
	    ],
		"error": []
	}

*/
router.get("/:category_id/products", Product.getProducts);

/**
@api {post} /categories/ Create Category
@apiName Category Create
@apiGroup Category

@apiParam {String} parent Parent category id OR null.
@apiParam {String} name Name of category.
@apiParam {String} details Details of category.

@apiSuccess (201) {Boolean} success Status of response. True if successful, false if error
@apiSuccess (201) {Number} count Count of the records in data.
@apiSuccess (201) {Object[]} error Error details if success is false.
@apiSuccess (201) {Object[]} data Details of newly created category if success is true.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 201 OK
	{
		"success": true,
		"data": [
			{
			    "status": true,
			    "_id": "5cee514f415a7c350df6fc5a",
			    "parent": "5ced16ac6ff7c3520b2721ed",
			    "name": "Formals",
			    "details": "Men's formals shoe collections",
			    "created_at": "2019-05-29T09:30:55.065Z",
			    "updated_at": "2019-05-29T09:30:55.065Z",
			    "__v": 0
			}
		],
		"count": 1,
		"error": []
	}

*/
router.post("/", auth.authenticate, Category.createCategory);

module.exports = router;
