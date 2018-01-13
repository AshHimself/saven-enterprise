Saven = (function() {
    var api = {};

    api.debug = function(message) {

      if (Meteor.settings.public.enviroment == 'development'){

        console.log(message)

      }

    };

    //activityLog
    api.logger = function(message,event,redirect,organisation) {

      Meteor.call ('savenlogger', message, event, redirect,organisation);

    };


    return api;
}());
