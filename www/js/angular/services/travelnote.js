app.service('NoteService', ['$resource', function($resource){
  this.resource = $resource('http://localhost:3000/user/travel_notes/:id', {
    id: '@id'
  }, {
    'update': {method:'PUT'},
    'query': {method:'GET', isArray: false},
  });
}]);
