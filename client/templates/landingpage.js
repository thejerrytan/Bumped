Template.landingpage.onCreated(function(){
	// // call a server method that populates the user collection with friends using fbgraph API
	// Meteor.call('fb.getFriends', function(err, data){
	// 	console.log(data);
	// });
	locationPoll();
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
	// var self = this;
	// self.autorun(function(){
	// 	self.subscribe("friends", function(){
	// 		if (Mapbox.loaded()) {
	// 		    geojson = Friends.find().fetch();
	// 		    L.mapbox.featureLayer.setGeoJSON(geojson);
	// 		}	
	// 	});
	// });
})

function locationPoll(){
	var currentLocation = { coords: { latitude: 1.296750, longitude: 103.773186 } };
		if (navigator.geolocation) {                                        
			navigator.geolocation.getCurrentPosition(function (position) {      
				console.log(position); 
			});                                                                                         
		} else {                                                             
			alert("Seems like your browser does not allow location sharing. Please allow location sharing and refresh the page!");
		};                                                                  
    setTimeout(locationPoll, 5000);
}

