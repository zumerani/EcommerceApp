// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' , 'ngCordovaOauth' , 'ui.router' ,
'ngCordova' , 'base64' , 'ngFileUpload'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('signin' , {
      url: '/signin' ,
      templateUrl: 'templates/signin.html' ,
      controller: 'SignInCtrl'
  })
  .state( 'signup' , {
      url: '/signup' ,
      templateUrl: 'templates/signup.html' ,
      controller: 'SignUpCtrl'
  })

 /* Set up tabs from here on out. */
.state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html'
  })
.state('tab.feed', {
    url: '/feed',
    views: {
        'tab-feed': {
        templateUrl: 'templates/feed.html',
        controller: 'FeedCtrl'
      }
    }
 })
.state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
})
.state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
})

.state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
});

  /* Default URL path */
  $urlRouterProvider.otherwise('/signin');

});
