var express = require('express');
var server = express();

var dependencies = {
    path: require('path') , 
    cors: require('cors') , 
    bodyParser: require('body-parser') , 
    mongodb: require('mongodb') , 
    multer: require('multer') , 
    mongojs: require('mongojs') , 
    morgan: require('morgan') ,
    //config: require('./config')
}
