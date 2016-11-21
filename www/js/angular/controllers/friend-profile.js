app.controller('FriendProfileCtrl', ['$scope', '$auth', '$state', '$http', '$stateParams', 'urlConstant', function($scope, $auth, $state, $http, $stateParams, urlConstant){
  const COUNTRYCOUNT = 176;
  var mapObject;
  var friendsID = $stateParams.friendsID;
  $scope.countries = [];


// SHOW FRIEND INFORMATION
  var getFriendInfo = function(countries) {
    $http({
      url: urlConstant.apiUrl + '/api/users/' + friendsID,
      method: 'GET'
    }).then(function(resp){
      selectCountries(countries, resp.data.friend_countries);

      $scope.friend = resp.data.friend;
      $scope.friend.countries_visited = resp.data.friend.countries_visited;
      $scope.friend.world_coverage = Math.round(resp.data.friend.world_coverage);
      $scope.friend.travel_status = resp.data.friend.travel_status;
      console.log(resp.data.friend);
    }), function(resp){
      console.log('error');
    };
  };

  // CREATE MAP
  var generateMap = function () {
    mapObject = $('.friend-profile-map').vectorMap({
      map: 'world_mill',
      zoomOnScroll: false,
      backgroundColor: 'black',
      regionStyle: {
        selected: {
          fill: 'orange'
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
    mapObject.updateSize();
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

  // / GETS LIST OF COUNTRIES

  var getCountriesTemplate = function (){
    var url = urlConstant.apiUrl + "/api/countries";

    $http.get(url)
    .success(function(continents){
      $scope.continents = continents;
      $scope.countries = [];

      for (var key in $scope.continents) {
        $scope.countries.push($scope.continents[key]);
      }

      $scope.countries = $scope.countries.reduce(function(a, b) {
        return a.concat(b);
      }, []);

      getFriendInfo($scope.countries);
    })
    .error(function(data) {
      console.log('server side error occurred');
    });
  };


  var init = function () {
    generateMap();
    // getFriendInfo();
    getCountriesTemplate ();
  };

  init();

}]);
