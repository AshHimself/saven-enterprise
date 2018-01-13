Template.organisations.helpers({
    settings: function() {
        return {
            showNavigation: 'auto',
            noDataTmpl: 'noDataTmpl',
            rowsPerPage: 10,
            showFilter: true,
            fields: [{
                    key: 'organisation',
                    label: 'Organisation',
                },
                {
                    key: 'license.broadcast',
                    label: 'Broadcast License'

                },
                {
                    key: 'license.alert',
                    label: 'Alert License'

                },
                {
                    key: 'createdDate',
                    label: 'Created',
                    sortOrder: 0,
                    sortDirection: 'descending',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }
                },
{
                    key: 'lastModified',
                    label: 'Last Modified',
                    sortOrder: 0,
                    sortDirection: 'descending',
                    fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }


                }

            ]
        };
    },

    organisations: function() {
        var organisations = Organisations.find({});
        return organisations;
    }


});

Template.organisations.events({
    'click .reactive-table tbody tr': function(event) {
        event.preventDefault();
        Router.go("/editorg/" + this._id);

    },
    'click .download': function(event) {
        event.preventDefault();
        console.log('clicked')
        MyAppExporter.exportBroadcasts();


    },


});