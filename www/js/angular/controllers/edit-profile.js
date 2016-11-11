app.controller('EditProfileCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

// CREATE MAP
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

  var selectCountries = function (countries, userCountries) {
    for (var i = 0; i < userCountries.length; i++) {
      for (var k = 0; k < countries.length; k++) {
        if (countries[k].id === userCountries[i].country_id) {
          countries[k].checked = true;
          countries[k].userCountryID = userCountries[i].country_id;
        }
      }
    }
  };

  var getUserCountries = function (countries) {
    $http({
      url: 'http://localhost:3000/api/user/user_countries',
      method: 'GET'
    }).then(function(resp){
      console.log(resp);
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
      window.continents = $scope.continents;
      var countries = [];

      for (var key in $scope.continents) {
        countries.push($scope.continents[key]);
      }

      countries = countries.reduce(function(a, b) {
        return a.concat(b);
      }, []);

      getUserCountries(countries);
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
      console.log(resp);
      country.userCountryID = resp.data.id;
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

// ********************

// // UPDATE MAP WITH CHECKED LOCATIONS
//   function updateMap () {
//     mapObject.clearSelectedRegions();
//   // Update map with the appropriate country codes
//     mapObject.setSelectedRegions(locations)
//   }

// // SAVE LOCATIONS TO CURRENT USER AND UPDATE TRAVEL STATS

//   var url = "http://localhost:3000/api/user/user_countries";

//   $http.post(url)
//     .success(function(user_countries){
//       $scope.user_countries = user_countries;
//     })
//     .error(function(data) {
//       console.log('server side error occurred');
//     });


  // function saveTravelStats(){
  //   $.ajax({
  //     url: '/user',
  //     method: 'PUT',
  //     data: {
  //       locations: locations,
  //       worldCoverage: worldCoverage,
  //       travelPercentage: travelPercentage,
  //       travelLevel: travelLevel
  //     }
  //   }).done(function(data){
  //     console.log("locations saved");
  //   });
  // }

// UPDATE CHECKBOXES

 // function updateCheckbox(){
  //   if (window.location.pathname === "/secret") {
  //     for(var i = 0; i < locations.length; i++) {
  //       var location = locations[i];
  //       var name     = countryName[location];
  //       $('input[type=checkbox][value="' + name + '"]').prop('checked', true);
  //     }
  //   }
  // }

// REPOPULATE MAP ON PROFILE PAGE
  // function repopulateMap () {
  //   var $loc = $('#loc');
  //   if($loc.length == 1){
  //     locations = JSON.parse($loc.text());

  //     updateMap();
  //     updateTravelStats();
  //   }
  // }

}]);
