Template.createorg.onRendered(function() {

    $("form").validate({
        errorClass: 'invalid',
        errorPlacement: function(error, element) {
            $(element)
                .closest("form")
                .find("label[for='" + element.attr("id") + "']")
                .attr('data-error', error.text());
        }
    });
});


Template.createorg.events({
        'keyup #organisation': function(e) {
        $('#organisation').val($('#organisation').val().replace(/ +?/g, ''));
    },
    'click button': function(event, template) {
        event.preventDefault();
        if ($("form").valid()) {
            //
            var organisation = $('#organisation').val().toLowerCase();
            var licensedTo = $('#licensedTo').val();
            var broadcastLicense = $('#broadcastLicense').prop('checked')
            var alertLicense = $('#alertLicense').prop('checked')
            var adminLicense = $('#adminLicense').prop('checked')


            var data = {
                organisation: organisation,
                licensedTo: licensedTo,
                license: {
                    broadcast: broadcastLicense,
                    alert: alertLicense,
                    admin: adminLicense,
                },
                createdDate: new Date(),
                lastModified: new Date()
            }

                 var insertOrganisation =  Organisations.insert(data);
                 Router.go('/editorg/'+insertOrganisation)
        }

    }
});