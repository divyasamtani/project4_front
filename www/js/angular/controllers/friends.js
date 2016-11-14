app.controller('FriendsCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.friendsList = {};

// GET ALL USERS
  var getAllUsers = function (){
    var url = "http://localhost:3000/api/users";

    $http.get(url)
      .success(function(users){
       $scope.userList = users;
       console.log(users);
      })
      .error(function(data){
        console.log('server side error occured');
      });
  };

// CREATE FRIENDSHIP
  $scope.addFriend  = function(userid) {
    var friendParam = {friend_id: userid};
    console.log(userid);

    $http({
      url: 'http://localhost:3000/api/user/friendships',
      method: 'POST',
      data: {friendship: friendParam},
      responseType:'json',
    }).then(function(){
      console.log("friendship successfully added");
    }),function(resp){
      console.log(resp);
    };
  };

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
    }), function(resp){
      console.log('error');
    };
  };

  var init = function () {
    getUserFriends();
    getAllUsers ();
  };

  init();


}]);