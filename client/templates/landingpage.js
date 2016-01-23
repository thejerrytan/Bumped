Template.landingpage.onCreated(function(){
	// // call a server method that populates the user collection with friends using fbgraph API
	// Meteor.call('fb.getFriends', function(err, data){
	// 	console.log(data);
	// });
	Mapbox.load();
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
	var map = null;
	mapCentered = false;
	Tracker.autorun(function () {
		if (Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1IjoiamVycnl0YW4iLCJhIjoiY2lqazVjdGJiMDMybXU0bHQ4a2kzOWI5biJ9.W57rFm6pWbNxfsagv_NX5Q';
			map = L.mapbox.map("map", "mapbox.emerald");
			featureLayer = L.mapbox.featureLayer().addTo(map);
			featureLayer.on('layeradd', function(e) {
			    var marker = e.layer,
			        feature = marker.feature;
			    marker.setIcon(L.icon(feature.properties.icon));
			});

			map.setView([1.3000, 103.8000], 16);
			getLocation(map, featureLayer);
			// map.setView([meCurrentLatitude, meCurrentLongitude], 16);
		}	
	});
})

function loadMap(position, map, featureLayer){
	var meLayer = null;
	var meCurrentLatitude = position.coords.latitude;
	var meCurrentLongitude =  position.coords.longitude;

	var currentLocation = {coords: {latitude: meCurrentLatitude, longitude: meCurrentLongitude}};

	if (!mapCentered){
		map.setView([meCurrentLatitude,meCurrentLongitude], map._zoom);
		mapCentered = true;
	}
	
	if (Mapbox.loaded()) {		
		// Dynamic Add and Remove Points
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
		
		// featureLayer.setGeoJSON([]);

		featureLayer.setGeoJSON(geoJson);
	}
	var loop = setTimeout(getLocation, 5000, map, featureLayer);
}

function getLocation(map, featureLayer){
	console.log("!!!!!!!!!!")
	var locationFailure = false;
	// var currentLocation = { coords: { latitude: 1.296750, longitude: 103.773186 } };
	if (navigator.geolocation) {                                        
		navigator.geolocation.getCurrentPosition(function (position) {  
			if (position.coords && position.coords.latitude && position.coords.longitude) {
				loadMap(position, map, featureLayer);
				console.log('maploaded');
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

