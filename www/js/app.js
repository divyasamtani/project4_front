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

// Home*****************************************************
  .state('tab.home',{
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: "templates/tabs/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

// Search***************************************************
  .state('tab.search',{
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: "templates/tabs/search.html",
        controller: 'SearchCtrl'
      }
    }
  })

// Messages***************************************************
  // .state('tab.messages',{
  //   url: '/messages',
  //   views: {
  //     'tab-messages': {
  //       templateUrl: "templates/tabs/messages.html",
  //       controller: 'MessagesCtrl'
  //     }
  //   }
  // })

// NOTES****************************************************
  .state('tab.notes',{
    url: '/notes',
    views: {
      'tab-notes': {
        templateUrl: "templates/tabs/notes.html",
        controller: 'NotesCtrl'
      }
    }
  })

// // Show one note
//   .state('tab.notes.show',{
//     url: '/notes/:id',
//     views: {
//       'tab-notes@tab': {
//         templateUrl: "templates/inner_pages/show_travel_note.html",
//         // controller: 'ProfileCtrl'
//       }
//     }
//   })

// Create / Edit Note
  .state('tab.notes.create_edit',{
    url: '/create_edit',
    views: {
      'tab-notes@tab': {
        templateUrl: "templates/inner_pages/create_edit_note.html",
        // controller: 'ProfileCtrl'
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

// Edit Profile (Child of Profile)
  .state('tab.profile.edit',{
    url: '/edit',
    cache: false,
    views: {
      'tab-profile@tab': {
        templateUrl: "templates/inner_pages/edit_profile.html",
        controller: 'EditProfileCtrl'
      }
    }
  })

// FRIENDS**********************************************

// See All Friends (Child of Profile)
  .state('tab.profile.friends',{
    url: '/friends',
    cache: false,
    views: {
      'tab-profile@tab': {
        templateUrl: "templates/inner_pages/index_user_friends.html",
        controller: 'FriendsCtrl'
      }
    }
  })

// Search Users to Find Friend
  .state('tab.profile.friends.add',{
    url: '/add',
    cache: false,
    views: {
      'tab-profile@tab': {
        templateUrl: "templates/inner_pages/add_friendship.html",
        controller: 'AddFriendCtrl'
      }
    }
  })

// Show Friend's Profile
  .state('tab.profile.friends.show',{
    url: '/:friendsID',
    views: {
      'tab-profile@tab': {
        templateUrl: "templates/inner_pages/friend-profile.html",
        controller: 'FriendProfileCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
}]);
