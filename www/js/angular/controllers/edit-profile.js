app.controller('EditProfileCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){
  const COUNTRYCOUNT = 176;
  var mapObject;
  $scope.editProfile = {};


  // EDIT LOCATION AND BIO
  $scope.updateUserInfo = function (user) {
    $auth.updateAccount(user)
      .then(function(resp){
        console.log(resp);
      })
      .catch(function(resp){
        console.log(resp);
      });
  };

  // CREATE MAP
  var generateMap = function () {
    mapObject = $('.profile-edit-map').vectorMap({
      map: 'world_mill',
      zoomOnScroll: false,
      regionStyle: {
        selected: {
          fill: 'red'
        }
      }
    }).vectorMap('get', 'mapObject');
  };

  var updateTravelStatus = function () {

    if($scope.user.world_coverage <= 10){
      $scope.user.travel_status  = 'Noob';
    }
    if($scope.user.world_coverage >= 11 && $scope.user.world_coverage <= 20){
      $scope.user.travel_status = 'Well-Travelled';
    }
    if($scope.user.world_coverage >= 21 && $scope.user.world_coverage <= 40){
      $scope.user.travel_status = 'Global Traveller';
    }
    if($scope.user.world_coverage >= 41 && $scope.user.world_coverage <= 60){
      $scope.user.travel_status = 'World Expert';
    }
    if($scope.user.world_coverage >= 61 && $scope.user.world_coverage<= 100){
      $scope.user.travel_status = 'Travel Warrior';
    }
  };

  var extractCountryCode = function () {
    var countryCode = [];
    for (var i = 0; i < $scope.countries.length; i++) {
      if ($scope.countries[i].checked) {
        countryCode.push($scope.countries[i].country_code);
      }
    }

    $scope.user.countries_visited = countryCode.length;
    $scope.user.world_coverage    = Math.round($scope.user.countries_visited / COUNTRYCOUNT * 100);

    updateTravelStatus();
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

  var getUserCountries = function (countries) {
    $http({
      url: 'http://localhost:3000/api/user/user_countries',
      method: 'GET'
    }).then(function(resp){
      selectCountries(countries, resp.data);
    }, function(resp){
      console.log(resp);
    });
  };

  // GET COUNTRY INFO TO CREATE LIST
  var getCountriesTemplate = function (){
    var url = "http://localhost:3000/api/countries";

    $http.get(url)
    .success(function(continents){
      $scope.continents = continents;
      $scope.countries = [];
      console.log(continents);
      console.log($scope.countries);

      for (var key in $scope.continents) {
        $scope.countries.push($scope.continents[key]);
      }

      $scope.countries = $scope.countries.reduce(function(a, b) {
        return a.concat(b);
      }, []);

      getUserCountries($scope.countries);
    })
    .error(function(data) {
      console.log('server side error occurred');
    });
  };

  var init = function () {
    generateMap();
    getCountriesTemplate();
  };

  init();

  var createUserCountry = function (country, countryID) {
    $http({
      url: 'http://localhost:3000/api/user/user_countries',
      method: 'POST',
      data: {
        user_country: {
          country_id: countryID
        }
      }
    }).then(function(resp){
      country.userCountryID = resp.data.id;
      updateMap();
    }, function(resp){
      console.log(resp);
    });
  };

  var destroyUserCountry = function (country, userCountryID) {
    $http({
      url: 'http://localhost:3000/api/user/user_countries/' + userCountryID,
      method: 'DELETE'
    }).then(function(resp){
      delete country.userCountryID;
      updateMap();
    }, function(resp){
      console.log(resp);
    });
  };

  $scope.updateUserCountry = function (country) {
    if (country.checked) {
      createUserCountry(country, country.id);
    } else {
      destroyUserCountry(country, country.userCountryID);
    }
  };

  // TOGGLE ACCORDION LIST
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
