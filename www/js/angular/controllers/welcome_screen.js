app.controller('WelcomeScreenCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){

  $scope.onSwipeLeft = function () {
    console.log("test");
    $state.go('tab.profile');
  };

}]);
