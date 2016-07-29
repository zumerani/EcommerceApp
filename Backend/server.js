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
var database = dependencies.mongoose.connect( dependencies.config.database.url , dependencies.config.database.collections );
/* {authMechanism: 'SCRAM-SHA-1'} */
//manageUsers variable
//var manageUsers = require('./Authentication/manageUser')( server , database );

//Set up our backend
function setUp() {
    server.use( dependencies.bodyParser.urlencoded( {extended: true } ) );
    server.use( dependencies.bodyParser.json() );
    //server.use( dependencies.cors );
    /* Set up CORS */
    // server.use(function(req, res, next) {
    //     res.header('Access-Control-Allow-Origin', "*");
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //     res.header('Access-Control-Allow-Headers', 'Content-Type');
    //     next();
    // });
    // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    server.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
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

//Server Start Up
function bootUp() {
    console.log("Starting up server ...");
    setUp();
    console.log("Starting APIs");
    initializeAPIS();
    var port = dependencies.config.port;
    server.listen( process.env.PORT || dependencies.config.port );
    //console.log( 'Listening ... ' + dependencies.config.base);
    server.use( express.static( __dirname + '/FrontEnd/www') );
    server.get('/' , function( req , res ) {
        return res.sendFile( dependencies.path.resolve('../FrontEnd/www/index.html') );
    });
}

bootUp();

console.log("Booted Up");
