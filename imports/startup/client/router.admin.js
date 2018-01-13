Router.route('/adminuser', {name: 'adminuser'});

Router.route('/adminuser_edit/:_id', {
name: 'adminUserEdit',
data: function() {       var userID = this.params._id; }
});
