Template.friends.onCreated(function(){
	// call a server method that populates the user collection with friends using fbgraph API
	Meteor.call('fb.getFriends', function(err, data){
		console.log(data);
	});
});

Template.friends.helpers({
	getFriends : function() {
		var result = Meteor.call('fb.getFriendsData', function(err, data){
			console.log(data);
		});
		// console.log(result);
		return result.data;
	},
	getProfilePicture : function(userid) {
		Meteor.call('fb.getProfilePicture', userid, 100, 100, function(err, data){
			console.log(data);
		});
	}
})

Template.friends.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("friends", function(){
			if (Mapbox.loaded()) {
			    geojson = Friends.find().fetch();
			    L.mapbox.featureLayer.setGeoJSON(geojson);
			}	
		});
	});
})