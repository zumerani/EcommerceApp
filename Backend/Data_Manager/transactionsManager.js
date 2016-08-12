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
    var user = req.body.sellerEmail;

    Model.User.findOne( { email: req.body.sellerEmail } , function( err , dbres ) {

        if( !dbres ) {
            /* Technically ... user should exist. */
            console.log("Cannot find user");
            res.writeHead(403, {
                    'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify ({
                    error: "Cannot find user" ,
                    status: '403'
            }));
        } else {
            /* Grab the found user's school */
            var school = dbres.school;
            res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
            });
                // remove passowrd hash before sending to the client
            res.end(JSON.stringify(dbres));
            console.log('School that I found is: ' + school );
        }

    });


    // item.save( function(err) {
    //     if(err) {
    //         res.status(404).send('error adding');
    //         console.log(err);
    //     } else {
    //         //dbres.password = ""; //look at this line again .... just incase
    //         res.status(200).send('added!');
    //         console.log("Item added");
    //     }
    // });
};
