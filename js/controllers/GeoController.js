beardyApp.controller('GeoController', ['$scope', '$state', function($scope, $state) {
	console.log('its geo controller');
	var query = {
		latitude: 41.38,
		 longitude: 2.15,
		 radius: 100000,
		 units: "METERS",
	};
	function success(data) {
		console.log('success', data);
	}
	function error(data) {
		console.log( "error message - " + err.message );
      console.log( "error code - " + err.statusCode );
	}
	Backendless.Geo.find( query, new Backendless.Async( success, error ) )
}]);
