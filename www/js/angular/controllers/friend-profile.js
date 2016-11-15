app.controller('FriendProfileCtrl', ['$scope', '$auth', '$state', '$http', '$stateParams', function($scope, $auth, $state, $http, $stateParams){
  const COUNTRYCOUNT = 32;
  var mapObject;
  var friendsID = $stateParams.friendsID;
  $scope.countries = [];

// SHOW FRIEND INFORMATION
  var getFriendInfo = function() {
    $http({
      url: 'http://localhost:3000/api/users/' + friendsID,
      method: 'GET'
    }).then(function(resp){
      console.log(resp.data);

      $scope.friend = resp.data;
      $scope.friend.countries_visited = resp.data.countries_visited;
      $scope.friend.world_coverage = resp.data.world_coverage;

      selectCountries(countries, resp.data);

    }), function(resp){
      console.log('error');
    };
  };

  // CREATE MAP
  var generateMap = function () {
    mapObject = $('.friend-profile-map').vectorMap({
      map: 'world_mill',
      zoomOnScroll: false,
      regionStyle: {
        selected: {
          fill: 'red'
        }
      }
    }).vectorMap('get', 'mapObject');
  };

  var extractCountryCode = function () {
    var countryCode = [];
    for (var i = 0; i < $scope.countries.length; i++) {
      if ($scope.countries[i].checked) {
        countryCode.push($scope.countries[i].country_code);
      }
    }
    return countryCode;
  };

  var updateMap = function () {
    mapObject.clearSelectedRegions();
    // Update map with the appropriate country codes
    mapObject.setSelectedRegions(extractCountryCode());
  };

  var selectCountries = function (countries, userCountries) {
    for (var i = 0; i < userCountries.length; i++) {
      for (var k = 0; k < countries.length; k++) {
        if (countries[k].id === userCountries[i].country_id) {
          countries[k].checked = true;
          countries[k].userCountryID = userCountries[i].id;
        }
      }
    }
    updateMap();
  };


  var init = function () {
    generateMap();
    getFriendInfo();
  };

  init();

}]);
