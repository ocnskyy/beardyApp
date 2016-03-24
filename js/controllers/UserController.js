beardyApp.controller('UserController', ['$scope', '$state', function($scope, $state) {
	console.log('its user controller');

   $scope.user = Backendless.UserService.getCurrentUser();
   console.log($scope.user);

   $scope.changeInput = function(obj) {
      $('#'+obj.target.attributes.id.value+'_input').prop('disabled', false);
   };

   $scope.avatars = [];
   $scope.changeAvatar = function() {
      var files = Backendless.Files.listing($scope.user.name).data;
      console.log('files', files);

      for (var i = 0; i < files.length; i++) {
         if (files[i].name.substr(files[i].name.length - 3) === 'png' ||
            files[i].name.substr(files[i].name.length - 3) === 'jpg' ||
            files[i].name.substr(files[i].name.length - 4) === 'jpeg') {
               $scope.avatars.push(files[i]);
            }
      }
      console.log('here', $scope.avatars);
      $('#avatar_list').removeClass('hidden');
      // console.log(files.filter(function(element) {
      //    element.name.substr(element.name.length - 3) === 'png' ||
      //    element.name.substr(element.name.length - 3) === 'jpg' ||
      //    element.name.substr(element.name.length - 4) === 'jpeg'
      // });
   };

   function userUpdated(user) {
      $scope.user = user;
      console.log('updated', $scope.user);
      $state.go('main');
   }
   function gotError(err) {
     console.log( "error message - " + err.message );
     console.log( "error code - " + err.statusCode );
   }
   
   $scope.pickPicture = function(obj) {
      console.log(obj.target.src);
      $scope.user.avatar = obj.target.src;
      Backendless.UserService.update( $scope.user, new Backendless.Async( userUpdated, gotError ) );
   };

   $scope.updateUser = function() {
      Backendless.UserService.update( $scope.user, new Backendless.Async( userUpdated, gotError ) );
   };

}]);
