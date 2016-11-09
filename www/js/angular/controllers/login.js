app.controller('LoginCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){

  $scope.login = function () {
    $auth.authenticate('facebook').
    then(function(resp) {
      $state.go('welcome_screen');
      console.log(resp);
    }).
    catch(function(resp) {
      console.log(resp);
    });
  };
}]);