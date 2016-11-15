app.controller('AddFriendCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

  $scope.query = {
    text: ""
  };

// USER NAME SEARCH QUERY
  $scope.searchUserName = function(){
    $http({
      url: "http://localhost:3000/api/user_search/?name=" + $scope.query.text,
      method: 'GET',
    }).then(function(resp){
      $scope.userList = resp.data;
    }, function(resp){
      console.log(resp);
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
    },function(resp){
      console.log(resp);
    });
  };

}]);