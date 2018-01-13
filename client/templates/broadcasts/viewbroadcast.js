Template.viewbroadcast.onCreated( function(){
  var broadcastID = Router.current().params._id;
  this.documents = this.subscribe( 'returnBroadcast' , broadcastID);

    this.subscribe('messagesByBroadcast', broadcastID,{
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: messagesByBroadcast ready or changed");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: messagesByBroadcast error", arguments);
            }
        }
    });

});


Template.viewbroadcast.helpers({
    broadcast: function() {

        var broadcastID = Router.current().params._id;

        var returnBroadcast = Broadcasts.findOne({
            _id: broadcastID
        });

if(returnBroadcast){
                    Meteor.setTimeout(function() {

                $('.materialboxed').materialbox();

            }.bind(this), 500);

                  }

        return returnBroadcast

    },
    messages: function(){

      var query = Messages.find();
      var queryCount = query.count();

        return {data:query, count:queryCount}
    },
        broadcast: function() {

        var broadcastID = Router.current().params._id;

        var returnBroadcast = Broadcasts.findOne({
            _id: broadcastID
        });
        return returnBroadcast

    },
    imageCount: function() {

      var broadcastID = Router.current().params._id;

      var imageCount = Broadcasts.findOne({
          _id: broadcastID
      },{fields: {'images':1}});

      if(imageCount){
        var count = Object.keys(imageCount.images).length;
      }

      return count;

    },
    sentToCount: function() {

      var broadcastID = Router.current().params._id;

      var sentToCount = Broadcasts.findOne({
          _id: broadcastID
      },{fields: {'sentTo':1}});

      var count = Object.keys(sentToCount.images).length;


      return count;

    }
});



Template.viewbroadcast.events({
    'click #broadcastNo': function(event) {
        event.preventDefault();

        var broadcastID = Router.current().params._id;

        Meteor.call('broadcastConfirmed', broadcastID, false, Meteor.userId());
        $( "#footer" ).toggle();
        Router.go('/');
        Materialize.toast('Thanks for helping!', 4000) // 4000 is the duration of the toast

    },

    'click #broadcastYes': function(event) {
        event.preventDefault();

        var broadcastID = Router.current().params._id;

        Meteor.call('broadcastConfirmed', broadcastID, true, Meteor.userId());
        $( "#footer" ).toggle();
        Router.go('/');
        Materialize.toast('Thanks for helping!', 4000) // 4000 is the duration of the toast

    },

});
