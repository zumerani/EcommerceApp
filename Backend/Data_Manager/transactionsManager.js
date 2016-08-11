var db;
var objectId;
var _mongoose;

exports.init = function( database , ObjectID) {
    db = database;
    objectId = ObjectID;
};

var Model = require('../Models/models');

exports.addItem = function( req , res ) {
    console.log('Hey! Someone pinged me!');
    console.log('Since someone pinged me, here: ' + JSON.stringify( req.body ) );

    var item = new Model.Item( req.body );
    item.save( function(err) {
        if(err) {
            res.status(404).send('error adding');
            console.log(err);
        } else {
            //dbres.password = ""; //look at this line again .... just incase
            res.status(200).send('added!');
            console.log("User added");
        }
    });
};
