var db;
var objectId;
var _mongoose;

exports.init = function( database , ObjectID) {
    db = database;
    objectId = ObjectID;
}

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
                    } else {
                        //dbres.password = ""; //look at this line again .... just incase
                        res.status(200).send('added!');
                        console.log("User added");
                    }
                });

                Model.School.findOne( { name: user.school } , function( err , dbres ) {

                    if( !dbres ) {
                        console.log("School doesn't exist ... let's add it");
                        var newSchool = new Model.School( { name: user.school } );
                        newSchool.save( function(err) {
                            if( err ) {
                                console.log("error!!");
                            } else {
                                console.log("school added!!");
                            }
                        })
                    } else {
                        console.log("School exists ... ");
                    }

                });

            } else {
                res.status(503).send('oops');
                console.log("Exists.")
            }
        });

    });

};

exports.loginUser = function( req , res ) {

    console.log("HTTP POST: '/api/v1/users/loginUser' " );

    console.log( req.body.email +' and ' + req.body.password );

    var user = req.body;

    if( user.email.trim().length == 0 || user.password.trim().length == 0 ) {
        console.log('Invalid Credentials');
        res.writeHead(401, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({
            error: "Invalid Credentials" ,
            status: '401'
        }));
        return;
    }
    Model.User.findOne( { email : req.body.email } , function(err , dbres ) {

        if( !dbres ) {
            res.writeHead(404 , {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify( {
                error: "User does not exist ... you need to sign up first!" ,
                status: '404'
            }));
            console.log("we have an error ... no user!: ");
            return;
        }

        pwdManager.comparePassword( user.password , dbres.password , function( err , isPasswordMatch ) {

            if( isPasswordMatch ) {
                console.log('we have a winner');
                res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    // remove passowrd hash before sending to the client
                dbres.password = "";
                res.end(JSON.stringify(dbres));
            } else {
                console.log('sorry, but wrong guy ... Invalid User');
                res.writeHead(403, {
                        'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify ({
                        error: "Invalid User" ,
                        status: '403'
                }));
            }

        });

    });

};

exports.addItem = function( req , res ) {

    console.log('someone pinged me');

};
