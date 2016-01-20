Template.friends.helpers({
	load : function() {
		Meteor.call('getFriendsData', function(err, data) {
			console.log(data);
		});
	}
})