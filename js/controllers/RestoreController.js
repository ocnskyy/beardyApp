beardyApp.controller('RestoreController', ['$scope', '$state', function($scope, $state){
   console.log('its restore controller');

   function passwordRecoverySent( user ) {
     console.log( "an email with a link to restore password has been sent to the user" );
   }

   function gotError( err ) {
     console.log( "error message - " + err.message );
     console.log( "error code - " + err.statusCode );
   }

   $scope.restoreMe = function() {
      var async = new Backendless.Async( passwordRecoverySent, gotError );
      Backendless.UserService.restorePassword( $scope.login, async );
   };

}]);
