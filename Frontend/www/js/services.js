angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('UserAPI' , function($http , $ionicPopup , $state) {
    var base = /*"http://localhost:8080";*/ "https://stormy-taiga-50511.herokuapp.com"

    return {
        addUser: function(user) {
            $http({
                method: 'POST' ,
                url: base + '/api/v1/users/addUser' ,
                data: user
            }).success( function success(res) {
                console.log("User Added and sent to server!");
                swal("Welcome to Drop!", "Enjoy!" ,  "success");
                //$state.go('tab.feed');
                return res;
            }).error( function error(err) {
                console.log("Could not grab the user ... " );
                var myPopUp = $ionicPopup.show( {
                    title: 'User exists' ,
                    buttons: [ {
                        text: 'OK' ,
                        type: 'button-positive'
                    } ] ,
                    onTap: function(e) {
                        e.preventDefault();
                    }
                });
                return err;
            });
        } ,
        loginUser: function(user) {
             return $http({
                method: 'POST' ,
                url: base + '/api/v1/users/loginUser',
                data: user
            }).success( function success(res) {
                console.log('success: ' + res.email);
                return res;
            }).error( function error(err) {
                if( err.status == '404' ) {
                    var myPopUp = $ionicPopup.show( {
                        title: 'Cannot find email. You need to sign up!' ,
                        buttons: [ {
                            text: "Let's sign up",
                            type: 'button-positive'
                        } ] ,
                        onTap: function(e) {
                            e.preventDefault();
                            $state.go('signup');
                        }
                    });
                } else if( err.status == '403' ) {
                    var myPopUp = $ionicPopup.show( {
                        title: 'Username/Password is incorrect!' ,
                        buttons: [ {
                            text: "Try Again.",
                            type: 'button-positive'
                        } ] ,
                        onTap: function(e) {
                            e.preventDefault();
                            $state.go('signup');
                        }
                    });
                } else if( err.status == '401' ) {
                    var myPopUp = $ionicPopup.show( {
                        title: 'Invalid Credentials' ,
                        buttons: [ {
                            text: "Try Again.",
                            type: 'button-positive'
                        } ] ,
                        onTap: function(e) {
                            e.preventDefault();
                        }
                    });
                }
            });
        }
    }
})

.factory( 'TransactionsAPI' , function( $http , $ionicPopup , $state ) {
    var base = /*"http://localhost:8080";*/ "https://stormy-taiga-50511.herokuapp.com";

    return {

        addTransaction: function(item) {
            return $http({
                method: 'POST' ,
                url: base + '/api/v1/transactions/addItem' ,
                data: item
            }).success( function success(result) {
                console.log("Success in adding transaction!!");
                // var myPopUp = $ionicPopup.show( {
                //     title: 'Successfully posted!',
                //     buttons: [ {
                //         text: "Ok",
                //         type: 'button-positive'
                //     } ] ,
                //     onTap: function(e) {
                //         e.preventDefault();
                //     }
                // });
                swal("Uploaded!", "Item has been sent to the feed." , "success");
            }).error( function error(err) {
                console.log("We got an error when adding transaction");
                alert('We have a problem: ' + error.message)
            });
        } ,

        getTransactions: function(item) {
            return $http({
                method: 'POST' ,
                url: base + '/api/v1/transactions/getItems' ,
                data: item
            }).success( function success(result) {
                swal("Got it!", "I got it!!" , "success");
            }).error( function error(err) {
                swal("I didn't get it :(", "Don't have anything" , "error");
            });
        }


    }

});
