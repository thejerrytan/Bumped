Meteor.methods({
    //TODO: Bad hack.
    "fb.getUserData": function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
	"fb.getFriendsData": function() {
	    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
	    var data = fb.getFriendsData();
	    return data;
	}
});