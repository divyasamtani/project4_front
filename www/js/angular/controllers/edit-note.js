app.controller('EditNoteCtrl', ['$scope', '$auth', '$state','$http', '$stateParams', 'NoteService', '$cordovaSocialSharing', function($scope, $auth, $state, $http, $stateParams, NoteService, $cordovaSocialSharing){

  var noteID = $stateParams.noteID;
  $scope.bodyHeight = window.innerHeight - $('ion-header-bar').height() - 100;
  console.log($scope.bodyHeight);
  $scope.note = {};

  $scope.shareNote = function () {
    console.log('hello');
    $cordovaSocialSharing.share('General share Message', null, null, null);
  };

  // SHOW TRAVEL NOTE USING PARAMS ID
  var getTravelNoteInfo = function () {
    $http({
      url: 'http://localhost:3000/api/user/travel_notes/' + noteID,
      method: 'GET'
  }).then(function(resp){
      $scope.note = resp.data;
      console.log(resp.data);
    },function(resp){
      console.log(resp);
    });
  };

// EDIT TRAVEL NOTE ON THE FRONT END
  $scope.editTravelNote = function () {

    $scope.note = {
      title: $scope.note.title,
      body: $scope.note.body
    };

    $http({
      url: 'http://localhost:3000/api/user/travel_notes/' + noteID,
      method: 'PUT',
      data: $scope.note
    }).then(function(){
      console.log('note updated');
    }, function(resp){
      console.log('error');
    });
  };


  getTravelNoteInfo();

}]);