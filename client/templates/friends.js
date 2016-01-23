Template.friends.onCreated(function(){

});

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

Template.friends.helpers({
	friends : function() {
		var result = Meteor.user().profile;
		var data = [];
		for(var i=0; i<result.friends.length; i++) {
			console.log(result.friends.length);
			if(result.friends[i].status==undefined || result.friends[i].status=="neutral") {
				data.push(result.friends[i]);
			}
		}
		return data;
	},
	friendnemies : function() {
		var result = Meteor.user().profile;
		var data = [];
		for(var i=0; i<result.friends.length; i++) {
			if(result.friends[i].status=="avoid") {
				console.log(result.friends.length);
				data.push(result.friends[i]);
			}
		}
		return data;
	},
	homies : function() {
		var result = Meteor.user().profile;
		var data = [];
		for(var i=0; i<result.friends.length; i++) {
			if(result.friends[i].status=="meet") {	
				console.log(result.friends.length);	
				data.push(result.friends[i]);
			}
		}
		return data;
	},
	getProfilePicture : function(userid) {
		var result = Meteor.wrapAsync('fb.getProfilePicture', userid, 100, 100);
		return result;
	}
})