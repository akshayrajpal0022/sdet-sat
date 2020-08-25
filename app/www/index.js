var cluster     = require('cluster')  // Only required if you want the worker id
var sticky      = require('sticky-session') 
var config      = require('../config/') 
var models      = require('../models') 

var http        = require('http') 
var app         = module.exports = require('express')() 
var express     = require('express')


var server      = require('http').createServer(app) 


var port        = process.env.PORT || config.server.port 


var bodyParser  = require('body-parser') 
var helmet      = require('helmet') 

app.set('CONFIG', config) 


if (!sticky.listen(server, port)) {

    // Master code
    server.once('listening', function () {


            console.log("Listening to port " + port + "..") 
    }) 

} else {

    console.log("Worker %d is up and running..", cluster.worker.id) 

    // Express server setup
    app.use(helmet()) 
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    })) 
    app.use(bodyParser.json())        // to support JSON-encoded bodies


    // ========================================== ROUTES ==========================================
    var router     = require('../routes/')(app) 

    app.use('/doc', express.static('doc'))

}
