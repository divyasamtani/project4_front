app.controller('NotesCtrl', ['$scope', '$auth', '$state','$http', function($scope, $auth, $state, $http){

  $scope.notes = [];

  // Get all notes
  var getUserNotes = function () {
    $http({
      url: 'http://localhost:3000/api/user/travel_notes',
      method: 'GET'
    }).then(function(resp){
      $scope.notes = resp.data;
    }, function(resp){
      console.log(resp);
    });
  };

  var showTravelNote = function () {

  };

  var init = function () {
    getUserNotes();
  };

  init();

}]);