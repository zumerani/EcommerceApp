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
    config: require('./configurations')
}

//Instantiate our Database (MongoDB)
var database = dependencies.mongojs( dependencies.config.database.url );

//Set up our backend
function setUp() {
    server.use( dependencies.bodyParser.urlencoded( {extended: true } ) );
    server.use( dependencies.bodyParser.json() );
    server.use( dependencies.cors );
}

//Set up data managers (dataManagers)


//Set up routes as we go

//Start up our server
var port = dependencies.config.port;
server.listen(port);

server.get( '/' , function(req , res) {
    res.send('Hello, World!');
});