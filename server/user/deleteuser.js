
Meteor.methods({
    'deleteUser': function(data) {
        var user = Meteor.user();
        var fullname = Meteor.user().profile.fullname;
        var userId = data._id;
        var organisation = Userfields.findOne({user_id:this.userId},{fields: {'organisation': 1}});

        if (user && (user.isAdmin === true)) {

        	//Delete records
        	Meteor.users.remove({'_id':userId});
        	Locations.remove({'id':userId});
            Userfields.remove({'user_id':userId});
            Refers.remove({'user_id':userId});
            Broadcasts.remove({'user_id':userId});
            Acitivity.remove({'user_id':userId});
            Push.appCollection.remove({'userId':userId});
        

        //Saven Logger
        var message = fullname + ' deleted the user '+ data.fullname;
        var event = 'userDeleteEvent'
        var redirect = '/users';
        var organisation = organisation;

        Meteor.call('savenlogger', message, event, redirect, organisation);

        } else {
            throw new Meteor.Error(403, 'Forbidden');
        }
    }
});