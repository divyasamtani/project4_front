app.controller('LoginCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){

  $scope.login = function () {
    $auth.authenticate('facebook').
    then(function(resp) {
      $state.go('tab.profile');
      console.log(resp);
    }).
    catch(function(resp) {
      console.log(resp);
    });
  };
}]);