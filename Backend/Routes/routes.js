init = false;

var _server;
var dataManager;
var objectId;

exports.init = function( server , dataManagers ) {
    _server = server;
    dataManager = dataManagers;
    init = true;
}

exports.userSetup = function userSetup() {
    _server.post('/api/v1/users/addUser' , function success() {
        console.log("we did it.");
    });
    console.log("Setting up users.");
}
