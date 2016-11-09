app.controller('NotesCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){

  $scope.notes = [];


  // Create New Note
  $scope.createNote = function(task) {
    $scope.notes.push({
      title: note.title,
      body: note.body,
    });
    note.title = "";
    note.body = "";
  };

  // Create New Note
  $scope.newNote = function() {
    // redirect to new note page
  };

  // Save the Note
  $scope.saveNote= function() {
    $scope.taskModal.hide();
  };


}]);