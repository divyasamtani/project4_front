app.controller('FriendsCtrl', ['$scope', '$auth', '$state', '$http', 'urlConstant', function($scope, $auth, $state, $http, urlConstant){
  $scope.friendsList = {};

// GET ALL FRIENDS
  var getUserFriends = function() {
    $http({
      url: urlConstant.apiUrl + '/api/user/friendships',
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
      url: urlConstant.apiUrl + '/api/user/friendships/' + friendID,
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