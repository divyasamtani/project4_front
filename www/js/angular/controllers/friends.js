app.controller('FriendsCtrl', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http){
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;

// GET ALL FRIENDS
  var getUserFriends = function () {
    $scope.dataLoaded = false;
    $http({
      url: 'http://localhost:3000/api/user/friendships',
      method: 'GET',
    }).then(function(resp){
      $scope.dataLoaded = true;
      $scope.friendsList = resp.data;
       console.log(resp);
    }, function(resp){
      console.log(resp);
    });
  };



// SEARCH FOR ALL USERS
  var getAllUsers = function (){
    var url = "http://localhost:3000/api/users"

    $http.get(url)
      .success(function(users){
       $scope.userList = users;
      })
      .error(function(data){
        console.log('server side error occured');
      });
  };

// DELETE FRIEND
//  $scope.deleteFriend = function (){

//   }


// CREATE FRIENDSHIP
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
    getAllUsers ();
  };

  init();


}]);