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
            /*Now find and update the school */
            Model.School.findOneAndUpdate( { name: dbres.school } , {$push: { feed: req.body } } ,
                {new: true} , function(err , dbSchool ) {

                if( !dbSchool ) {
                    res.writeHead(403, {
                            'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify ({
                        message: "Cannot find school" ,
                        status: '403'
                    }));
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(dbSchool));
                }

            });
        }

    });

};

exports.getItems = function( req , res ) {

    Model.User.findOne( { email: req.body.user } , function(err , dbres ) {
        if( !dbres ) {
            console.log('Cannot find user');
        } else {
            console.log('This user goes to: ' + dbres.school );
            Model.School.findOne( { name: dbres.school } , function( err , dbSchool ) {
                if( !dbSchool ) {
                    console.log('Cannot find school.');
                } else {
                    console.log('I found it: ' + JSON.stringify(dbSchool.feed));
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(dbSchool.feed));
                }
            });
        }
    });

};
