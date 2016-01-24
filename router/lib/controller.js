LoginController = RouteController.extend({
    onBeforeAction: function () {
        //if(!Meteor.user()) return this.render('landingpage');
        if(!Meteor.user()) return Router.go('landingpage');

        this.next();
    }
});