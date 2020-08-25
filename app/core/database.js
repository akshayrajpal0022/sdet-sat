const config 	= require('../config/')

const mongoose 	= require('mongoose')
// connectionString= 'mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.database
connectionString= "mongodb+srv://satuser:gZ84CIKfq2xyX4e4@catalogue-dg0qr.mongodb.net/test?retryWrites=true&w=majority";

// initialize connection
mongoose.connect(connectionString, {
	/* auth: {
		user 	: config.database.username,
		password: config.database.password
	}, */
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify:false
})
.then(function(res) {
	return console.log("Database connected ...")
})
.catch(function(err) {
	console.log(err)
	return process.exit()
})

module.exports = {
	Database 	: mongoose
}