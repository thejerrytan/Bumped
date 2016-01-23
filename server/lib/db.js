Meteor.methods({
	"db.getFriendLocations": function(friendIds) {
		var users = Meteor.users.find({"services.facebook.id": {$in: friendIds}}, {profile: true}).fetch();
		var data = [];
		for(var i = 0; i < users.length; i++){
			var user = users[i];
			var profile = user.profile;

			data.push({name: profile.name, lastLocation: profile.lastLocation, lastLocationTimestamp: profile.lastLocationTimestamp, profile_picture_url: profile.profile_picture_url});
		}
		return data;
	}
});


