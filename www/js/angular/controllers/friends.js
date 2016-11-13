app.controller('FriendsCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){

  var getUserFriends = function () {
    $scope.dataLoaded = false;
    $http({
      url: 'http://localhost:3000/api/user/friendships/',
      method: 'GET',
    }).then(function(data){
      $scope.dataLoaded = true;
      $scope.friendsList = data;
       console.log(data);
    }, function(resp){
      console.log(resp);
    });
  };



  // $scope.addFriend  = function() {
  // // MAKE SURE TO ADD THE USER ID TO A DATA ATTRIBUTE IN THE GENERATED DIV
  //   var id = $(".friend-img").parent().attr("data-id");

  // // $(document).on("click", "a#my-friends", function() {
  // //   var id = $(this).parents("div.col-md-12").parent().data("id");
  // //   console.log(id);
  // //   getFriends();
  // // });

  //   var fParam = {
  //     friend_id: id
  //   };

  //   $http({
  //     url: 'http://localhost:3000/api/user/friendships/',
  //     method: 'POST',
  //   }).then(function(data){
  //     console.log("friendship successfully added");
  //   }),function(resp){
  //     console.log(resp);
  //   };
  // };

  var init = function () {
    getUserFriends();
  };

  init();


}]);