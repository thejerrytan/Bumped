Router.route('/', {
  name : "landingpage",
  template: "landingpage"
});

//Router.route('/friends', function () {
//  this.render('friends');
//});

Router.route('/home', {
  name: "home"
  //onBeforeAction: function () {
  //    if(Meteor.userId()){
  //        Router.go('overview');
  //    } else {
  //        this.next();
  //    }
  //}
});

Router.route('/friends', {
  name: "friends",
  template:"friends",
  //controller: LoginControllerDasbhoard,
  waitOn: function () {
    //Meteor.subscribe('campaignsOverview', Meteor.userId());
    //Meteor.subscribe('')
  },
  //onRun: sidebarActive("overview")
});