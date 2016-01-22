Meteor.methods({
    //TODO: Bad hack.
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
	getFriendsData: function() {    
	    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
	    var data = fb.getFriendsData();
	    return data;
	}
});