app.service('NoteResource', ['$resource', function($resource){
  this.api = $resource('http://localhost:3000/user/travel_notes/:id', {
    id: '@id'
  }, {
    'update': {method:'PUT'}
  });
}]);
