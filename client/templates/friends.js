Template.friends.helpers({
	getFriends : function() {
		var result = Meteor.call('getFriendsData', function(err, data){
			console.log(data);
		});
		console.log(result);
		return result.data;
	},
	getProfilePicture : function(userid) {
		Meteor.call('getProfilePicture', userid, 100, 100, function(err, data){
			console.log(data);
		});
	}
})