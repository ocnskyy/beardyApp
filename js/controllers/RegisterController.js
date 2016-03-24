beardyApp.controller('RegisterController', ['$scope', '$state', function($scope, $state){
   console.log('its register controller');

   $scope.registerMe = function() {
      console.log('registration');

      var user = new Backendless.User();
      user.name = $scope.name;
      user.email = $scope.email;
      user.password = $scope.password;
      user.age = +$scope.age;
      user.country = $scope.country;
      user.sex = $scope.sex;

      console.log(user);
      var text = 'Hello, ' + $scope.name;
      var blob = new Blob([text], {type: 'text/plain'});
      console.log(blob);
      var file = new File([blob], $scope.name+'_auto.txt');
      console.log(file);

      Backendless.Files.upload( file, $scope.name, true, new Backendless.Async( fileCreated, gotError ) );

      function fileCreated (response) {
         console.log('file uploaded, horey', response);
         Backendless.UserService.register( user, new Backendless.Async( userRegistered, gotError ) );
      }
   };

   function userRegistered( user ) {
     console.log( "user has been registered" );
     $state.go('login');
   }

   function gotError( err ) {
     console.log( "error message - " + err.message );
     console.log( "error code - " + err.statusCode );
   }

}]);
