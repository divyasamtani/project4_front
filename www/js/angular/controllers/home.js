app.controller('HomeCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state){

    $scope.users = [
  {'id':1 , 'name' : 'ABC1', 'location' : 'London'},
  {'id':2 , 'name' : 'ABC2', 'location' : 'New York' },
  {'id':3 , 'name' : 'ABC3', 'location' : 'Toronto'},
  {'id':4 , 'name' : 'ABC4', 'location' : 'Hong Kong'},
  ];

}]);