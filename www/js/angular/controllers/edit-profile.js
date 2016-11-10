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

// $scope.groups = [];
//   for (var i=0; i<10; i++) {
//     $scope.groups[i] = {
//       name: i,
//       items: []
//     };
//     for (var j=0; j<3; j++) {
//       $scope.groups[i].items.push(i + '-' + j);
//     }
//   }

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */

  // $scope.toggleGroup = function(group) {
  //   if ($scope.isGroupShown(group)) {
  //     $scope.shownGroup = null;
  //   } else {
  //     $scope.shownGroup = group;
  //   }
  // };
  // $scope.isGroupShown = function(group) {
  //   return $scope.shownGroup === group;
  // };


  }]);