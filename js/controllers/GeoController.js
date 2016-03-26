beardyApp.controller('GeoController', ['$scope', '$state', function($scope, $state) {
	console.log('its geo controller');

	$scope.user = Backendless.UserService.getCurrentUser();
	console.log('user', $scope.user);
	// var allLikes = Backendless.Persistence.of('PlaceLike12').find({}).data;
	// console.log('All likes', allLikes);
	$scope.place = null;
	$scope.placesAccepted = [];
	$scope.places = Backendless.Persistence.of( 'Place' ).find({}).data;
	for (var i = 0; i < $scope.places.length; i++) {
		//get likes
		var query = {condition: "placeId = '" + $scope.places[i].objectId + "'"};
		var likes = Backendless.Persistence.of('PlaceLike12').find(query).data;
		//lices amount
		console.log('likes for',i, ' = ',likes);
		$scope.places[i].likes = likes.length;
		//user likes
		for (var j = 0; j < likes.length; j++) {
			if ($scope.user.objectId === likes[j].userId) {
				$scope.places[i].userLike = true;
				break;
			}
			else {
				$scope.places[i].userLike = false;
			}
		}
		// query.condition = "placeId = '" + $scope.places[i].objectId + "' ";
	}
	console.log('places', $scope.places);

	//load map
	var map = null;
	var marker = null;
	var mapPlaces = [];
	function initializeMaps() {
		var mapProp = {
		 center: new google.maps.LatLng(50.34721312721887,35.517425537109375),
		 zoom:9,
		 mapTypeId:google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
		marker = new google.maps.Marker({
		  map: map
	 	});
	}
	initializeMaps();
	var query = {};
	$("#myModal").on("shown.bs.modal", function () {
	    google.maps.event.trigger(map, "resize");
	});
	$('#myModal').on('hidden.bs.modal', function () {
		console.log('hide modal');
		// marker.map = null;
		// console.log('marker', marker);
	});
	google.maps.event.addListener(map, 'click', function(event) {
   	placeMarker(event.latLng);
	});
	function placeMarker(location) {
	   marker.setPosition(location);
		query.condition = 'distance( '+location.lat()+', '+location.lng()+', point.latitude, point.longitude) < km(5)';
		var arr = Backendless.Persistence.of( 'Place' ).find( query ).data;
		for (var i = 0; i < arr.length; i++) {
			for (var j =0 ; j < $scope.places.length; j++) {
				if (arr[i].objectId === $scope.places[j].objectId) {
					$scope.placesAccepted.push($scope.places[j]);
				}
			}
			// var tmp = $scope.places.filter(function(el) {return el.objectId === arr[i].objectId});
			// console.log('loh', tmp[0]);
			// $scope.placesAccepted.push(tmp[0]);
			// $scope.placesAccepted.push();
		}

		//  $scope.placesAccepted = Backendless.Persistence.of( 'Place' ).find( query ).data;

		 console.log('map places', $scope.placesAccepted);
		 console.log('lat', location.lat());
		 console.log('lng', location.lng());
	}
	// google.maps.event.addDomListener(window, 'load', initialize);



	$scope.getPlaces = function(value) {
		if (value === 'category') {
			if ($scope.place.category === 'all') {
				$scope.placesAccepted = $scope.places;
			}
			else {
				$scope.placesAccepted = $scope.places.filter(function(element) {
					return element.category === $scope.place.category;
				});
			}
		}
		else if (value === 'hash') {
			if ($scope.place.hash === "") {
				$scope.placesAccepted = $scope.places;
			}
			else {
				$scope.placesAccepted = $scope.places.filter(function(element) {
					return element.hashInformation === '#'+$scope.place.hash;
				});
			}
		}
		else if (value === 'map') {
			console.log('execution maps');
			// var mapPlaces = Backendless.Persistence.of( 'Place' ).find( query );
			// console.log('map places', mapPlaces);
			// initializeMaps();

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

	$scope.changeLike = function(place, index) {
		console.log('place', place);
		console.log('index', index);
		var tmpObj = {
			placeId : place.objectId,
			userId : $scope.user.objectId
		};
		// if (place.user)
		if (place.userLike) {
			var yo = {
				condition: "placeId = '" + place.objectId + "' AND userId = '" + $scope.user.objectId + "'"
			};
			var savedObj = Backendless.Persistence.of( 'PlaceLike12' ).find( yo ).data;
			Backendless.Persistence.of( 'PlaceLike12' ).remove( savedObj[0] );
			$scope.placesAccepted[index].userLike = false;
			$scope.placesAccepted[index].likes - 1;
			for (var i = 0; i < $scope.places.length; i++) {
				if ($scope.places[i].objectId === place.objectId) {
					$scope.places[i].userLike = false;
					$scope.places[i].likes--;
				}
			}
		}
		else {
			Backendless.Persistence.of( 'PlaceLike12' ).save( tmpObj );
			$scope.placesAccepted[index].userLike = true;
			$scope.placesAccepted[index].likes++;
			for (var j = 0; j < $scope.places.length; j++) {
				if ($scope.places[j].objectId === place.objectId) {
					$scope.places[j].userLike = true;
					$scope.places[j].likes + 1;
				}
			}
		}
	};

}]);
