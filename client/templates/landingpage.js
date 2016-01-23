Template.landingpage.onCreated(function(){
	// // call a server method that populates the user collection with friends using fbgraph API
	// Meteor.call('fb.getFriends', function(err, data){
	// 	console.log(data);
	// });
});

Template.landingpage.helpers({
	// getFriends : function() {
	// 	var result = Meteor.call('fb.getFriendsData', function(err, data){
	// 		console.log(data);
	// 	});
	// 	// console.log(result);
	// 	return result.data;
	// },
	// getProfilePicture : function(userid) {
	// 	Meteor.call('fb.getProfilePicture', userid, 100, 100, function(err, data){
	// 		console.log(data);
	// 	});
	// }
})

Template.landingpage.onRendered(function(){
	getLocation();	
})

function loadMap(position){
	var map = null;
	var meLayer = null;
	var meCurrentLatitude = position.coords.latitude;
	var meCurrentLongitude =  position.coords.longitude;
	Mapbox.load();

	Tracker.autorun(function () {
		var currentLocation = {coords: {latitude: meCurrentLatitude, longitude: meCurrentLongitude}};

		if (Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1IjoiamVycnl0YW4iLCJhIjoiY2lqazVjdGJiMDMybXU0bHQ4a2kzOWI5biJ9.W57rFm6pWbNxfsagv_NX5Q';
			map = L.mapbox.map("map", "mapbox.emerald");
			map.setView([meCurrentLatitude, meCurrentLongitude], 16);
			

			// Dynamic Add and Remove Points
			featureLayer = L.mapbox.featureLayer().addTo(map);
			var geoJson = [
				{
			        type: "Feature",
			        geometry: {
			            type: "Point",
			            coordinates: [meCurrentLongitude, meCurrentLatitude]
			        },
			        properties: {
			        	"marker-color": "#ccff99",
			        	"title":"I am here!!",
			        	"icon": {
				            "iconUrl": "me-marker.gif",
				            "iconSize": [50, 50], // size of the icon
				            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
				            "className": "dot"
				        }
			        }
			    }
		    ];

		    // Set a custom icon on each marker based on feature properties.
			featureLayer.on('layeradd', function(e) {
			    var marker = e.layer,
			        feature = marker.feature;

			    marker.setIcon(L.icon(feature.properties.icon));
			});
			featureLayer.setGeoJSON(geoJson);
		}
	});
}

function getLocation(){
	var locationFailure = false;
	// var currentLocation = { coords: { latitude: 1.296750, longitude: 103.773186 } };
	if (navigator.geolocation) {                                        
		navigator.geolocation.getCurrentPosition(function (position) {  
			if (position.coords && position.coords.latitude && position.coords.longitude) {
				// XYZ
				loadMap(position);
			} else {
				locationFailure = true;
			}
		});                                                                                         
	} else {
		locationFailure = true;
	}  
	if (locationFailure){
		alert("Seems like your browser does not allow location sharing. Please allow location sharing and refresh the page!");
	}                                 
}

