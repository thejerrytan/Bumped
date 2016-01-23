Meteor.startup(function() {
	

	// Initialize FB javascript SDK
	window.fbAsyncInit = function() {
    	FB.init({
			appId      : '446286968895184',
			status     : true,
			cookie     : true,
			xfbml      : true
    	});
	  	FB.Event.subscribe('auth.statusChange', function(response){
			if(response.status == "connected") {
				var uid = response.authResponse.userID;
				Meteor.call('fb.loadFriends', function(err, data){

				});
				// var profilePictureUrl = "http://graph.facebook.com/v2.5/" + uid + "/picture?height=100&width=100";
				// Meteor.users.update(Meteor.userId(), {$set: {"profile.profile_picture_url": profilePictureUrl}});
			}
	  	});
  	};
	window.onload = function(){
		// Default NUS Coordinates
	// 	var currentLocation = {coords: {latitude: 1.296750, longitude: 103.773186}};
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(function(position){
	// 			currentLocation = position;

	// 			// // Pan to current location when detected
	// 			// if(map != null){
	// 			// 	map.panTo({lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude});

	// 			// 	// var meIcon = L.icon({
	// 			// 	// 	iconUrl: 'me-marker.gif',
	// 			// 	// 	iconSize: [50, 50],
	// 			// 	// 	iconAnchor: [25, 50],
	// 			// 	// });

	// 			// 	// L.marker([currentLocation.coords.latitude, currentLocation.coords.longitude], {icon: meIcon}).addTo(map);

	// 			// 	if(meLayer == null){
	// 			// 		meLayer = L.mapbox.featureLayer().addTo(map);
	// 			// 	}
	// 			// 	var meGeoJson = [{
	// 			//         type: "Feature",
	// 			//         geometry: {
	// 			//             type: "Point",
	// 			//             coordinates: [currentLocation.coords.longitude, currentLocation.coords.latitude]
	// 			//         },
	// 			//         properties: {
	// 			//         	"marker-color": "#ccff99",
	// 			//         	"title":"me",
	// 			//         	"icon": {
	// 			// 	            "iconUrl": "me-marker.gif",
	// 			// 	            "iconSize": [50, 50], // size of the icon
	// 			// 	            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
	// 			// 	            "className": "dot"
	// 			// 	        }
	// 			//         }
	// 			//     }];

	// 			//     // Set a custom icon on each marker based on feature properties.
	// 			// 	meLayer.on('layeradd', function(e) {
	// 			// 	    var marker = e.layer,
	// 			// 	        feature = marker.feature;

	// 			// 	    marker.setIcon(L.icon(feature.properties.icon));
	// 			// 	});
	// 			// 	meLayer.setGeoJSON(meGeoJson);
	// 			// }

	// 			// Save to database
	// 			var lastLocation = [currentLocation.coords.latitude, currentLocation.coords.longitude];
	// 			// var lastLocationTimestamp = (new Date()).getTime();
	// 			// Meteor.users.update(Meteor.userId(), {$set: {"profile.lastLocation": lastLocation, "profile.lastLocationTimestamp": lastLocationTimestamp}});
	// 			// Meteor.call("Bumped.updateLocation", lastLocation, function(err, data){
	// 			// 	console.log("Error " + err);
	// 			// 	console.log("Data " + data);
	// 			// });

	// 		}, function(error){
	// 			alert('An error has occured while getting user\'s location. Error code ' + error.code);
	// 			// error.code can be:
	//     		//   0: unknown error
	//     		//   1: permission denied
	//     		//   2: position unavailable (error response from locaton provider)
	//     		//   3: timed out
	// 		});

	// 	} else {
	// 		alert("Seems like your browser does not allow location sharing. Please allow location sharing and refresh the page!");
	// 	};
	};
})