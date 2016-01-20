Meteor.startup(function() {
	// Initialize FB javascript SDK
	window.fbAsyncInit = function() {
    	FB.init({
      		appId      : '446286968895184',
      		status     : true,
      		cookie    : true,
      		xfbml      : true
    	});
  	};
  	FB.Event.subscribe('auth.statusChange', function(response){
		if(response.status == "connected") {
			var uid = response.authResponse.userID;
			console.log("uid = " + uid);
		}
  	});
	window.onload = function(){
		var currentLocation;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				currentLocation = position;
			}, function(error){
				console.log('An error has occured while getting user\'s location' + error.code);
				// error.code can be:
	    		//   0: unknown error
	    		//   1: permission denied
	    		//   2: position unavailable (error response from locaton provider)
	    		//   3: timed out
			});
		}
		$.getScript("https://api.tiles.mapbox.com/mapbox-gl-js/v0.12.3/mapbox-gl.js", function(){
			Session.set("mapbox-gl", 1);
			mapboxgl.accessToken = 'pk.eyJ1IjoiamVycnl0YW4iLCJhIjoiY2lqazVjdGJiMDMybXU0bHQ4a2kzOWI5biJ9.W57rFm6pWbNxfsagv_NX5Q';
			var map = new mapboxgl.Map({
			    container: 'map', // container id
			    style: 'mapbox://styles/mapbox/emerald-v8', //stylesheet location
			    center: [currentLocation.coords.longitude, currentLocation.coords.latitude], // starting position is user's location
			    zoom: 14.5 // starting zoom
			});	
		})
	};
	// Potentially prompts the user to enable location services. We do this early
	// on in order to have the most accurate location by the time the user shares
})