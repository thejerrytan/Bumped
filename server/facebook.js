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
	},
    "fb.getProfilePicture" : function(userid, height, width) {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getProfilePicture(userid, height, width);
        return data;
    },
    "fb.loadFriends" : function() {
        var result;
        var bumped_friends = [];
        var friends = Meteor.user().profile.friends;
        friends.forEach(function(e){
            bumped_friends.push(e.fb_id);
        });
        Meteor.call("fb.getFriendsData", function(err, data){
            result = data;
            var new_friends = result.data.filter(function(e){
                if(bumped_friends.indexOf(e.id)==-1) {
                    return true;
                }
            });
            new_friends.forEach(function(e){
                friends.push({
                    "fb_id"  : e.id,
                    "name"   : e.name,
                    "status" : "neutral",
                    "profile_picture_url" : "https://graph.facebook.com/v2.5/" + e.id + "/picture?height=100&width=100"
                });
            });
            Meteor.users.update(Meteor.userId(), {$set: {"profile.friends" : friends }});
        });
    },
    "fb.updateUserProfile" : function() {
        Meteor.call("fb.getUserData", function(err, data){
            var fb_id = data.id;
            var profile_picture_url = "https://graph.facebook.com/v2.5/" + data.id + "/picture?height=25&width=25";
            Meteor.users.update(Meteor.userId(), {$set: {"profile.profile_picture_url" : profile_picture_url, "profile.fb_id" : fb_id }});
        });
    }
});
