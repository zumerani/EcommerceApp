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
            console.log(result);
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

.controller('AccountCtrl', function($scope , $ionicPopup , UserAPI , $base64 , Upload , $http) {

    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }

    function onPhotoFileSuccess(imageData) {

        alert("uri: " + imageData );

        //pop up
        // var myPopUp = $ionicPopup.show( {
        //     title: 'Image: ' + imageData ,
        //     buttons: [ {
        //         text: "Got it" ,
        //         type: 'button-positive'
        //     } ] ,
        //     onTap: function(e) {
        //         e.preventDefault();
        //     }
        // });

  // Get image handle
        console.log(JSON.stringify(imageData));

        var win = function (r) {
            alert("WE DID IT!! " + r.responseCode  );
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code + " and " + error.source + " and " +
        error.target );
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var options = new FileUploadOptions();
        options.fileKey = "myPhoto";
        options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers = {
            Connection: "close"
        };

        var params = {};
        params.value1 = "test";
        params.value2 = "param";
        params.name = "ZAIN UMERANI ROCKS"

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(imageData, encodeURI("https://stormy-taiga-50511.herokuapp.com/api/v1/users/addItem"), win, fail, options);

        // var doIt = {
        //     data: imageData ,
        //     contentType: 'image/png' ,
        //     name: 'zain'
        // }
        //
        // UserAPI.addItem(doIt);

   	  // Get image handle
      //
        var srcImage = document.getElementById('srcImage');
      // Unhide image elements
      //
        srcImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
        srcImage.src = imageData;

    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    $scope.capturePhotoWithFile = function () {
        //alert('I did it !');
        navigator.camera.getPicture(onPhotoFileSuccess, onFail,
            { quality: 50 ,
                destinationType: Camera.DestinationType.FILE_URI ,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY ,
                encodingType: Camera.EncodingType.JPEG ,
                mediaType: Camera.MediaType.PICTURE
            }
        );
    }

    document.addEventListener("deviceready", onDeviceReady , false);

  // console.log('srcImage: ' + document.getElementById('srcImage').src);
  // var imageData = document.getElementById('srcImage');
  // var fd = new FormData();
  // fd.append('file' , document.getElementById('srcImage'));
  // console.log('fd is + ' + JSON.stringify( fd ) );
  // var uploadUrl = '/api/v1/users/addItem';
  //
  // $http.post(uploadUrl,fd, {
  //           transformRequest: angular.identity,
  //           headers: {'Content-Type': undefined} ,
  //           params: {
  //               fd
  //           }
  //       })
  //       .success(function(){
  //         console.log("success!!");
  //       })
  //       .error(function(){
  //         console.log("error!!");
  //       });

  // var imageDetails = $base64.encode(document.getElementById('srcImage'));
  //
  // console.log('imageDetails: ' + imageDetails );
  //
  // $scope.item = {
  //     data: imageDetails ,
  //     contentType: 'image/png' ,
  //     name: 'blabla'
  // }
  //
  // console.log($scope.item);
  //
  // UserAPI.addItem($scope.item);

  /* USING ng-file-upload */

  // $scope.saysomething = function() {
  //     console.log('fine, i said something!!');
  // }
  //
  // $scope.uploadPhoto = function () {
  //     var imageDetail = document.getElementById('srcImage');
  //       Upload.upload({
  //           url: '/api/v1/users/addItem',
  //           method: 'POST' ,
  //           data: { name: 'zain' } ,
  //           file: imageDetail //we might need to change this ...
  //       }).then(function (resp) {
  //           console.log('Success ');
  //       }, function (resp) {
  //           console.log('Erro');
  //       });
  //   };

    // var item = {
    //     data: document.getElementById('srcImage') ,
    //     contentType: 'image/png' ,
    //     name: 'Zain'
    // }
    // $scope.upload = function () {
    //     console.log('Adding image ... ');
    //     UserAPI.addItem(item);
    // };




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
