var db;
//var dbData = require('../Models/models');
var objectId;

exports.init = function( database , ObjectID ) {
    db = database;
    objectId = ObjectID;
}

/* Add user */
exports.addUser = function( req , res ) {

    console.log("HTTP Post: '/api/v1/users/addUser'");
    // db.users.findOne({
    //     email: req.body.email
    // } , function( err , dbResult) {
    //     if(err)
    //         if(res) res.status(503).end(JSON.stringify(err));
    //     if(dbResult){
    //         if(res) res.status(200).end("User Already there.");
    //     } else {
    //         var promise = dbData.createUser(req.body);
    //         promise.then(function(user) {
    //
    //             db.users.save( user , function(err , user) {
    //                 if(err) {
    //                     console.log(err);
    //                     if(res) res.status(503).end(JSON.stringify(err));
    //                 } else
    //                     if( res ) res.status(201).end(JSON.stringify(user));
    //             });
    //
    //         });
    //     }
    //
    // });

    // db.Users.find( function(err , docs) {
    //     if( err )
    //         console.log(err);
    //     else {
    //         console.log(docs);
    //     }
    // });

    db.Users.findOne( {
        name: 'Zain'
    } , function( err , dbres ) {
        if(err)
            console.log(err);
        else if(dbres) {
            console.log(dbres);
            console.log("it exists man.");
        }
    });

    db.Users.find( function(err , docs) {
        if( err )
            console.log(err);
        else {
            console.log(docs);
        }
    });

};
