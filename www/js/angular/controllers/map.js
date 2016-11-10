// app.controller('MapCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){



  // // UPDATE MAP WITH CHECKED LOCATIONS
  // function updateMap () {
  //   mapObject.clearSelectedRegions();
  //   mapObject.setSelectedRegions(locations)
  // }


  // LOOK FOR CHECKED LOCATIONS
  // function bindCheckbox () {
  //   $("input[type=checkbox]").click(function(e) {
  //     var $checkboxes = $("input[type=checkbox]");
  //     locations =[];
  //     for(var i = 0; i < $checkboxes.length; i++) {
  //       var checkbox = $checkboxes[i];
  //       if (checkbox.checked) {
  //         locations.push(countryCode[checkbox.value]);
  //       }
  //     }
  //   });
  // }

  // // SAVE LOCATIONS
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

  // function updateCheckbox(){
  //   if (window.location.pathname === "/secret") {
  //     for(var i = 0; i < locations.length; i++) {
  //       var location = locations[i];
  //       var name     = countryName[location];
  //       $('input[type=checkbox][value="' + name + '"]').prop('checked', true);
  //     }
  //   }
  // }

  // function repopulateMap () {
  //   var $loc = $('#loc');
  //   if($loc.length == 1){
  //     locations = JSON.parse($loc.text());

  //     updateMap();
  //     updateTravelStats();
  //     updateCheckbox();
  //   }
  // }

// }]);