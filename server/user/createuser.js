Meteor.methods({
  userCreate: function(data) {
    Accounts.createUser(data);
  }
})
