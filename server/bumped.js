Meteor.methods({
	"Bumped.updateLocation" : function(lastLocation){
		Meteor.users.update(Meteor.userId(), {$set: {"profile.lastLocation": lastLocation, "profile.lastLocationTimestamp": (new Date()).getTime()}});
	},
	"Bumped.getFriendLocations": function() {
		var friendIds = [];
		var friendStatus = {};
		
		var friends = Meteor.user().profile.friends;
		for(var i = 0; i < friends.length; i++){
			var friend = friends[i];
			friendIds.push(friend.fb_id);
			friendStatus[friend.fb_id] = friend.status;
		}

		var users = Meteor.users.find({"services.facebook.id": {$in: friendIds}}).fetch();
		var data = [];
		for(var i = 0; i < users.length; i++){
			var user = users[i];
			var profile = user.profile;
			var facebook = user.services.facebook;
			var id = facebook.id;
			var status = friendStatus[id];
			
			data.push({fb_id: id, status: status, name: profile.name, lastLocation: profile.lastLocation, lastLocationTimestamp: profile.lastLocationTimestamp, profile_picture_url: profile.profile_picture_url});
		}

		return data;
	},
})