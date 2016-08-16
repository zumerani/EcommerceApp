angular.module('starter.controllers', [])

.controller('FeedCtrl', ['$scope' , '$cordovaOauth', '$location' , '$http' , '$window', 'UserAPI' ,  function($scope , $cordovaOauth , $location , $http , $window ,
    UserAPI) {

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

    //console.log('imageHolder is: ' + $scope.imageHolder.name );

    $scope.number = 9.00;

    function randomHeight(min , max){
           var height = Math.floor((Math.random()*(max-min))+min);
           return height;
    };

    // $scope.item_card = function() {
    //     //borderRadius: '10px' ,
    //     return {
    //         height: $scope.randomHeight(190 , 280) + 'px !important'
    //     };
    //
    // }

    $scope.lists = [
        {
            name: "Larry's Jersey" ,
            price: '9.00'
        } ,
        {
            name: "Robert's Jersey" ,
            price: '5.00'
        } ,
        {
            name: "Jerry's Jersey" ,
            price: '14.00'
        } ,
        {
            name: "Ben's Jersey" ,
            price: '10.00'
        } ,
        {
            name: "Kyle's Jersey" ,
            price: '11.00'
        }

    ];

    $scope.display = function() {
        swal.withForm({
    title: 'Fill out the fields.',
    text: 'We recommend taking a horizontal photo.',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Post!',
    closeOnConfirm: true,
    formFields: [
      { id: 'itemName', placeholder: 'Item name' },
      { id: 'description', placeholder: 'Short description' },
    //   { id: 'password', type: 'password' } ,
    //   { id: 'name', placeholder: 'Name Field' },
    //   { id: 'nickname', placeholder: 'Add a cool nickname' },
    //   { id: 'password', type: 'password' }
    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log('items: ' + $scope.items );
    console.log('Item name is: ' + this.swalForm.itemName) // { name: 'user name', nickname: 'what the user sends' }
  })
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

.controller('AccountCtrl', function($scope , $ionicPopup , UserAPI , $http , $firebaseArray , $cordovaCamera , $ionicLoading) {

    var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

    $scope.upload = function() {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 65,
          targetHeight: 65,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
    	  correctOrientation:true
        };
        //success function
        $cordovaCamera.getPicture(options).then(function(imageData) {

            $ionicLoading.show({
              template: 'Uploading...',
              duration: 1000
            });


            var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

            $scope.items = $firebaseArray(itemsRef);
            /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
            $scope.items.$add({
                name: 'Ben' ,
                data: imageData
            }).then( function(ref) {
                $scope.id = "";

                $scope.id = ref.key();
                var list = $firebaseArray(itemsRef);
                list.$loaded().then( function( arr) {
                    // alert('hold is:  ' + $scope.hold );
                    $scope.hold = arr.$getRecord($scope.id).data;
                    // alert('hold is:  ' + $scope.hold );
                });
            });
        //failure function
        }, function(err) {
            alert("We have an error: " + error );
        });

    }


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
                window.localStorage.setItem("username" , result.email);
                alert("Welcome: " + window.localStorage.getItem("username") );
            } else {
                console.log('Could not grab user ... ' );
            }
        });
    }


})
.controller('SignUpCtrl' , function( $scope , UserAPI , $state) {

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
        $state.go('tab.feed');
    }

})
.controller('SellerCtrl' , function( $scope , $cordovaCamera , $ionicLoading , $firebaseArray , $ionicPopup , TransactionsAPI , $state) {

    console.log('In Seller');

    $scope.categoryOne = [ {id:'1' , name:'Sports' , selected:'false'} , {id:'2' , name:'Electronics' , selected:'false'} , { id: '3' , name:'Movies' , selected:'false'} ,
    { id:'4' , name:'Music' , selected:'false'} , { id: '5' , name:'Leisure' , selected:'false'} ];

    $scope.categoryTwo = [ 'Textbooks' , 'Fashion' , 'Clothes' , 'Other'];

    $scope.obj = {
        itemName: '' ,
        sellerName: '' ,
        sellerEmail: '' ,
        description: '' ,
        price: '' ,
        category: '' ,
        lookUpID: ''
    };

    $scope.selectCategoryOne = function(selectedItem) {
        $scope.obj.category = selectedItem.name;
        for(var i = 0; i < $scope.categoryOne.length; i++) {
            var item = $scope.categoryOne[i];
            if(item.id == selectedItem.id){
                item.selected = !item.selected;
            }else {
                item.selected = true;
            }
        }
    }

    $scope.selectCategoryTwo = function(selectedItem) {
        console.log('You just chose: ' + selectedItem );
    }

    /* Function to load from device */
    $scope.uploadFromDevice = function() {

        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 65,
          targetHeight: 65,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
    	  correctOrientation:true
        };
        //success function
        $cordovaCamera.getPicture(options).then(function(imageData) {

            $ionicLoading.show({
              template: 'Uploading...',
              duration: 1000
            });

            var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

            $scope.items = $firebaseArray(itemsRef);
            /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
            $scope.items.$add({
                data: imageData
            }).then( function(ref) {
                var id = "";

                id = ref.key();
                $scope.obj.lookUpID = ref.key();
                var list = $firebaseArray(itemsRef);
                list.$loaded().then( function( arr) {
                    // alert('hold is:  ' + $scope.hold );
                    //$scope.hold = arr.$getRecord($scope.id).data;
                    // alert('hold is:  ' + $scope.hold );
                });
            });
        //failure function
        }, function(err) {
            alert("We have an error: " + error );
        });

    };

    $scope.takeAPicture = function() {

        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 65,
          targetHeight: 65,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
    	  correctOrientation:true
        };
        //success function
        $cordovaCamera.getPicture(options).then(function(imageData) {

            $ionicLoading.show({
              template: 'Uploading...',
              duration: 1000
            });

            var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

            $scope.items = $firebaseArray(itemsRef);
            /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
            $scope.items.$add({
                data: imageData
            }).then( function(ref) {
                var id = "";

                id = ref.key();
                $scope.obj.lookUpID = ref.key();
                // var list = $firebaseArray(itemsRef);
                // list.$loaded().then( function( arr) {
                //     // alert('hold is:  ' + $scope.hold );
                //     $scope.hold = arr.$getRecord($scope.id).data;
                //     // alert('hold is:  ' + $scope.hold );
                // });
            });
        //failure function
        }, function(err) {
            alert("We have an error: " + error );
        });

    };

    /* Function to ensure and post data to server */
    $scope.post = function() {
        console.log('someone clicked me ... ' );
        //$scope.obj.itemName;
        //ensure all fields in 'obj' are filled
        if( $scope.obj.itemName == '' ) {
            var myPopUp = $ionicPopup.show( {
                title: 'Item name is blank' ,
                buttons: [ {
                    text: "Ok",
                    type: 'button-positive'
                } ] ,
                onTap: function(e) {
                    e.preventDefault();
                    $state.go('signup');
                }
            });
        }
        if( $scope.obj.description == '' ) {
            var myPopUp = $ionicPopup.show( {
                title: 'Description is blank' ,
                buttons: [ {
                    text: "Ok",
                    type: 'button-positive'
                } ] ,
                onTap: function(e) {
                    e.preventDefault();
                    $state.go('signup');
                }
            });
        }
        if( $scope.obj.price == '' ) {
            var myPopUp = $ionicPopup.show( {
                title: "You haven't set a price" ,
                buttons: [ {
                    text: "Ok",
                    type: 'button-positive'
                } ] ,
                onTap: function(e) {
                    e.preventDefault();
                    $state.go('signup');
                }
            });
        }
        if( $scope.obj.category == '' ) {
            var myPopUp = $ionicPopup.show( {
                title: "You haven't selected a category" ,
                buttons: [ {
                    text: "Ok",
                    type: 'button-positive'
                } ] ,
                onTap: function(e) {
                    e.preventDefault();
                    $state.go('signup');
                }
            });
        }
        if( $scope.obj.lookUpID == '' ) {
            var myPopUp = $ionicPopup.show( {
                title: "Taking a picture will help you sell more!" ,
                buttons: [ {
                    text: "Ok",
                    type: 'button-positive'
                } ] ,
                onTap: function(e) {
                    e.preventDefault();
                    $state.go('signup');
                }
            });
        }
        $scope.obj.sellerEmail = window.localStorage.getItem("username");
        var sendObj = $scope.obj;
        TransactionsAPI.addTransaction( sendObj );
        $state.go('tab.feed');
    }

});
