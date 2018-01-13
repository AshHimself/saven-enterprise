Template.debug.helpers({
  debugProfile: function() {


    var debugProfile =  Userfields.findOne({user_id: Meteor.userId()});
    return debugProfile;
  },

});
