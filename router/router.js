Router.route('/', {
  name : "landingpage",
  template: "landingpage",
  onBeforeAction: function () {
    if(Meteor.userId()){
      Router.go('home');
    } else {
      this.next();
    }
  }
});

//Router.route('/friends', function () {
//  this.render('friends');
//});

Router.route('/home', {
  name: "home",
  controller: LoginController,
});

Router.route('/friends', {
  name: "friends",
  template:"friends",
  controller: LoginController,
  //waitOn: function () {
    //Meteor.subscribe('campaignsOverview', Meteor.userId());
    //Meteor.subscribe('')
  //},
  //onRun: sidebarActive("overview")
});