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
            console.log(result);
            for(i=0; i < result.data.length;i++){
                picture_obj = EJSON.stringify(result.data[i]);
                console.log(picture_obj.picture);
                friends.push({
                    "fb_id" : result.data[i].id,
                    "name"  : result.data[i].name,
                    "profile_picture_url" : result.data[i].picture.data.url
                });
            }
            Meteor.users.update(Meteor.userId(), {$set: {"friends" : friends }});
        });
    }
});
