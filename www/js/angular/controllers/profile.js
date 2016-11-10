app.controller('ProfileCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

// SET PROFILE INFORMATION

// function getUserInfo(){
//   var url = "http://localhost:3000/api/user";

//   $http.get(url)
//   .success(function(user){
//     $scope.current_user = user;
//   })
//   .error(function(data) {
//     console.log('server side error occurred');
//   });

// }

// GENERATE MAP
  function generateMap () {
    mapObject = $('.profile-map').vectorMap({
      map: 'world_mill',
      zoomOnScroll: false,
      regionStyle: {
        selected: {
          fill: 'red'
        }
      }
    }).vectorMap('get', 'mapObject');
  }

  generateMap();

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
