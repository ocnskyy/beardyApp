beardyApp.controller('MainController', ['$scope', '$http', '$state', function($scope, $http, $state) {
   console.log('its main controller');
   var current_user = localStorage.getItem('current_user');
   $scope.fileList = [];
   // Backendless.Files.listing( current_user, new Backendless.Async(gotFiles, gotError) );

   var tmpObj = Backendless.Files.listing(current_user).data;
   console.log('yoyo', tmpObj);
   $scope.fileList = tmpObj;

   console.log('here', $scope.fileList);



}]);
