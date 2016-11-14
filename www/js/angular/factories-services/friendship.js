app.service('FriendshipResource', ['$resource', function($resource){
  this.api = $resource('http://localhost:3000/friendships/:id', {
    id: '@id'
  }, {
    'delete': {method:'DELETE'}
  });
}]);
