Template.adminUserEdit.onCreated( function() {

this.subscribe('allUsers');

});


Template.adminUserEdit.helpers({
    organisations: function(){

var organisations = _.uniq(Organisations.find({}, {sort: {organisation:1}, fields: {organisation:true}}).fetch().map(function(x) {
 return camelize(x.organisation);
 }), true);

if(organisations){
    $('select').material_select();
}
 return organisations;

    },

    userfields: function() {

        var user_id = Router.current().params._id;

        return Userfields.findOne({ user_id: user_id });

    },
    user: function() {

        var user_id = Router.current().params._id;
        return Meteor.users.findOne({ _id: user_id });

    }
});

Template.adminUserEdit.onRendered(function() {

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

    //     $('#organisation').materialize_autocomplete({
    //     limit: 20,
    //     dropdown: {
    //         className: 'autocomplete-content dropdown-content'
    //     },

    //     getData: function(value, callback) {
    //         var href = Meteor.absoluteUrl() + 'organisations/' + value;
    //         if (value.length > 1) {
    //             $.getJSON(href)
    //                 .done(function(data) {
    //                     console.log(data)
    //                     var data = data.map(function(x) {
    //                         var new_text = camelize(x.organisation)
    //                         var array = {
    //                             id: x._id,
    //                             organisation: new_text
    //                         }
    //                         return array
    //                     })
    //                     callback(value, data);
    //                 })
    //                 .fail(function() {
    //                     callback(value, [{
    //                         'id': 1,
    //                         'text': "Organisation not found"
    //                     }]);
    //                 });
    //         }
    //     }
    // });

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

Template.adminUserEdit.events({
        'click .submitForm': function(event, template) {
            event.preventDefault();

            if($('#type').prop('checked')){
                var type = 'g';
            }else{
                var type = 'u';
            }

            var data = {
             user_id:  Router.current().params._id,
             email:  $('#email').val(),
             fullname: $('#fullname').val(),
             suburb: $('#suburb').val().toLowerCase(),
             postcode: $('#postcode').val(),
             organisation: $('#organisation').val().toLowerCase(),
             type: type

            }

            Meteor.call('editUser',data);

            Meteor.call('editUser', data, function(error, result) {
    
    if(!error){
                     swal({
                            title: "Updated!",
                            text: camelize(data.fullname) + " has been updated",
                            type: "success",
                            timer: 2000
                        });
    }else{
      console.error(error)
    }
});
        }
    
});

Template.adminUserEdit.onRendered(function() {
    //This is fixing a text overlap issue in MaterlizeCSS for input values which already have a value.
    //https://github.com/Dogfalo/materialize/issues/180



    setTimeout(function() { 
        $('.input-field label').addClass('active'); 
        $('select').material_select();

    }, 2);

});