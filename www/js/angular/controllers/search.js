app.controller('SearchCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

  $scope.query = {
    text: ""
  };

// SEARCH FRIENDS USING COUNTRY NAME
  $scope.searchFriendsUsingCountry = function() {
    $http({
      url: "http://localhost:3000/api/friend_country_search/?name=" + $scope.query.text,
      method: 'GET',
    }).then(function(resp){
      $scope.friendsList = resp.data;
    }, function(resp){
      console.log(resp);
    });
  };

}]);