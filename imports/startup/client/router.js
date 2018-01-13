Router.configure({
layoutTemplate: 'layout',
loadingTemplate: 'loading'
}
);



Router.route('/intro', {
  layoutTemplate: 'loginLayout'
});



Router.route('/newuser/:_id', {
  layoutTemplate: 'loginLayout',
name: 'newuser',
data: function() { var id = this.params._id; }

});



Router.route('/viewalert/:_id', {
name: 'viewalert',
data: function() {       var userID = this.params._id; }

});

Router.route('/bigbrotheruser/:_id', {
name: 'bigbrotheruser',
data: function() {       var userID = this.params._id; }

});

Router.route('/viewbroadcast/:_id', {
name: 'viewbroadcast',
data: function() {       var userID = this.params._id; }

});

Router.route('/', {name: 'dashboard'});
Router.route('/alerts', {name: 'alerts'});
Router.route('/license', {name: 'license'});
Router.route('/createbroadcast', {name: 'createbroadcast'});
Router.route('/broadcasts', {name: 'broadcasts'});
Router.route('/createuser', {name: 'createuser'});
Router.route('/bigbrother', {name: 'bigbrother'});
Router.route('/refers', {name: 'refers'});
Router.route('/broadcastintelligence', {name: 'broadcastintelligence'});
Router.route('/alertintelligence', {name: 'alertintelligence'});
Router.route('/userintelligence', {name: 'userintelligence'});
Router.route('/heatmaps', {name: 'heatmaps'});
Router.route('/events', {name: 'events'});
Router.route('/users', {name: 'users'});
Router.route('/activity', {name: 'activity'});
Router.route('/reports', {name: 'reports'});
Router.route('/analytics', {name: 'analytics'});
Router.route('/polyline', {name: 'polyline'});
Router.route('/createorg');
Router.route('/organisations');
Router.route('/editorg/:_id', {
  name: 'editorg',
data: function() {       var orgID = this.params._id; }

});



Router.route('/userprofile/:_id', {
name: 'userprofile',
data: function() {       var userID = this.params._id; }

});


  loginRequired = function() {
      if (!Meteor.user()) {
          if (!Meteor.userId()) {
              this.layout('loginLayout');
              this.render('login');
          }
      } else {

          this.next();
      }
  };

  Router.onBeforeAction(loginRequired, {
      except: ['login', 'newuser']
  });

