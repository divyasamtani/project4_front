app.controller('HomeCtrl', ['$scope', '$auth', '$state', '$http', 'urlConstant', function($scope, $auth, $state, $http, urlConstant){

  var getUserFriends = function() {
    $http({
      url: urlConstant.apiUrl + '/api/user/friendships',
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