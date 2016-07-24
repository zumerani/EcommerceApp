init = false;

var server;
var dataManager;
var objectId;

exports.init = function( app , dataManagers ) {
    server = app;
    dataManager = dataManagers;
    init = true;
}

exports.userSetup = function userSetup() {
    //server.post('/api/v1/addUser' , dataManager.addUser);
    console.log("Setting up users.");
}
