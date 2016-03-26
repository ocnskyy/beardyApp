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
		var message = err.message + '\n';
		var loggerName = 'logger_controller';
		Backendless.Logging.getLogger(loggerName).debug(message);
		Backendless.Logging.getLogger(loggerName).info(message);
		Backendless.Logging.getLogger(loggerName).warn(message);
		Backendless.Logging.getLogger(loggerName).error(message);
		Backendless.Logging.getLogger(loggerName).fatal(message);
		Backendless.Logging.getLogger(loggerName).trace(message);
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
