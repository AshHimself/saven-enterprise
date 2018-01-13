Meteor.methods({
    getBroadcastsMethod: function(data) {

        if (Meteor.user().profile.organisation == 'administrator') {
            var query = {
                "loc": { $exists: true},
            }
        } else {
            var query = {
                "loc": { $exists: true},
                organisation: Meteor.user().profile.organisation
            }
        }



        return Broadcasts.find(query, {
            fields: {
                'images': 0,
                'sentTo': 0
            }
        }).fetch();


    }
});
