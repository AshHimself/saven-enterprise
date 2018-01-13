Template.adminuser.onCreated(function() {

    this.subscribe('allUsers');

});


Template.adminuser.events({
    'click #location': function(e) {
        e.preventDefault();
        var latLng = Location.getReactivePosition();
        Location.startWatching(function(pos) {
            console.log("Got a position!", pos);
        }, function(err) {
            console.log("Oops! There was an error", err);
        });
    }
});

Template.adminuser.helpers({
    userdata: function() {
        var userdata = Meteor.users.find({},{$sort: {_id: -1}});
        return userdata;
    }
});

Template.adminuser.helpers({
    settings: function() {
        return {

            rowsPerPage: 100,
            showFilter: true,
            fields: [{
                    key: 'profile.fullname',
                    label: 'Full Name',
                },
                {
                    key: 'type',
                    label: 'Guardian',
                    fn: function(value, object, key) { if (value === "g") { return "Yes" } else { return "No" } }
                },

                {
                    key: 'createdAt',
                    label: 'Created',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }

                },
                {
                    key: 'createdAt',
                    label: 'Created',
                    hidden: true,
                    sortOrder: 0, sortDirection: 'descending'
                },
                {
                    key: 'emails.0.address',
                    label: 'Email'

                },
                {
                    key: 'profile.suburb',
                    label: 'Suburb',
                    fn: function(value, object, key) { return camelize(value); }

                },
                                   {
                       key: 'profile.statistics.latestVersion',
                       label: 'App Version',
                      // fn: function (value, object, key) { if(value){return "Yes"}else{return "No"} }
                   },
                {
                    key: 'edit',
                    class: 'edit',
                    label: '',
                    fn: function(value) {
                        return 'Edit'
                    }

                },
                {
                    key: 'delete',
                    class: 'delete',
                    label: '',
                    fn: function(value) {
                        return 'Delete'
                    }

                },



            ]
        };
    }
});

Template.adminuser.events({
    'click .reactive-table tbody tr': function(event) {
        event.preventDefault();
        var user = this;

        if (event.target.className != "delete") {
            Router.go("/userprofile/" + user._id);
        }


    }
});

Template.adminuser.events({
    'click .reactive-table tbody tr': function(event) {
        event.preventDefault();

        // checks if the actual clicked element has the class `delete`
        if (event.target.className === "delete") {

            Meteor.call('deleteUser', this, function(error, result) {
                if (!error) {
                    swal({
                        title: "Deleted!",
                        text: camelize(this.fullname) + " has been deleted",
                        type: "success",
                        timer: 2000
                    });
                } else {
                    console.error(error)
                }
            });

        } else if (event.target.className === "edit") {

            Router.go('/adminuser_edit/' + this._id)


        }
    }
});

Template.adminuser.helpers({
    alluserfields: function() {


        var userfields = Userfields.find({});


        return userfields;
    }
});