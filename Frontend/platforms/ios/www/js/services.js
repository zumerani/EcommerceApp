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
                var myPopUp = $ionicPopup.show( {
                    title: 'Welcome to Drop!' ,
                    buttons: [ {
                        text: "Let's begin" ,
                        type: 'button-positive'
                    } ] ,
                    onTap: function(e) {
                        e.preventDefault();
                    }
                });
                $state.go('tab.feed');
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
                            $state.go('signup');
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

        // addTransaction: function(item) {
        //     return $http.post({
        //         method: 'POST' ,
        //         url: base + '/api/v1/transactions/addTransaction' ,
        //         data: item
        //     }).success( function success(result) {
        //         console.log("Success in adding item!!");
        //     }).error( function error(error) {
        //         console.log("Error!!");
        //     });
        // }

        addTransaction: function(item) {
            return $http({
                method: 'POST' ,
                url: base + '/api/v1/transactions/addItem' ,
                data: item
            }).success( function success(result) {
                console.log("Success in adding transaction!!");
                alert('Our result is: ' + result.feed );
                // var myPopUp = $ionicPopup.show( {
                //     title: 'School name I found is: ' + result ,
                //     buttons: [ {
                //         text: "Great!",
                //         type: 'button-positive'
                //     } ] ,
                //     onTap: function(e) {
                //         e.preventDefault();
                //         $state.go('signup');
                //     }
                // });
            }).error( function error(err) {
                console.log("We got an error when adding transaction");
            });
        }


    }

});
