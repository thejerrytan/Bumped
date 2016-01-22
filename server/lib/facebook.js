// Facebook SDK built on top of NPM package 'fbgraph'
Facebook = function (accessToken) {
    this.fb = Meteor.npmRequire('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Async.runSync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me');
}

Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends?fields=name,picture,email,id');
}

Facebook.prototype.getProfilePicture = function(userid, height, width) {
    return this.query('/' + userid + '/picture?height=' + height + '&width=' + width)
}