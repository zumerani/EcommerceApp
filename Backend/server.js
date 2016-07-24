var express = require('express');
var server = express();

//Dependencies
var dependencies = {
    path: require('path') ,
    cors: require('cors') ,
    bodyParser: require('body-parser') ,
    mongodb: require('mongodb') ,
    multer: require('multer') ,
    mongojs: require('mongojs') ,
    morgan: require('morgan') ,
    config: require('./configurations') ,
    mongoose: require('mongoose')
}

//Instantiate our Database (MongoDB)
var database = dependencies.mongojs( dependencies.config.database.url , ['Schools'] );

//manageUsers variable
//var manageUsers = require('./Authentication/manageUser')( server , database );

//Set up our backend
function setUp() {
    server.use( dependencies.bodyParser.urlencoded( {extended: true } ) );
    server.use( dependencies.bodyParser.json() );
    server.use( dependencies.cors );
}

//Set up data managers (dataManagers)
var dataManagers = {
    users: require('./Data_Manager/userManager')
}

//Set up routes as we go
var routes = require('./Routes/routes');

//Initialize APIs
function initializeAPIS() {
    routes.init(server , dataManagers);
    dataManagers.users.init( database , dependencies.mongodb.ObjectID);
    routes.userSetup();
}

function bootUp() {
    console.log("starting up ...");
    setUp();
    console.log("Starting APIs");
    initializeAPIS();
    var port = dependencies.config.port;
    server.listen(port);
    console.log( 'Listening on port: ' + port );
}

bootUp();

// server.get( '/' , function(req , res) {
//     res.send('Hello, World!');
// });
