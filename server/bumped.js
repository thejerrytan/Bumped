var _ = lodash;

Meteor.methods({
	"Debug.test" : function(phoneVariable){
		// console.log(phoneVariable);
		Meteor.users.remove({});
	},
	"Bumped.updateLocation" : function(lastLocation){
		console.log(lastLocation);
		Meteor.users.update(Meteor.userId(), {$set: {"profile.lastLocation": lastLocation, "profile.lastLocationTimestamp": (new Date()).getTime()}});
	},
	"Bumped.changeToNeutral" : function(fb_id){
		var friend_list = Meteor.user().profile;
		var new_friend_list = [];
		for(var i=0;i<friend_list.friends.length;i++) {
			if(friend_list.friends[i].fb_id==fb_id) {
				friend_list.friends[i].status = "neutral";
			}
			new_friend_list.push(friend_list.friends[i]);
		}
		Meteor.users.update(Meteor.userId(), {$set: {"profile.friends" : new_friend_list}});
	},
	"Bumped.changeToAvoid" : function(fb_id){
		var friend_list = Meteor.user().profile;
		var new_friend_list = [];
		for(var i=0;i<friend_list.friends.length;i++) {
			if(friend_list.friends[i].fb_id==fb_id) {
				friend_list.friends[i].status = "avoid";
			}
			new_friend_list.push(friend_list.friends[i]);
		}
		Meteor.users.update(Meteor.userId(), {$set: {"profile.friends" : new_friend_list}});
	},
	"Bumped.changeToMeet" : function(fb_id){
		var friend_list = Meteor.user().profile;
		var new_friend_list = [];
		for(var i=0;i<friend_list.friends.length;i++) {
			if(friend_list.friends[i].fb_id==fb_id) {
				friend_list.friends[i].status = "meet";
			}
			new_friend_list.push(friend_list.friends[i]);
		}
		Meteor.users.update(Meteor.userId(), {$set: {"profile.friends" : new_friend_list}});
	}
})