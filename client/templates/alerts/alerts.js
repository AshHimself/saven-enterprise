Template.alerts.created = function() {
    this.subscribe('alertsByOrganisation', {
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: broadcasts ready or changed");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: broadcasts error", arguments);
            }
        }
    });
};



Template.alerts.helpers({
    alerts: function() {

        var alerts = Locations.find(

            {
                eventType: 'initialDuressRequest'

            }
        );

        return alerts;
    },

    settings: function() {
        return {

            rowsPerPage: 100,
            showFilter: true,
            fields: [


                {
                    key: 'fullname',
                    label: 'Full Name',
                }, {
                    key: 'dateTime',
                    label: 'Alert Date',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }

                }, , {
                    key: 'status',
                    label: 'Status',
                    fn: function(value, object, key) { return camelize(value); }

                }


            ]
        };
    }
});


Template.alerts.events({
    'click .reactive-table tbody tr': function(event) {
        event.preventDefault();
        Router.go("/viewalert/" + this._id);

    }
});