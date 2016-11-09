app.controller('ProfileCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){


// SIGN OUT BUTTON
    $scope.SignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log(resp);
          $state.go('login');
        })
        .catch(function(resp) {
          // handle error response
        });
    };


}]);
