app.controller('HomeCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

  var getUserFriends = function() {
    $http({
      url: 'http://localhost:3000/api/user/friendships',
      method: 'GET',
    }).then(function(resp){
      $scope.friendshipsList = resp.data;
      console.log(resp.data);
    }, function(resp){
      console.log(resp);
    });
  };

  var init = function () {
    getUserFriends ();
  };

  init ();

}]);