var db;
//var dbData = require('../Models/models');
var objectId;
var _mongoose;

exports.init = function( database , ObjectID) {
    db = database;
    objectId = ObjectID;
}

// var model = require('../Models/models');
var Model = require('../Models/models');
var pwdManager = require('../Authentication/managePasswords');
var express = require('express');

/* Add user */
exports.addUser = function( req , res ) {
    console.log("HTTP Post: '/api/v1/users/addUser'");

    var user = req.body;
    pwdManager.cryptPassword( user.password , function(err , hash) {

        user.password = hash;
        console.log(hash);

        Model.User.findOne( { email: user.email } , function( err , dbres ) {
            if( !dbres ) {
                var param = req.body;
                var user = new Model.User( param );
                user.save( function(err) {
                    if(err) {
                        res.status(404).send('error adding');
                        console.log(err);
                    }else {
                        res.status(200).send('added!');
                        console.log("User added");
                    }
                });
            } else {
                res.status(503).send('oops');
                console.log("Exists.")
            }
        });

    });

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
    // db.User.find( function(err , docs) {
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

    // var hello_world = new Model.School( { name : 'Harvard' } );
    // hello_world.save( function(err) {
    //     if(err)
    //         console.log(err);
    //     else
    //         console.log('saved hello_world!');
    //
    // });
    //
    // var user = new Model.User( { first : 'Sid' } );
    // user.save( function(err) {
    //     if(err)
    //         console.log(err);
    //     else {
    //         console.log('saved new user!');
    //     }
    // });

    // var temp = Model.User.findOne( {first:'Sid' } , function(err , res){
    //     if(!res) {
    //         console.log('cant find sid');
    //     }else {
    //         console.log('found');
    //         res.email = 'sid.nikam@gmail.com';
    //         console.log('added email');
    //         res.save( function(err) {
    //             if(err)
    //                 console.log(err);
    //             else {
    //                 console.log('Just saved: ' + res + '!!');
    //             }
    //         });
    //     }
    // });
    // Model.User.findOne( { email:'sid.nikam@gmail.com' } , function(err , res) {
    //
    //     if(!res) {
    //         console.log('I cant find him through email!!');
    //     }else {
    //         console.log('I found him through email!');
    //         var params = {
    //             itemName: 'Fix Tires' ,
    //             days_old: '5' ,
    //             sellerEmail: res.email
    //         };
    //         Model.School.findOne( { name : 'Harvard' } , function(err , res) {
    //             if(!res)
    //                 console.log('not found');
    //             else { //found
    //                 var item = new Model.Item( params );
    //                 console.log('item is:  ' + item);
    //                 res.feed.push( item );
    //                 console.log('Done!!');
    //                 res.save( function(err) {
    //                     if(err)
    //                         console.log('Hard time saving.');
    //                     else
    //                         console.log('Just saved the feed in: ' + res.name + '!!');
    //                 });
    //             }
    //         });
    //     }
    // });

    // console.log('userTwo email is: ' + userTwo.first );

    // var params = {
    //     itemName: 'Fix Tires' ,
    //     days_old: '5' ,
    //     sellerEmail: userTwo.email
    // };
    //
    // Model.School.findOne( { name : 'Harvard' } , function(err , res) {
    //     if(!res)
    //         console.log('not found');
    //     else { //found
    //         var item = new Model.Item( params );
    //         console.log('item is:  ' + item);
    //         res.feed.push( item );
    //         console.log('Done!!');
    //     }
    // });



};
