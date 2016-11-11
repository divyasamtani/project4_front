app.controller('LoginCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){
  $scope.login = function () {
    $auth.authenticate('facebook').
    then(function(resp) {
      $state.go('welcome_screen');
    }).
    catch(function(resp) {
      console.log(resp);
    });
  };
}]);
