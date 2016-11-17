app.controller('SearchCtrl', ['$scope', '$auth', '$state', '$http', 'urlConstant', function($scope, $auth, $state, $http, urlConstant){

  $scope.query = {
    text: ""
  };

// SEARCH FRIENDS USING COUNTRY NAME
  $scope.searchFriendsUsingCountry = function() {
    $http({
      url: urlConstant.apiUrl + "/api/friend_country_search/?name=" + $scope.query.text,
      method: 'GET',
    }).then(function(resp){
      $scope.friendsList = resp.data;
    }, function(resp){
      console.log(resp);
    });
  };

}]);