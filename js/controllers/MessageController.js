beardyApp.controller('MessageController', ['$scope', '$state', function($scope, $state) {
	console.log('its message controller');

	$scope.user = Backendless.UserService.getCurrentUser();
	console.log('user', $scope.user);

	$scope.sendMail = function() {
		console.log('theme', $scope.message.theme);
		console.log('body', $scope.message.body);
		console.log('user', $scope.message.user);
		var recipients = [$scope.message.user];
		var bodyParts = new Bodyparts();
		bodyParts.textmessage = $scope.message.body;
		var att = null;
		function send(obj) {
			console.log('success', obj);
			$state.go('main');
		}
		function error(obj) {
			console.log(obj.status);
			console.log(obj.message);
		}
		Backendless.Messaging.sendEmail($scope.message.theme, bodyParts, recipients, att, new Backendless.Async(send, error));
	};

}]);
