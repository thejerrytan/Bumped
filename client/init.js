Meteor.startup(function() {
	// Potentially prompts the user to enable location services. We do this early
	// on in order to have the most accurate location by the time the user shares
	$.getScript("https://api.tiles.mapbox.com/mapbox-gl-js/v0.12.3/mapbox-gl.js", function(){
		console.log("hello world!");
		Session.set("mapbox-gl", 1);
		mapboxgl.accessToken = 'pk.eyJ1IjoiamVycnl0YW4iLCJhIjoiY2lqazVjdGJiMDMybXU0bHQ4a2kzOWI5biJ9.W57rFm6pWbNxfsagv_NX5Q';
		var map = new mapboxgl.Map({
		    container: 'map', // container id
		    style: 'mapbox://styles/mapbox/emerald-v8', //stylesheet location
		    center: [103.776, 1.296], // starting position
		    zoom: 14.5 // starting zoom
		});	
	})
});