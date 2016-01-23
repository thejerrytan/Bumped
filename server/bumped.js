Meteor.methods({
	"Bumped.updateLocation" : function(lastLocation){
		Meteor.users.update(Meteor.userId(), {$set: {"profile.lastLocation": lastLocation, "profile.lastLocationTimestamp": (new Date()).getTime()}});
	},
})