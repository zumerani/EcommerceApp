var db;
//var dbData = require('../Models/models');
var objectId;
var _mongoose;

exports.init = function( database , ObjectID) {
    db = database;
    objectId = ObjectID;
    // _mongoose = mongoose;
}

// var model = require('../Models/models');
var Model = require('../Models/models');
console.log('model is ' + Model );

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

    // db.Users.findOne( {
    //     name: 'Zain'
    // } , function( err , dbres ) {
    //     if(err)
    //         console.log(err);
    //     else if(dbres) {
    //         console.log(dbres);
    //         console.log("it exists man.");
    //     }
    // });
    //
    // db.Users.find( function(err , docs) {
    //     if( err )
    //         console.log(err);
    //     else {
    //         console.log(docs);
    //     }
    // });

    // var Cat = db.model('Cat' , {name:String} );
    // var kitty = new Cat( { name: 'Lol'});
    // kitty.save( function(err) {
    //     if( err ) {
    //         console.log(err);
    //     } else {
    //         console.log('meow');
    //     }
    // });


    // var item = model.createModels.Item( { name : 'haha' } );
    // var item = model.createModels().Item( {name : 'haha' } );
    // console.log( "Item is: " + item );
    //
    // item.save( function(err) {
    //     if(err)
    //         console.log(err);
    //     else {
    //         console.log('saved item!');
    //     }
    // });
    //
    // var itemTwo = model.createModels().Item( {name : 'omg!' } );
    // itemTwo.save( function(err) {
    //     if(err)
    //         console.log(err);
    //     else {
    //         console.log('saved item!');
    //     }
    // });

    // model.Item.find({} , {} , function(err , res) {
    //     if(err)
    //         console.log('error');
    //     else {
    //         console.log(res);
    //     }
    // });

    // var itemOne = new Item( { itemName : 'Brown' } );
    // console.log(itemOne);
    // itemOne.save( function(err) {
    //     if(err)
    //         console.log(err);
    //     else {
    //         console.log('saved itemOne!');
    //     }
    // });

    // var itemTwo = Item( { name : 'heehee' } );
    // itemTwo.save( function(err) {
    //     if(err)
    //         console.log(err);
    //     else {
    //         console.log('saved itemTwo!');
    //     }
    // });

    var hello_world = new Model.School( { name : 'Harvard' } );
    hello_world.save( function(err) {
        if(err)
            console.log(err);
        else
            console.log('saved hello_world!');

    });

    var user = new Model.User( { first : 'Zain' , last: 'Umerani' } );
    user.save( function(err) {
        if(err)
            console.log(err);
        else {
            console.log('saved new user!');
        }
    });

    var userTwo = new Model.User( { first : 'Sid' , last: 'Nikam' } );
    userTwo.save( function(err) {
        if(err)
            console.log(err);
        else {
            console.log('saved new user (sid)!');
        }
    });

};
