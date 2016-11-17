app.service('NoteService', ['$resource', 'urlConstant', function($resource, urlConstant){
  this.resource = $resource(urlConstant.apiUrl + '/user/travel_notes/:id', {
    id: '@id'
  }, {
    'update': {method:'PUT'},
    'query': {method:'GET', isArray: false},
  });
}]);
