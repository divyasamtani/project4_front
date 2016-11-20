app.controller('ProfileCtrl', ['$scope', '$auth', '$state', '$http', 'urlConstant', function($scope, $auth, $state, $http, urlConstant){
  const COUNTRYCOUNT = 176;
  var mapObject;

  // CREATE MAP
  var generateMap = function () {
    mapObject = $('.profile-map').vectorMap({
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

    $scope.user.countries_visited = countryCode.length;
    $scope.user.world_coverage    = Math.round($scope.user.countries_visited / COUNTRYCOUNT * 100);

    return countryCode;
  };

  var updateMap = function () {
    mapObject.updateSize();
    mapObject.clearSelectedRegions();
    // Update map with the appropriate country codes
    mapObject.setSelectedRegions(extractCountryCode());
  };

  var selectCountries = function () {
    var countries = $scope.countries;
    var userCountries = $scope.userCountries;
    for (var i = 0; i < userCountries.length; i++) {
      for (var k = 0; k < countries.length; k++) {
        if (countries[k].id === userCountries[i].country_id) {
          countries[k].checked = true;
          countries[k].userCountryID = userCountries[i].id;
        }
      }
    }
  };

  var getUserCountries = function () {
    $http({
      url: urlConstant.apiUrl + '/api/user/user_countries',
      method: 'GET'
    }).then(function(resp){
      $scope.userCountries = resp.data;
      selectCountries();
      generateMap();
      updateMap();
    }, function(resp){
      console.log(resp);
    });
  };

  // GET COUNTRY INFO TO CREATE LIST
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

      getUserCountries();

    })
    .error(function(data) {
      console.log('server side error occurred');
    });
  };

  var init = function () {
    getCountriesTemplate();
  };

  init();

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
