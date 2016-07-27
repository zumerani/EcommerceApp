var _mongoose;
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/* Schemas */
var itemSchema = new Schema( {
    itemName: String ,
    days_old: Number ,
    sellerName: String ,
    sellerEmail: String ,
    picture_link: String
});

var userSchema = new Schema( {
    first: String ,
    last: String ,
    email: String ,
    password: String ,
    school: String ,
    sold: [String] ,
    bought: [String]
});

var schoolSchema = new Schema({
        name: String ,
        feed: [ itemSchema ]
});

var Item;
var User;
var School;

/* checks to see if schemas have been 'instantiated' or not */
if( mongoose.models.Item ) {
    Item = mongoose.model('Item');
} else {
    Item = mongoose.model('Item' , itemSchema );
}

if( mongoose.models.User ) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User' , userSchema );
}

if( mongoose.models.School ) {
    School = mongoose.model('School');
} else {
    School = mongoose.model('School' , schoolSchema );
}

/* export it */
module.exports = { Item , User , School };
