app.controller('EditProfileCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){


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


// LOGIC FOR ACCORDION LIST


var getCountries = function (){
  var url = "http://localhost:3000/api/countries";

  $http.get(url)
  .success(function(continents){
    console.log(continents);
    $scope.continents = continents;
  })
  .error(function(data) {
    console.log('server side error occurred');
  });
};

getCountries();

  /** TOGGLE FUNCTION FOR SELECTING THE GROUP**/

 $scope.toggleGroup = function(group) {
    console.info(group);
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

}]);
