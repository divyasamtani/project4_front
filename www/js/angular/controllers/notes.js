app.controller('NotesCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

  $scope.notes = [];
  $scope.note = {};

// GET ALL TRAVEL NOTES
  var getUserNotes = function(){
    $http({
      url: 'http://localhost:3000/api/user/travel_notes',
      method: 'GET'
    }).then(function(resp){
      $scope.notes = resp.data;
    },function(resp){
      console.log(resp);
    });
  };

// DELETE
  $scope.deleteTravelNote = function(index){
    var note = $scope.notes[index];
    $http({
      url: 'http://localhost:3000/api/user/travel_notes/' + note.id,
      method: 'DELETE'
    }).then(function(){
      $scope.notes.splice(index, 1);
      console.log('notes');
    }, function(resp){
      console.log('error');
    });
  };

  var init = function () {
    getUserNotes();
  };

  init();

}]);

