Template.createbroadcast.onCreated(function() {
    this.subscribe("precincts");

});

Template.createbroadcast.helpers({
    getPrecincts: function() {
      var precincts = Precincts.find({});
var precinctsCount = Precincts.find({}).count();
        if(precinctsCount){
$('select').material_select();
      }

      return precincts;
    }
});


AutoForm.addHooks(['insertBroadcastform'], {

    before: {
        insert: function(doc) {
            console.log(doc)
            doc.fullname = Profile.fullname();
            doc.organisation = Profile.profileOrganisation();
            doc.precincts = $('#orgPrecincts').val();
            doc.priority = $('#priority').prop('checked');
            doc.createDateTime = new Date();

            // var getLatLng = Suburbs.find({"field":value});



            this.result(doc)

        }
    },
    onSuccess: function(operation, result, template) {
        swal({
                title: "Success!",
                text: "Your broadcast has been sent!",
                type: "success",
                timer: 3000
            },
            function() {

                Router.go('/broadcasts');

            });

        var message = Profile.fullname() + ' just sent a broadcast'
        var event = 'broadcastActivityEvent'
        var redirect = '/viewbroadcast/' + result
        var organisation = Profile.profileOrganisation();

        Meteor.call('savenlogger', message, event, redirect, organisation);

        if (Profile.suburb()) {

            var sendBroadcastBody = {
                suburb: Profile.suburb(),
                userId: Meteor.userId(),
                fullname: Profile.fullname(),
                createDateTime: new Date(),
                broadcoastId: result
            }

            //  Meteor.call('sendBroadcast', sendBroadcastBody);

        } else {
            console.error('sendBroadcast failed, no post code found');
        }
    }
});

Template.createbroadcast.onRendered(function() {
    $('#headerText').html('Broadcast');
    $('select').material_select();

    $('#precincts').material_chip({
        data: [{
                tag: 'Cappuccino Strip',
            }, {
                tag: 'City Central',
            }, {
                tag: 'Fishing Boat Harbour',
            },
            {
                tag: 'Victoria Quay',
            }, {
                tag: 'West End',
            }
        ],
        autocompleteOptions: {
            data: {
                'Cappuccino Strip': null,
                'City Central': null,
                'Fishing Boat Harbour': null,
                'Victoria Quay': null,
                'West End': null
            },
            limit: Infinity,
            minLength: 1
        }
    });

});

Template.createbroadcast.events({
    'keyup #images': function(event) {
        event.preventDefault();
        $('#imagesBox').toggle();

    },


    'click #precinctBtn': function(event) {
        event.preventDefault();
        $('#imagesBox').toggle();

    }
});
