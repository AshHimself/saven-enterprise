Template.login.events({
    'click #at-signUp': function(event) {
        event.preventDefault();

        Meteor.setTimeout(function() {

          $('#at-field-suburb').materialize_autocomplete({
              limit: 20,
              dropdown: {
                  className: 'autocomplete-content dropdown-content'
              },
              onSelect: function(item) {

                if(postcode){
                  var postcode = item.id.split('-')[0];
                  $('#at-field-postcode').val(postcode)
                }
              },
              getData: function(value, callback) {
                  var href = Meteor.absoluteUrl()+'suburbs/' + value;
                  if(value.length>3){
                  $.getJSON(href)
                      .done(function(data) {
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
            // $('#at-field-suburb').autocomplete({
            //     data: {
            //         'Aubin Grove': null,
            //         'Banjup': null,
            //         'Beaconsfield': null,
            //         'Beeliar': null,
            //         'Bibra Lake': null,
            //         'Cockburn Central': null,
            //         'Coogee': null,
            //         'Coolbellup': null,
            //         'East Fremantle': null,
            //         'Fremantle': null,
            //         'Hamilton Hill': null,
            //         'Hammond Park': null,
            //         'Henderson': null,
            //         'Hilton': null,
            //         'Jandakot': null,
            //         'Kardinya': null,
            //         'Leeming': null,
            //         'Munster': null,
            //         'North Coogee': null,
            //         'North Fremantle': null,
            //         'North Lake': null,
            //         'O\'Connor': null,
            //         'Palmyra': null,
            //         'Samson': null,
            //         'South Fremantle': null,
            //         'South Lake': null,
            //         'Spearwood': null,
            //         'Success': null,
            //         'Treeby': null,
            //         'Wattleup': null,
            //         'White Gum Valley': null,
            //         'Yangebup': null,
            //     },
            //     limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            // });

        }.bind(this), 1000);

    },

});

Accounts.onLogin(function(options) {
  var message = Profile.fullname() + ' logged in';
  var event = 'userLogin';
  var redirect = '/users';
  var organisation = Profile.profileOrganisation();
if(Profile.fullname()){
  Meteor.call ('savenlogger', message, event, redirect,organisation);
}
  //generate random refer code

  $('body').particleground('destroy');

  function makeid()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

//If refer code does not exist, create one.
if(!Profile.profileID()){
  Userfields.update({
      _id: Profile.profileID(),
  }, {
      $set: {
          referCode: makeid(),

      }
  });

}
});

//Stop monitoring location when the user is not longer authenticated
Accounts.onLogout(function() {

    if (debug) {
        console.log('ACCOUNTS-UI: - User Logged out')
    }
    Location.stopWatching();


      $('body').particleground({
          dotColor: '#5a5d70',
          lineColor: '#3F414D',
          minSpeedX:0.1,
          minSpeedY:0.1,
          maxSpeedX:0.1,
          maxSpeedY:0.1,
          proximity:100
      });

});

Accounts.onLoginFailure(function(error) {
    if (debug) {
        console.log('ACCOUNTS-UI: - Login Failure',error);
    }

    $("#at-btn").removeClass("disabled");
    if (LoginbuttonValue) {
        $("#at-btn").html(LoginbuttonValue);
    }
    $(".preloader-wrapper").toggle();
});

//Additional fields on signup


AccountsTemplates.addField({
    _id: 'fullname',
    type: 'text',
    displayName: "Full Name",
    required: true,
});

AccountsTemplates.addField({
    _id: 'suburb',
    type: 'text',
    displayName: "Post Code",
    required: true,
});
AccountsTemplates.addField({
    _id: 'postcode',
    type: 'hidden',
    required: false,
});

AccountsTemplates.addField({
    _id: "type",
    type: "checkbox",
    displayName: "Do you want to be a Guardian?",
});
