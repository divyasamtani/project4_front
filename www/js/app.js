var app = angular.module('project4', ['ionic', 'ui.router', 'ng-token-auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// App.config

app.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {

  // Configure Auth Provider
  $authProvider.configure({
    apiUrl: 'http://localhost:3000',
    authProviderPaths: {
      facebook: '/auth/facebook'
    },
    omniauthWindowType: 'newWindow'
  });

  $stateProvider

// Login - default
  .state('login',{
    url: '/',
    templateUrl: "templates/auth/login.html",
    controller: 'LoginCtrl'
  })

// Abstract for tabs - User must be validated
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/abstracts/tabs.html",
    resolve: {
      auth: function($auth) {
      return $auth.validateUser();
      }
    }
  })

// Home
  .state('tab.home',{
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: "templates/tabs/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

// Login
  .state('tab.search',{
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: "templates/tabs/search.html",
        controller: 'SearchCtrl'
      }
    }
  })

// Login
  .state('tab.messages',{
    url: '/messages',
    views: {
      'tab-messages': {
        templateUrl: "templates/tabs/messages.html",
        controller: 'MessagesCtrl'
      }
    }
  })

// Login
  .state('tab.notes',{
    url: '/notes',
    views: {
      'tab-notes': {
        templateUrl: "templates/tabs/notes.html",
        controller: 'NotesCtrl'
      }
    }
  })

// Login
  .state('tab.profile',{
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: "templates/tabs/profile.html",
        controller: 'ProfileCtrl'
      },
      //  'map': {
      //       templateUrl: '#',
      //       controller: 'MapCtrl'
      // }
    }
  });

  $urlRouterProvider.otherwise('/');
}]);




