Template.friends.helpers({
	load : function() {
		Meteor.call('fb.getUserData', function(err, data) {
			console.log(data);
		});
	}
})