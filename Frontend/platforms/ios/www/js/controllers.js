angular.module('starter.controllers', [])

.controller('FeedCtrl', ['$scope' , '$cordovaOauth', '$location' , '$http' , '$window', 'UserAPI' , '$cordovaCamera' , '$firebaseArray' ,
'TransactionsAPI' , 'Sender' ,  function($scope , $cordovaOauth , $location , $http , $window ,
    UserAPI , $cordovaCamera , $firebaseArray , TransactionsAPI , Sender) {

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

    $scope.printMe = function(item) {
        Sender.sendOver(item);
    }

    $scope.obj = {
        itemName: '' ,
        sellerName: '' ,
        sellerEmail: '' ,
        description: '' ,
        price: '' ,
        category: '' ,
        lookUpID: ''
    };

    /* The following line is only for emulator */
    $scope.obj.sellerEmail = 'zumerani@scu.edu'; /* window.localStorage.getItem("username"); */

    /* We will use 'username' for browser and ionicView testing purposes */
    var username = { user: 'zumerani@scu.edu' };

    var results = [];
    $scope.lists = [];
    /* replace window.localStorage ... with username.user when browser/ionicView testing */
    TransactionsAPI.getTransactions(username).success( function(res) {
        //console.log('I got the feed: ' + JSON.stringify(res) );
        results = res;
        console.log(results);
        var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");
        var pictureIDList = $firebaseArray(itemsRef);
        pictureIDList.$loaded().then( function( arr ) {
            //console.log('And our picture IDs are ' + JSON.stringify(arr) );
            // console.log('first id in results: ' + JSON.stringify(res[0]) );
            // console.log( 'first image data: ' + arr.$getRecord(res[0].lookUpID).data );
            var finalArray = [];
            for( var i = 0 ; i < arr.length ; i++ ) {
                var item = {
                    sellerEmail: '' ,
                    itemName: '' ,
                    price: '' ,
                    description: '' ,
                    data: ''
                }
                console.log('results[i] email is: ' + results[i].sellerEmail );
                item.sellerEmail = results[i].sellerEmail;
                item.description = results[i].description;
                item.itemName = results[i].itemName;
                item.price = results[i].price;
                item.data = arr.$getRecord(results[i].lookUpID).data;
                finalArray.unshift(item);
            }
            $scope.lists = finalArray;
        });

    }).error( function(error) {
        alert('ERRRRORRR');
    });

    $scope.display = function() {
        swal.withForm({
            title: 'Fill out the fields.',
            text: "'Post' will allow you to upload a photo. We recommend taking a horizontal photo!",
            showCancelButton: true,
            confirmButtonColor: '#276FBF',
            confirmButtonText: 'Post!',
            closeOnConfirm: true,
            formFields: [

              { id: 'itemName', placeholder: 'Item name' },
              { id: 'description', placeholder: 'Short description' },
              { id: 'price', placeholder: 'Price ($)' }

            ]
        }, function (isConfirm) {
            // do whatever you want with the form data
            if( this.swalForm.itemName) {
                $scope.obj.itemName = this.swalForm.itemName;
                $scope.obj.price = this.swalForm.price;
                $scope.obj.description = this.swalForm.description;
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

                    var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

                    var items = $firebaseArray(itemsRef);
                    /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
                    items.$add({
                        data: imageData
                    }).then( function(ref) {
                        var id = "";
                        id = ref.key();
                        $scope.obj.lookUpID = id;
                        /* remove this line  -- only included for testing purposes on ionicView*/
                        // $scope.obj.sellerEmail = 'zumerani@scu.edu';
                        //$scope.obj.lookUpID = ref.key();
                        alert('id is + ' + id );
                        var sendObj = $scope.obj;
                        TransactionsAPI.addTransaction( sendObj );


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
            }

            console.log('Item name is: ' + this.swalForm.itemName) // { name: 'user name', nickname: 'what the user sends' }
        })


    }

    $scope.doRefresh = function() {
        TransactionsAPI.getTransactions(username).success( function(res) {
            results = JSON.stringify(res);
            console.log('I got the feed: ' + results);
            var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");
            var pictureIDList = $firebaseArray(itemsRef);
            pictureIDList.$loaded().then( function( arr ) {
                //console.log('And our picture IDs are ' + JSON.stringify(arr) );
                // console.log('first id in results: ' + JSON.stringify(res[0]) );
                // console.log( 'first image data: ' + arr.$getRecord(res[0].lookUpID).data );
                var finalArray = [];
                for( var i = 0 ; i < arr.length ; i++ ) {
                    var item = {
                        sellerEmail: '' ,
                        itemName: '' ,
                        price: '' ,
                        description: '' ,
                        data: ''
                    }
                    console.log('results[i] email is: ' + results[i].sellerEmail );
                    item.sellerEmail = results[i].sellerEmail;
                    item.description = results[i].description;
                    item.itemName = results[i].itemName;
                    item.price = results[i].price;
                    item.data = arr.$getRecord(results[i].lookUpID).data;
                    finalArray.unshift(item);
                }
                $scope.lists = finalArray;
            });

        })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };

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

    // var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");
    //
    // $scope.upload = function() {
    //     var options = {
    //       quality: 100,
    //       destinationType: Camera.DestinationType.DATA_URL,
    //       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //       allowEdit: true,
    //       encodingType: Camera.EncodingType.PNG,
    //       targetWidth: 65,
    //       targetHeight: 65,
    //       popoverOptions: CameraPopoverOptions,
    //       saveToPhotoAlbum: false,
    // 	  correctOrientation:true
    //     };
    //     //success function
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //
    //         $ionicLoading.show({
    //           template: 'Uploading...',
    //           duration: 1000
    //         });
    //
    //
    //         var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");
    //
    //         $scope.items = $firebaseArray(itemsRef);
    //         /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
    //         $scope.items.$add({
    //             name: 'Ben' ,
    //             data: imageData
    //         }).then( function(ref) {
    //             $scope.id = "";
    //
    //             $scope.id = ref.key();
    //             var list = $firebaseArray(itemsRef);
    //             list.$loaded().then( function( arr) {
    //                 // alert('hold is:  ' + $scope.hold );
    //                 $scope.hold = arr.$getRecord($scope.id).data;
    //                 // alert('hold is:  ' + $scope.hold );
    //             });
    //         });
    //     //failure function
    //     }, function(err) {
    //         alert("We have an error: " + error );
    //     });
    //
    // }

    $scope.info = {
        name: 'Zain Umerani' ,
        sold: 4 ,
        bought: 3
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
                swal("Welcome!", "Start selling!" , "success");
                $state.go('tab.feed');
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
.controller('SellerCtrl' , function( $scope , $cordovaCamera , $ionicLoading , $firebaseArray , $ionicPopup , TransactionsAPI , $state , Sender ,
 UserAPI , $cordovaOauth ) {

    // console.log('In Seller');
    //
    // $scope.categoryOne = [ {id:'1' , name:'Sports' , selected:'false'} , {id:'2' , name:'Electronics' , selected:'false'} , { id: '3' , name:'Movies' , selected:'false'} ,
    // { id:'4' , name:'Music' , selected:'false'} , { id: '5' , name:'Leisure' , selected:'false'} ];
    //
    // $scope.categoryTwo = [ 'Textbooks' , 'Fashion' , 'Clothes' , 'Other'];
    //
    // $scope.obj = {
    //     itemName: '' ,
    //     sellerName: '' ,
    //     sellerEmail: '' ,
    //     description: '' ,
    //     price: '' ,
    //     category: '' ,
    //     lookUpID: ''
    // };
    //
    // $scope.selectCategoryOne = function(selectedItem) {
    //     $scope.obj.category = selectedItem.name;
    //     for(var i = 0; i < $scope.categoryOne.length; i++) {
    //         var item = $scope.categoryOne[i];
    //         if(item.id == selectedItem.id){
    //             item.selected = !item.selected;
    //         }else {
    //             item.selected = true;
    //         }
    //     }
    // }
    //
    // $scope.selectCategoryTwo = function(selectedItem) {
    //     console.log('You just chose: ' + selectedItem );
    // }
    //
    // /* Function to load from device */
    // $scope.uploadFromDevice = function() {
    //
    //     var options = {
    //       quality: 100,
    //       destinationType: Camera.DestinationType.DATA_URL,
    //       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //       allowEdit: true,
    //       encodingType: Camera.EncodingType.PNG,
    //       targetWidth: 65,
    //       targetHeight: 65,
    //       popoverOptions: CameraPopoverOptions,
    //       saveToPhotoAlbum: false,
    // 	  correctOrientation:true
    //     };
    //     //success function
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //
    //         $ionicLoading.show({
    //           template: 'Uploading...',
    //           duration: 1000
    //         });
    //
    //         var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");
    //
    //         $scope.items = $firebaseArray(itemsRef);
    //         /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
    //         $scope.items.$add({
    //             data: imageData
    //         }).then( function(ref) {
    //             var id = "";
    //
    //             id = ref.key();
    //             $scope.obj.lookUpID = ref.key();
    //             var list = $firebaseArray(itemsRef);
    //             list.$loaded().then( function( arr) {
    //                 // alert('hold is:  ' + $scope.hold );
    //                 //$scope.hold = arr.$getRecord($scope.id).data;
    //                 // alert('hold is:  ' + $scope.hold );
    //             });
    //         });
    //     //failure function
    //     }, function(err) {
    //         alert("We have an error: " + error );
    //     });
    //
    // };
    //
    // $scope.takeAPicture = function() {
    //
    //     var options = {
    //       quality: 100,
    //       destinationType: Camera.DestinationType.DATA_URL,
    //       sourceType: Camera.PictureSourceType.CAMERA,
    //       allowEdit: true,
    //       encodingType: Camera.EncodingType.PNG,
    //       targetWidth: 65,
    //       targetHeight: 65,
    //       popoverOptions: CameraPopoverOptions,
    //       saveToPhotoAlbum: false,
    // 	  correctOrientation:true
    //     };
    //     //success function
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //
    //         $ionicLoading.show({
    //           template: 'Uploading...',
    //           duration: 1000
    //         });
    //
    //         var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");
    //
    //         $scope.items = $firebaseArray(itemsRef);
    //         /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
    //         $scope.items.$add({
    //             data: imageData
    //         }).then( function(ref) {
    //             var id = "";
    //
    //             id = ref.key();
    //             $scope.obj.lookUpID = ref.key();
    //             // var list = $firebaseArray(itemsRef);
    //             // list.$loaded().then( function( arr) {
    //             //     // alert('hold is:  ' + $scope.hold );
    //             //     $scope.hold = arr.$getRecord($scope.id).data;
    //             //     // alert('hold is:  ' + $scope.hold );
    //             // });
    //         });
    //     //failure function
    //     }, function(err) {
    //         alert("We have an error: " + error );
    //     });
    //
    // };
    //
    // /* Function to ensure and post data to server */
    // $scope.post = function() {
    //     console.log('someone clicked me ... ' );
    //     //$scope.obj.itemName;
    //     //ensure all fields in 'obj' are filled
    //     if( $scope.obj.itemName == '' ) {
    //         var myPopUp = $ionicPopup.show( {
    //             title: 'Item name is blank' ,
    //             buttons: [ {
    //                 text: "Ok",
    //                 type: 'button-positive'
    //             } ] ,
    //             onTap: function(e) {
    //                 e.preventDefault();
    //                 $state.go('signup');
    //             }
    //         });
    //     }
    //     if( $scope.obj.description == '' ) {
    //         var myPopUp = $ionicPopup.show( {
    //             title: 'Description is blank' ,
    //             buttons: [ {
    //                 text: "Ok",
    //                 type: 'button-positive'
    //             } ] ,
    //             onTap: function(e) {
    //                 e.preventDefault();
    //                 $state.go('signup');
    //             }
    //         });
    //     }
    //     if( $scope.obj.price == '' ) {
    //         var myPopUp = $ionicPopup.show( {
    //             title: "You haven't set a price" ,
    //             buttons: [ {
    //                 text: "Ok",
    //                 type: 'button-positive'
    //             } ] ,
    //             onTap: function(e) {
    //                 e.preventDefault();
    //                 $state.go('signup');
    //             }
    //         });
    //     }
    //     if( $scope.obj.category == '' ) {
    //         var myPopUp = $ionicPopup.show( {
    //             title: "You haven't selected a category" ,
    //             buttons: [ {
    //                 text: "Ok",
    //                 type: 'button-positive'
    //             } ] ,
    //             onTap: function(e) {
    //                 e.preventDefault();
    //                 $state.go('signup');
    //             }
    //         });
    //     }
    //     if( $scope.obj.lookUpID == '' ) {
    //         var myPopUp = $ionicPopup.show( {
    //             title: "Taking a picture will help you sell more!" ,
    //             buttons: [ {
    //                 text: "Ok",
    //                 type: 'button-positive'
    //             } ] ,
    //             onTap: function(e) {
    //                 e.preventDefault();
    //                 $state.go('signup');
    //             }
    //         });
    //     }
    //     $scope.obj.sellerEmail = window.localStorage.getItem("username");
    //     var sendObj = $scope.obj;
    //     TransactionsAPI.addTransaction( sendObj );
    //     $state.go('tab.feed');
    // }

    console.log('In Seller');

    $scope.item = Sender.get();

    UserAPI.getUser($scope.item).success(function(res) {
        //alert('We got: ' + res.first );
        var temp = res;
        console.log('Item is: ' + JSON.stringify(res) );
        $scope.listItem = temp;
    });

    $scope.venmoMe = function() {
        // $cordovaOauth.venmo('2899' , ["access_profile" , "access_email"]).then(function(result) {
        //     alert( 'Woo Venmo!! ' + JSON.stringify(result) );
        // } , function(error) {
        //     alert("Error: --> "  + error );
        // });

        alert('hi');

    }

    //console.log('We have item: ' + JSON.stringify($scope.listItem) );

});
