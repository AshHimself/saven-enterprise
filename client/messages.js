var isodate = new Date().toISOString()


Template.header.helpers({
    //Open modal of user doesn't complete duress in x period of times
    messagesToast: function() {
      var messages = Messages.findOne({
          user_id: Meteor.userId()
      });

      if(messages){
        Materialize.toast(messages.message, 5000,null,  function(){Messages.remove({_id:messages._id});
        })
      }

    }
});
