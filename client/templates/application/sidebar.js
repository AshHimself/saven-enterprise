Template.sidebar.events({
    'click #signOut': function(e) {
        e.preventDefault();

        Meteor.logout();

    }

});


Template.sidebar.helpers({
    version: function() {

        return savenEnterpriseVersion;
    },


    profile: function() {

        return Meteor.user().profile;
    }

});



