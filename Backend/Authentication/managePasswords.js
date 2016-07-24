var bcrypt = require('bcryptjs');

module.exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {

            // return error if err
            if (err) {
                return callback(err);
            }

            // Returns encrypted password
            bcrypt.hash(password, salt, function (err, hash) {
                return callback(err,hash);
            });
   });
};

module.exports.comparePassword = function (password, userPassword, callback) {

    // Compares entered password with userPassword
    bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {

            if (err)
                return callback(err);

            // Return isPasswordMAtch
            return callback(null, isPasswordMatch);
    });
};
