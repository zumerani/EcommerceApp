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
    console.log("Setting up users.");
    _server.post('/api/v1/users/addUser' , dataManager.users.addUser );
}
