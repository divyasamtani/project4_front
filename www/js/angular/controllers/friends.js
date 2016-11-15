app.controller('FriendsCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){
  $scope.friendsList = {};

// GET ALL FRIENDS
  var getUserFriends = function() {
    $http({
      url: 'http://localhost:3000/api/user/friendships',
      method: 'GET',
    }).then(function(resp){
      $scope.friendshipList = resp.data;
      console.log(resp.data);
    }, function(resp){
      console.log(resp);
    });
  };

// DELETE FRIEND
  $scope.deleteFriend = function(friendID) {
    console.log(friendID);
    $http({
      url: 'http://localhost:3000/api/user/friendships/' + friendID,
      method: 'DELETE'
    }).then(function(){
      console.log('friendship deleted');
    }, function(resp){
      console.log('error');
    });
  };

  var init = function () {
    getUserFriends();
  };

  init();
}]);