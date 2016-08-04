angular.module('starter.controllers', [])

.controller('FeedCtrl', ['$scope' , '$cordovaOauth', '$location' , '$http' , '$window', 'UserAPI' , '$base64' ,  function($scope , $cordovaOauth , $location , $http , $window ,
    UserAPI , $base64) {

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

    console.log('Lol Im in FeedCtrl');

    UserAPI.getImage().then( function(result) {
        if( result ) {
            console.log(result.data.data.data);
            console.log($base64.decode(result.data.data.data));
        } else {
            console.log('err');
        }
    });

    //console.log('imageHolder is: ' + $scope.imageHolder.name );

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

.controller('AccountCtrl', function($scope , $ionicPopup , UserAPI , $base64) {

  //   function onDeviceReady() {
  //       pictureSource = navigator.camera.PictureSourceType;
  //       destinationType = navigator.camera.DestinationType;
  //   }
  //
  //   document.addEventListener("deviceready", onDeviceReady, false);
  //
  //   function onPhotoFileSuccess(imageData) {
  // // Get image handle
  //       console.log(JSON.stringify(imageData));
  //
  //  	  // Get image handle
  //     //
  //       var srcImage = document.getElementById('srcImage');
  //     // Unhide image elements
  //     //
  //       srcImage.style.display = 'block';
  //     // Show the captured photo
  //     // The inline CSS rules are used to resize the image
  //     //
  //       srcImage.src = imageData;
  //
  //
  //   }
  //
  //   function onFail(message) {
  //       alert('Failed because: ' + message);
  //   }
  //
  //   $scope.capturePhotoWithFile = function() {
  //       navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50 , destinationType: Camera.DestinationType.FILE_URI });
  //   }

  var imageDetails = $base64.encode(document.getElementById('srcImage'));

  console.log('imageDetails: ' + imageDetails );

  $scope.item = {
      data: imageDetails ,
      contentType: 'image/png' ,
      name: 'blabla'
  }

  console.log($scope.item);

  UserAPI.addItem($scope.item);







})
.controller('SignInCtrl' , function($scope , $cordovaOauth , UserAPI , $state) {

    // $scope.login = function() {
    //     console.log("adding user ... ");
    //     UserAPI.addUser();
    //     $cordovaOauth.facebook("877800308993381", ["email", "user_website"]).then(function(result) {
    //         $localStorage.accessToken = result.access_token;
    //
    //     }, function(error) {
    //         alert("There was a problem signing in!  See the console for logs");
    //         console.log(error);
    //     });
    //
    // };

    $scope.lol = function() {
        console.log("Lol");
        $state.go('tab.account');
    }

    $scope.userInfo = {
        email: "",
        password: ""
    }

    $scope.login = function() {
        console.log($scope.userInfo);
        var dang = {};
        UserAPI.loginUser($scope.userInfo).success( function(result) {
            if( result ) {
                console.log('result is: ' + result.email );
            } else {
                console.log('Could not grab user ... ' );
            }
        });
    }


})
.controller('SignUpCtrl' , function( $scope , UserAPI) {

    $scope.user = {
        first: "" ,
        last: "" ,
        school: "" ,
        email: "" ,
        password: ""
    }

    $scope.done = function() {
        $scope.user.school = $scope.user.school.toUpperCase();
        console.log($scope.user);
        UserAPI.addUser($scope.user);
    }


});
