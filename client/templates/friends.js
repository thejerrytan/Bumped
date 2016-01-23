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

Template.friends.events({
	"click .btn.neutral" : function(event){
		event.preventDefault();
		var fb_id = event.target.value;
		console.log(fb_id);

		Meteor.call("Bumped.changeToNeutral", fb_id, function(err, data){
			console.log("change to neutral!" + data);
		});
	},
	"click .btn.meet" : function(event){
		event.preventDefault();
		var fb_id = event.target.value;
		console.log(fb_id);

		Meteor.call("Bumped.changeToMeet", fb_id, function(err, data){
			console.log("change to meet!" + data);

		});
	},
	"click .btn.avoid" : function(event){
		event.preventDefault();
		var fb_id = event.target.value;
		console.log(fb_id);

		Meteor.call("Bumped.changeToAvoid", fb_id, function(err, data){
			console.log("change to avoid!" + data);

		});
	}
});

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