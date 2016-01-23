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
        Meteor.call("fb.getFriendsData", function(err, data){
            result = data;
            var friends = [];
            for(i=0; i < result.data.length;i++){
                friends.push({
                    "fb_id"  : result.data[i].id,
                    "name"   : result.data[i].name,
                    "status" : "neutral",
                    "profile_picture_url" : "https://graph.facebook.com/v2.5/" + result.data[i].id + "/picture?height=100&width=100"
                });
            }
            Meteor.users.update(Meteor.userId(), {$set: {"profile.friends" : friends }});
        });
    },
    "fb.updateUserProfile" : function() {
        Meteor.call("fb.getUserData", function(err, data){
            var fb_id = data.id;
            var profile_picture_url = "https://graph.api.facebook/v2.5/" + data.id + "/picture?height=40&width=40";
            Meteor.users.update(Meteor.userId(), {$set: {"profile.profile_picture_url" : profile_picture_url, "profile.fb_id" : fb_id }});
        });
    }
});
