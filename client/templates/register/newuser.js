import 'materialize-autocomplete';

Template.newuser.created = function() {
    this.subscribe('organisationsByID', Router.current().params._id, {
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: organisationsByID ready or changed");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: organisationsByID error", arguments);
            }
        }
    });
};


Template.newuser.onRendered(function() {

    $('#suburb').materialize_autocomplete({
        limit: 20,
        dropdown: {
            className: 'autocomplete-content dropdown-content'
        },
        onSelect: function(item) {

            var postcode = item.id.split('-')[0];
            $('#postcode').val(postcode)
        },
        getData: function(value, callback) {
            var href = Meteor.absoluteUrl() + 'suburbs/' + value;
            if (value.length > 3) {
                $.getJSON(href)
                    .done(function(data) {
                      var data = data.map(function(x) {
                          var new_text = camelize(x.text)
                          var array = {
                              id: x.id,
                              text: new_text
                          }
                          return array
                      })
                        callback(value, data);

                    })
                    .fail(function() {
                        callback(value, [{
                            'id': 1,
                            'text': "Post Code not found, please provide a suburb"
                        }]);
                    });
            }
        }
    });

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


Template.newuser.events({
    'click .signUp': function(event, template) {
        event.preventDefault();
        if ($("form").valid()) {

              var organisation = Organisations.findOne({}, {
      fields: {
          'organisation': 1
      }
  });
            //
            var email = $('#email').val();
            var password = $('#password').val();
            var fullname = $('#fullname').val();
            var suburb = $('#suburb').val();
            var type = $('#type').prop('checked')
            var referCode = $('#referCode').val();
            var postcode = $('#postcode').val();
            var organisation = organisation.organisation

            if (type) {
                var userType = 'g'
            } else {
                var userType = 'u'
            }

            var data = {
                email: email,
                password: password,
                profile: {
                    type: userType,
                    suburb: suburb,
                    postcode: postcode,
                    fullname: fullname,
                    referalCode: referCode,
                    organisation: organisation
                }
            }


            Meteor.call('userCreate', data, function(error, result) {
                if (!error) {

                    alert('user created')
                   // Router.go('download')
                } else {
                    console.log('error creating user')
                }
            });
        }

    }
});
