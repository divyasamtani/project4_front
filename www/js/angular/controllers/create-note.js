app.controller('CreateNoteCtrl', ['$scope', '$auth', '$state','$http', 'urlConstant', function($scope, $auth, $state, $http, urlConstant){

  $scope.newNote = {};
  $scope.notes = [];

  // Create New Note
  $scope.createTravelNote = function() {
    $http({
       url: urlConstant.apiUrl + '/api/user/travel_notes',
        method: 'POST',
       data: $scope.newNote
     }).then(function(resp){
         console.log('note created');
         $scope.notes.push(resp.data.note);
     }, function(resp){
        console.log(resp);
     });
   };

 }]);