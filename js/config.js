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
