app.controller('CreateNoteCtrl', ['$scope', '$auth', '$state','$http', function($scope, $auth, $state, $http){

  $scope.newNote = {};
  $scope.notes = [];

  // Create New Note
  $scope.createTravelNote = function() {
    $http({
       url: 'http://localhost:3000/api/user/travel_notes',
        method: 'POST',
       data: $scope.newNote
     }).then(function(resp){
         console.log('note created');
         $scope.newNote = {};
         $scope.notes.push(resp.data.note);
     }, function(resp){
        console.log(resp);
     });
   };

 }]);