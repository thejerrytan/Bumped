var _ =  lodash; //replace underscore.js with lodash.js

Template.friends.onCreated(function(){

});

Template.friends.onRendered(function(){
	//TODO
	//var self = this;
	//self.autorun(function(){
	//	self.subscribe("friends", function(){
	//		if (Mapbox.loaded()) {
	//		    geojson = Friends.find().fetch();
	//		    L.mapbox.featureLayer.setGeoJSON(geojson);
	//		}
	//	});
	//});
});

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
		var friends = _.get(Meteor.user(), "profile.friends") || {};

		return friends.filter(function (friend) {
			return !friend.status || friend.status==="neutral";
		});
	},
	friendnemies : function() {
		var friends = _.get(Meteor.user(), "profile.friends") || {};

		return friends.filter(function (friend) {
			return friend.status==="avoid";
		});
	},
	homies : function() {
		var friends = _.get(Meteor.user(), "profile.friends") || {};

		return friends.filter(function (friend) {
			return friend.status==="meet";
		});
	},
	getProfilePicture : function(userid) {
		return Meteor.wrapAsync('fb.getProfilePicture', userid, 100, 100);
	}
});