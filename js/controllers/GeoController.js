beardyApp.controller('GeoController', ['$scope', '$state', function($scope, $state) {
	console.log('its geo controller');

	// function initialize() {
	//   var mapProp = {
	//     center:new google.maps.LatLng(51.508742,-0.120850),
	//     zoom:5,
	//     mapTypeId:google.maps.MapTypeId.ROADMAP
	//   };
	//   var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	// }
	// google.maps.event.addDomListener(window, 'load', initialize);
	$scope.user = Backendless.UserService.getCurrentUser();

	$scope.places = [];
	$scope.place;
	$scope.placesAccepted = [];
	$scope.places = Backendless.Persistence.of( 'Place' ).find({}).data;
	console.log('places', $scope.places);



	$scope.getPlaces = function(value) {
		if (value === 'category') {

			$scope.placesAccepted = $scope.places.filter(function(element) {
				return element.category === $scope.place.category;
			});
		}

		console.log($scope.place);


		// function success(data) {
		// 	console.log('success', data);
		// }
		// function error(data) {
		// 	console.log( "error message - " + err.message );
	   //    console.log( "error code - " + err.statusCode );
		// }
		//
		// var query = {
		// 	// latitude: 41.38,
		// 	//  longitude: 2.15,
		// 	//  radius: 100000,
		// 	//  units: "METERS",
		// 	publisher : $scope.user.objectId
		// };
		// $scope.places = Backendless.Persistence.of( 'Place' ).find(query).data;
	};

}]);
