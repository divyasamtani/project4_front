app.controller('WelcomeScreenCtrl', ['$scope', '$auth', '$state', '$http', 'urlConstant', function($scope, $auth, $state, $http, urlConstant){

  $scope.user = {};

  $scope.onSwipeLeft = function () {
    console.log("test");
    $state.go('tab.profile');
  };

  var getUserName = function () {
    $http({
      url: urlConstant.apiUrl + '/api/user',
      method: 'GET'
    }).then(function(resp){
      $scope.user = resp.data;
      console.log(resp.data.name);
    }, function(resp){
      console.log(resp);
    });
  };

getUserName();

}]);
