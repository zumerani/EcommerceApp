angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope' , '$cordovaOauth', '$location' , '$http' , '$window', function($scope , $cordovaOauth , $location , $http , $window ) {

    // $scope.login = function() {
    //     $cordovaOauth.facebook("877800308993381", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {
    //         $localStorage.accessToken = result.access_token;
    //     }, function(error) {
    //         alert("There was a problem signing in!  See the console for logs");
    //         console.log(error);
    //     });
    //
    //     $location.url('/profile');
    //
    // };

    $scope.changeView = function( view ) {
        $window.location.assign( '#/profile' );
    }


}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('SignInCtrl' , function($scope , $cordovaOauth , UserAPI) {

    $scope.login = function() {
        console.log("adding user ... ");
        UserAPI.addUser();
        $cordovaOauth.facebook("877800308993381", ["email", "user_website"]).then(function(result) {
            $localStorage.accessToken = result.access_token;

        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });

    };


})
.controller('SignUpCtrl' , function( $scope ) {

    $scope.user = {
        first: "" ,
        last: "" ,
        school: "" ,
        email: "" ,
        password: ""
    }

    $scope.done = function() {
        console.log($scope.user);
    }


});
