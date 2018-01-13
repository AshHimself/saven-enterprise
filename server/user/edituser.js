Meteor.methods({
    'editUser': function(data) {
        var user = Meteor.user();
       // var organisation = Userfields.findOne({ user_id: this.userId }, { fields: { 'organisation': 1 } });

        if (user && (user.isAdmin === true)) {

            Meteor.users.update(data.user_id, {
                $set: {
                	'profile.type':data.type,
                	'profile.suburb': data.suburb,
                	'profile.postcode': data.postcode,
                	'profile.fullname': data.fullname,
                	'profile.organisation': data.organisation,
                	'emails.0.address': data.email
                }
            });

            Userfields.update({'user_id': data.user_id}, {
                $set: {
                	'type':data.type,
                	'suburb': data.suburb,
                	'postcode': data.postcode,
                	'fullname': data.fullname,
                	'organisation': data.organisation
                }
            });

    //Saven Logger
    var message = user.profile.fullname + ' updated the user ' + data.fullname;
    var event = 'userEditEvent'
    var redirect = '/adminuser_edit/'+data.user_id;
    var organisation = organisation;

    Meteor.call('savenlogger', message, event, redirect, organisation);

}
else {
    throw new Meteor.Error(403, 'Forbidden');
}
}
});