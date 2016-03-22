beardyApp.controller('MainController', ['$scope', '$http', '$state', function($scope, $http, $state) {
   console.log('its main controller');
   var current_user = localStorage.getItem('current_user');

   $scope.goToFile = function() {
   	$state.go('file');
   };

   $scope.goToGeo = function() {
   	$state.go('geo');
   };

   $scope.logOut = function() {
	   localStorage.removeItem('current_user');
	   function userLoggedout(obj) {
		   console.log(obj);
		   $state.go('login');
	   }
	   
		function gotError(obj) {
			console.log(obj);
		}
	   
	   Backendless.UserService.logout( new Backendless.Async( userLoggedout, gotError ) );
   };

}]);
