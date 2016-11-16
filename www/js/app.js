var app = angular.module('project4', ['ionic', 'ui.router', 'ng-token-auth', 'ngResource'])

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
    omniauthWindowType: 'newWindow',
    storage: 'localStorage'
  });

  $stateProvider

// Login - default
  .state('login',{
    url: '/',
    templateUrl: "templates/auth/login.html",
    controller: 'LoginCtrl'
  })

// Welcome Screen (after sign up)
  .state('welcome_screen',{
    url: '/welcome',
    templateUrl: "templates/inner_pages/welcome_screen.html",
    controller: 'WelcomeScreenCtrl'
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

// HOME *****************************************************
  .state('tab.home',{
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: "templates/tabs/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

// SEARCH ***************************************************
  .state('tab.search',{
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: "templates/tabs/search.html",
        controller: 'SearchCtrl'
      }
    }
  })

// NOTES ****************************************************
// See All Notes
  .state('tab.notes',{
    url: '/notes',
    cache: false,
    views: {
      'tab-notes': {
        templateUrl: "templates/tabs/notes.html",
        controller: 'NotesCtrl'
      }
    }
  })

// See All Notes (Doesn't inherit from Tab)
  .state('notes',{
    url: '/notes',
    cache: false,
    abstract: true,
    templateUrl: "templates/inner_pages/notes-notab.html"
  })

// Create Note
  .state('notes.create',{
    url: '/create',
    cache: false,
    views: {
      'notes-view@notes': {
        templateUrl: "templates/inner_pages/create_note.html",
        controller: 'CreateNoteCtrl'
      }
    }
  })

// Edit Note
  .state('notes.show',{
    url: '/:noteID',
    cache: false,
    views: {
      'notes-view@notes': {
        templateUrl: "templates/inner_pages/edit_note.html",
        controller: 'EditNoteCtrl'
      }
    }
  })

// PROFILE***********************************************

  .state('tab.profile',{
    url: '/profile',
    cache: false,
    views: {
      'tab-profile': {
        templateUrl: "templates/tabs/profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

// Profile (Doesn't inherit from Tab)
  .state('profile',{
    url: '/profile',
    cache: false,
    abstract: true,
    templateUrl: "templates/inner_pages/profile-notab.html"
  })


// Edit Profile (Child of Profile)
  .state('profile.edit',{
    url: '/edit',
    cache: false,
    views: {
      'profile-view@profile': {
        templateUrl: "templates/inner_pages/edit_profile.html",
        controller: 'EditProfileCtrl'
      }
    }
  })

// See All Friends (Child of Profile)
  .state('profile.friends',{
    url: '/friends',
    cache: false,
    views: {
      'profile-view@profile': {
        templateUrl: "templates/inner_pages/index_user_friends.html",
        controller: 'FriendsCtrl'
      }
    }
  })

// Search Users to Find Friend
  .state('profile.friends.add',{
    url: '/add',
    cache: false,
    views: {
      'profile-view@profile': {
        templateUrl: "templates/inner_pages/add_friendship.html",
        controller: 'AddFriendCtrl'
      }
    }
  })

// Show Friend's Profile
  .state('profile.friends.show',{
    url: '/:friendsID',
    views: {
      'profile-view@profile': {
        templateUrl: "templates/inner_pages/friend-profile.html",
        controller: 'FriendProfileCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
}]);
