const Controller 	= require('../core/controller')
const Config 		= require('../config/')
const async 		= require('async')
const authenticator = require('../lib/authenticator')

// Models
const models 		= require('../models')

var Category = function() {
	Controller.call(this)
} 

Category.prototype = Object.create(Controller.prototype) 
Category.prototype.constructor = Category


Category.prototype.getCategories = function(req, res) {

	models.categories.getCategories(req, function(err, categories) {
		if(err) {
			return Category.prototype.processErrorReponse(res, err)
		}	

		return Category.prototype.processSuccessReponse(res, categories)
	})
} 


Category.prototype.createCategory = function(req, res) {

	models.categories.createCategory(req, function(err, category) {
		if(err) {
			return Category.prototype.processErrorReponse(res, err)
		}	
		
		return Category.prototype.processCreatedReponse(res, category)
	})
}



module.exports = new Category() 
