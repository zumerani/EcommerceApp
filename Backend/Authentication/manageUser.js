pwdMgr = require('./managePasswords');

module.exports = function (server, database) {

    // unique index
    database.users.ensureIndex ({
        email: 1
    }, {
        unique: true
    })

    // Response to Register User POST
    server.post('/api/v1/app/auth/register', function (req, res, next) {
        var user = req.params; // Define user var from param
        // Encrypt Password
        pwdMgr.cryptPassword(user.password, function (err, hash) {
            user.password = hash; // convert userpassword to hashed value
            console.log("n", hash);
            database.users.insert(user,
                function (err, dbUser) {
                    if (err) {
                        if (err.code == 11000)
                            res.writeHead(400,{
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify({
                                error: err,
                                message: "A user with this email already exists"
                            }));
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        dbUser.password = "";
                        res.end(JSON.stringify(dbUser));
                    }
                });
        });
        return next();

    });

    // Response to Login Post
    server.post('/api/v1/app/auth/login', function (req, res, next) {
        var user = req.params;
        if (user.email.trim().length == 0 || user.password.trim().length == 0) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "Invalid Credentials"
            }));
        console.log("in");
        database.users.findOne({
            email: req.params.email
        }, function (err, dbUser) {

            pwdMgr.comparePassword(user.password, dbUser.password, function (err, isPasswordMatch) {

                if (isPasswordMatch) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    // remove passowrd hash before sending to the client
                    dbUser.password = "";
                    res.end(JSON.stringify(dbUser));
                } else {
                    res.writeHead(403, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify ({
                        error: "Invalid User"
                    }));
                }
            });
        });

        return next();
        }
    });
};
