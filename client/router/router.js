Router.route('/', function () {
  this.render('landingpage', {'name' : 'landingpage'});
});

Router.route('/friends', function () {
  this.render('friends', {'name' : 'friends'});
});