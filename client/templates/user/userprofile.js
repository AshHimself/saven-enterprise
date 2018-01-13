/*
userprofile
*/

Template.activityTab.onCreated(function() {

    var user_id = Router.current().params._id;

    this.subscribe('savenLoggerByUser', user_id,{
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: savenLoggerByUser ready");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: savenLoggerByUser error", arguments);
            }
        }
    });

});

Template.userprofile.onCreated(function() {

    var user_id = Router.current().params._id;

    this.subscribe('userByID', user_id,{
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: userByID ready");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: userByID error", arguments);
            }
        }
    });

});

Template.alertsTab.onCreated(function() {

    this.subscribe('locationsByUser', Router.current().params._id, {
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: locationsByUser ready");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: locationsByUser error", arguments);
            }
        }
    });



});


Template.userprofile.onRendered(function() {
    $('ul.tabs').tabs();
});

Template.userprofile.helpers({
    user_id: function(){

        return Router.current().params._id;

    },
    user: function() {

        var user_id = Router.current().params._id;

        var user = Meteor.users.findOne({
            _id: user_id
        });
        console.log(user)
        return user;
    },

    userprofile: function() {

        var user_id = Router.current().params._id;

        var userprofile = Userfields.findOne({
            user_id: user_id
        });
        return userprofile;
    },
    userType: function() {

        var user_id = Router.current().params._id;


        var userprofile = Userfields.findOne({
            user_id: user_id
        });

        if (userprofile.type == 'g') {
            return 'Guardian';
        } else {
            return 'User';
        }

    }
});

/*
broadcastsTab
*/
Template.broadcastsTab.helpers({
    broadcasts: function() {

        var user_id = Router.current().params._id;

        var broadcasts = Broadcasts.find({
            user_id: user_id
        });
        return broadcasts;
    },
    settings: function() {
        return {
            showNavigation: 'auto',
            rowsPerPage: 10,
            showFilter: false,
            noDataTmpl: 'noDataTmpl',
            fields: [{
                    key: 'reportType',
                    label: 'Type',
                },
                {
                    key: 'content',
                    label: 'Message',
                },
                {
                    key: 'priority',
                    label: 'Priority',
                    fn: function(value, object, key) { if (value) { return "Yes" } else { return "No" } }

                },
                {
                    key: 'suburb',
                    label: 'Suburb',
                    fn: function(value, object, key) { return camelize(value) }

                }, ,
                {
                    key: 'createDateTime',
                    label: 'Date / Time',
                    sortOrder: 0,
                    sortDirection: 'descending',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }

                },


            ]
        };
    },
});

Template.broadcastsTab.events({
    'click tbody tr': function(e) {
        e.preventDefault();

        Router.go('/viewbroadcast/' + this._id)

    }
});

/*
activityTab
*/
Template.activityTab.helpers({
    activityFeed: function() {

        var user_id = Router.current().params._id;

        var activityFeed = Savenlogger.find({
            user_id: user_id
        }, { skip: 0, sort: { dateTime: -1 } });


        return activityFeed;

    },
    settings: function() {
        return {
            showNavigation: 'auto',
            rowsPerPage: 10,
            showFilter: false,
            noDataTmpl: 'noDataTmpl',
            fields: [{
                    key: 'message',
                    label: 'Event',
                },
                {
                    key: 'dateTime',
                    label: 'Date / Time',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }

                },



            ]
        };
    },
});

Template.activityTab.events({
    'click .feed-item': function(e) {
        e.preventDefault();

        Router.go(this.redirect)

    }

});


/*
broadcastsTab
*/
Template.alertsTab.helpers({
    alerts: function() {

        var user_id = Router.current().params._id;

        var alerts = Locations.find({
            user_id: user_id,
            eventType: 'initialDuressRequest'
        });
        return alerts;
    },
    settings: function() {
        return {
            showNavigation: 'auto',
            rowsPerPage: 10,
            showFilter: false,
            noDataTmpl: 'noDataTmpl',
            fields: [{
                    key: 'status',
                    label: 'Alert Outcome',
                    fn: function(value, object, key) { return camelize(value) }

                },
                {
                    key: 'dateTime',
                    label: 'Date Created',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }

                }


            ]
        };
    },
});

Template.alertsTab.events({
    'click tbody tr': function(e) {
        e.preventDefault();

        Router.go('/viewalert/' + this._id)

    }
});