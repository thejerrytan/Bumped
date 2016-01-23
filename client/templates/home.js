Template.home.onCreated(function(){
	// // call a server method that populates the user collection with friends using fbgraph API
	Mapbox.load();
});

Template.home.helpers({
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

Template.home.onRendered(function(){
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

		Meteor.call('Bumped.getFriendLocations', function(err, data){
			for (var i = 0; i<data.length; i++){
				var currentFriend = getFriendGeoJson(data[i]);
				if (currentFriend != null){
					geoJson.unshift(currentFriend);
				}
			}
			featureLayer.setGeoJSON(geoJson);
		});			
	}
	var loop = setTimeout(getLocation, 5000, map, featureLayer);
}

function getFriendGeoJson(friend){
	var iconUrl = "smooch-marker.gif";
	if (friend.status == "avoid"){
		iconUrl = "ghost-marker.gif";
	}
	if (friend && friend.lastLocation[1] && friend.lastLocation[0] && friend.status != "neutral"){
		var json = {
			type: "Feature",
	        geometry: {
	            type: "Point",
	            coordinates: [friend.lastLocation[1], friend.lastLocation[0]]
	        },
	        properties: {
	        	"marker-color": "#ccff99",
	        	"title": "Last seen: " + new Date(friend.lastLocationTimestamp).toString(),
	        	"icon": {
		            "iconUrl": iconUrl,
		            "iconSize": [50, 50], // size of the icon
		            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
		            "className": "dot"
		        }
	        }
		};
		return json;
	} else {
		return null;
	}
}

function getLocation(map, featureLayer){
	console.log("!!!!!!!!!!")
	var locationFailure = false;
	// var currentLocation = { coords: { latitude: 1.296750, longitude: 103.773186 } };
	if (navigator.geolocation) {                                        
		navigator.geolocation.getCurrentPosition(function (position) {  
			if (position.coords && position.coords.latitude && position.coords.longitude) {
				var formatedPosition = [position.coords.latitude, position.coords.longitude, position.coords.accuracy];
				Meteor.call("Bumped.updateLocation", formatedPosition ,function (err, data) {     
					if (err) {
						console.log("Error updating location: ", err);
					}  
			    });
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

