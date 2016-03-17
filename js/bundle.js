'use strict'
var APPLICATION_ID = '39957A49-46F9-A413-FF94-43AF60796700';
var SECRET_KEY = 'A80E93A1-4626-EDD8-FFD6-5DB894768800';
var VERSION = 'v1';

Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

var beardyApp = angular.module('beardyApp', ['ui.router']);

beardyApp.controller('LoginController', ['$scope', '$http', '$state', function($scope, $http, $state){
	console.log('its login controller');

	function userLoggedIn( user ) {
		$state.go('main');
		console.log(user);
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

}]);

beardyApp.controller('MainController', ['$scope', '$http', '$state', function($scope, $http, $state) {
   console.log('its main controller');
}]);

beardyApp.controller('RegisterController', ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log('its register controller');

   function userRegistered( user ) {
     console.log( "user has been registered" );
     $state.go('login');
   }

   function fileCreated (response) {
      console.log('file uploaded, horey', response);
   }

   function gotError( err ) {
     console.log( "error message - " + err.message );
     console.log( "error code - " + err.statusCode );
   }

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
      Backendless.UserService.register( user, new Backendless.Async( userRegistered, gotError ) );
   };

}]);

beardyApp.controller('RestoreController', ['$scope', '$http', '$state', function($scope, $http, $state){
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
		});

});
