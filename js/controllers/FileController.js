beardyApp.controller('FileController', ['$scope', '$http', '$state', function($scope, $http, $state) {
   console.log('its file controller');
   var current_user = localStorage.getItem('current_user');
   $scope.fileList = [];
   $scope.sharedUser;
   // Backendless.Files.listing( current_user, new Backendless.Async(gotFiles, gotError) );
   
   function getList() {
	   var tmpObj = Backendless.Files.listing(current_user).data;
	   var tmp = Backendless.Files.listing(current_user + '/shared/').data;
	   console.log('yoyo0', tmp);
	   if(tmp !== undefined){
		   for(var i=0;i<tmp.length;i++){
			   tmp[i].name += " (shared)";
			   tmpObj.push(tmp[i]);
		   }
	   }
	   console.log('yoyo', tmpObj);
	   $scope.fileList = tmpObj;
	   console.log('azazaza', $scope.fileList);
   }
   
   getList();
   
   $scope.uploadFile = function() {
	     
	   var file =$('#files').prop("files")[0]; 

	   console.log(file);
	   
	   Backendless.Files.upload( file, current_user, true, new Backendless.Async( fileUploaded, gotError ) );
	   
		function fileUploaded (response) {
		    console.log('file uploaded, horey', response);
		    getList();
		    console.log('azazaza', $scope.fileList);
		}
		function fileDeleted (response) {
		    console.log('file deleted, horey', response);
		    setTimeout(getList, 1000);
//		    getList();
		}
		
		function gotError( err ) {
		    console.log( "error message - " + err.message );
		    console.log( "error code - " + err.statusCode );
		}
   };
   
   $scope.deleteFile = function(obj) {
	   function fileDeleted (response) {
		    console.log('file deleted, horey', response);
		    getList();
		}
		
		function gotError( err ) {
		    console.log( "error message - " + err.message );
		    console.log( "error code - " + err.statusCode );
		}
		console.log(obj);
		var tmp = current_user+"/"+obj.file.name;
		console.log(tmp);
	   Backendless.Files.remove( tmp, new Backendless.Async( fileDeleted, gotError ) );
   };
   
   $scope.share = function() {
	   
		function gotError( err ) {
		    console.log( "error message - " + err.message );
		    console.log( "error code - " + err.statusCode );
		}
		
		function success(obj){
			console.log(obj);
		}
		
		function fileCreated(obj) {
			console.log(obj);
		}
		
		
		console.log($scope.sharedUser);
	   
		var contactStorage = Backendless.Persistence.of( Backendless.User );
		var dataQuery = {
		   condition: "name = '" + $scope.sharedUser + "'"
		};
		var myContact = contactStorage.find( dataQuery );
	   console.log(myContact);
	   
	   for (var i=0; i<$scope.selectedFiles.length; i++) {
		   console.log($scope.selectedFiles[i]);
		   var text = $scope.selectedFiles[i].publicUrl;
		   var blob = new Blob([text], {type: 'text/plain'});
		   console.log('here blob', blob);
		   var file = new File([blob], $scope.selectedFiles[i].name);
		   console.log('here file', file);
		   
		   Backendless.Files.upload(file, $scope.sharedUser + "/shared/", true, new Backendless.Async( fileCreated, gotError ) );
	   }
   };  
   
   
   $scope.addFile = function(file){
	   if($scope.selectedFiles === undefined)
		   $scope.selectedFiles = [];
	   var index = $scope.selectedFiles.indexOf(file); 
	   if(index == -1)
		   $scope.selectedFiles.push(file);
	   else
		   delete $scope.selectedFiles[index];
	   console.log($scope.selectedFiles);
   };
   
   
	$scope.multyDelete = function() {
		   
		function gotError( err ) {
		    console.log( "error message - " + err.message );
		    console.log( "error code - " + err.statusCode );
		}
		
		function success(obj){
			console.log(obj);
		}
		
		function fileCreated(obj) {
			console.log(obj);
		}
		
		function fileDeleted (response) {
		    console.log('file deleted, horey', response);
		    getList();
		}
		
		function gotError( err ) {
		    console.log( "error message - " + err.message );
		    console.log( "error code - " + err.statusCode );
		}
		
		console.log($scope.sharedUser);
		
		var contactStorage = Backendless.Persistence.of( Backendless.User );
		var dataQuery = {
		   condition: "name = '" + $scope.sharedUser + "'"
		};
		var myContact = contactStorage.find(dataQuery);
		console.log(myContact);
		
		var current_user = localStorage.getItem('current_user');
		
		for (var i=0; i<$scope.selectedFiles.length; i++) {
		   console.log($scope.selectedFiles[i]);
		   Backendless.Files.remove( current_user + "/" + $scope.selectedFiles[i].name, new Backendless.Async( fileDeleted, gotError ) );
		}
	};  

   console.log('here', $scope.fileList);
   
}]);