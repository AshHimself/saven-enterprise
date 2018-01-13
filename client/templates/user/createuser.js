import 'materialize-autocomplete';

Template.createuser.helpers({
    referCode: function() {
        return Router.current().params._code;
    }
});

Template.createuser.onRendered(function() {


    function in_progress_callback(data) {
        console.log('in progress', data)
    }

    function success_callback(data) {
    console.log(data)

        if (data && !data.is_valid) {

var didYouMean = '';

if (data && data.did_you_mean){
    var didYouMean = ', Did you mean ' + data.did_you_mean;
}
            // var validator = $('#createUserForm').validate();
            // validator.showErrors({
            //     "email": "Please enter a valid email address" + didYouMean
            // });
        }
    }

    function validation_error(data) {
        var validationError = data;
               
               console.log(data)
            // var validator = $('#createUserForm').validate();
            // validator.showErrors({
            //     "email": validationError
            // });
    
    }
  jQuery.validator.addMethod('mailgun', function (value, element, api_key) {
    var preflight_result = jQuery.run_mailgun_validator(value, {
        api_key: api_key,
         success: success_callback,
        error: validation_error,
         in_progress: in_progress_callback,
        validator: this
     }, element);

    return typeof preflight_result === "undefined" ? "pending" : preflight_result;
});

    Meteor.setTimeout(function() {

        // $('#email').mailgun_validator({
        //     api_key: 'pubkey-a4917fb19d8bffff4a67ac2ff2612752',
        //     in_progress: in_progress_callback, // called when request is made to validator
        //     success: success_callback, // called when validator has returned
        //     error: validation_error, // called when an error reaching the validator has occured
        // });

        $('select').material_select();
        googleplaces('suburb', 'postcode');

    }.bind(this), 1000);

    Meteor.setTimeout(function() {

        $('select').material_select();
        Materialize.updateTextFields();
    }.bind(this), 1100);

    $("#createUserForm").validate({
             rules: {
         email: {
             required: true,
             mailgun: 'pubkey-a4917fb19d8bffff4a67ac2ff2612752',
         }
     },
     messages: {
         email: {
             required: "Please enter your email address.",
             mailgun: "Please enter a valid email address."
         }
     },
        errorClass: 'invalid',
        
        errorPlacement: function(error, element) {
            $(element)
                .closest("form")
                .find("label[for='" + element.attr("id") + "']")
                .attr('data-error', error.text());
        }
    });
});


Template.createuser.events({
    'click .createUser': function(event, template) {
        event.preventDefault();
        if ($("form").valid()) {
            //
            var email = $('#email').val();
            var password = $('#password').val();
            var fullname = $('#fullname').val();
            var suburb = $('#suburb').val();
            var type = $('#type').prop('checked')
            var referCode = $('#referCode').val();
            var postcode = $('#postcode').val();
            var role = $('#role').val();
            var organisation = Profile.profileOrganisation();

            if (type) {
                var userType = 'g'
            } else {
                var userType = 'u'
            }

            var data = {
                email: email,
                password: password,
                profile: {
                    role: role,
                    organisation: organisation,
                    type: userType,
                    suburb: suburb,
                    postcode: postcode,
                    fullname: fullname,
                    referalCode: referCode
                }
            }


            Meteor.call('userCreate', data, function(error, result) {
                if (!error) {
                    var message = Profile.fullname() + ' created ' + camelize(fullname) + ' as a new user';
                    var event = 'userCreated';
                    var redirect = '/users';
                    var organisation = Profile.profileOrganisation();

                    Meteor.call('savenlogger', message, event, redirect, organisation);

                    swal({
                            title: "Success!",
                            text: camelize(fullname) + " has been created",
                            type: "success",
                            timer: 3000
                        },
                        function() {

                            Router.go('/users')

                        });

                } else {
                    console.log('error creating user')
                }
            });
        }

    }
});