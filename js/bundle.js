'use strict'
var APPLICATION_ID = '39957A49-46F9-A413-FF94-43AF60796700';
var SECRET_KEY = 'A80E93A1-4626-EDD8-FFD6-5DB894768800';
var VERSION = 'v1';

Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

var beardyApp = angular.module('beardyApp', ['ui.router']);

beardyApp.controller('FileController', ['$scope', '$state', function($scope, $state) {
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

beardyApp.controller('GeoController', ['$scope', '$state', function($scope, $state) {
	console.log('its geo controller');

}]);

beardyApp.controller('LoginController', ['$scope', '$state', function($scope, $state){
	console.log('its login controller');

	function userLoggedIn( user ) {
		$state.go('main');
		console.log(user);
		localStorage.setItem('current_user', $scope.login);
	}

	function gotError( err ) {
		console.log( "error message - " + err.message );
		console.log( "error code - " + err.statusCode );
	}

	$scope.loginMe = function() {
		var username = $scope.login;
		var password = $scope.password;
		var remember = $scope.remember;
		console.log(username, password, remember);
		Backendless.UserService.login(username, password, remember, new Backendless.Async(userLoggedIn, gotError));
	};

	console.log('blabla');

}]);

beardyApp.controller('MainController', ['$scope', '$state', function($scope, $state) {
   console.log('its main controller');
   var current_user = localStorage.getItem('current_user');

   $scope.goToFile = function() {
   	$state.go('file');
   };

   $scope.goToGeo = function() {
   	$state.go('geo');
   };

   $scope.goToUser = function() {
      $state.go('user');
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

beardyApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
		.state('home', {
			url: '/home',
			// template: "<p>hello</p>",
			templateUrl: 'templates/hello.html',
			controller: 'LoginController'
		})
		.state('login', {
			url: '/login',
			// template: "<p>login</p>",
			templateUrl: '/templates/login.html',
			controller: 'LoginController'
		})
		.state('register', {
			url: '/register',
			// template: "<p>login</p>",
			templateUrl: '/templates/register.html',
			controller: 'RegisterController'
		})
		.state('restore', {
			url: '/restore',
			// template: "<p>login</p>",
			templateUrl: '/templates/restore.html',
			controller: 'RestoreController'
		})
		.state('main', {
			url: '/main',
			// template: "<p>login</p>",
			templateUrl: '/templates/main.html',
			controller: 'MainController'
		})
		.state('file', {
			url: '/file',
			// template: "<p>login</p>",
			templateUrl: '/templates/file.html',
			controller: 'FileController'
		})
		.state('user', {
			url: '/user',
			// template: "<p>login</p>",
			templateUrl: '/templates/user.html',
			controller: 'UserController'
		})
		.state('geo', {
			url: '/geo',
			// template: "<p>login</p>",
			templateUrl: '/templates/geo.html',
			controller: 'GeoController'
		});

});
