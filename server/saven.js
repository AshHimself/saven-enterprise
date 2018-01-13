// EVENTS TO USE //
// userLogin
// userLogout
// backgroundLocationUpdate
// notification



Meteor.methods({
    'savenlogger': function(message,event,redirect,organisation) {

      Savenlogger.insert({
          user_id: this.userId,
          event: event,
          message: message,
          organisation: organisation,
          redirect: redirect,
          dateTime: new Date()
      });

    }

  });
