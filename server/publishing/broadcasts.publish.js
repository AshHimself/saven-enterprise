Meteor.publish("broadcasts", function() {
    var organisation = Meteor.user().profile.organisation;
    if(organisation=='administrator'){
      return Broadcasts.find({reportType:{$ne:'Burglary (Sample)'}});
    }else{
      return Broadcasts.find({
          organisation: organisation,reportType:{$ne:'Burglary (Sample)'}
      });
    }
  });

Meteor.publish('broadcastHeatmap', function() {
  var organisation = Meteor.user().profile.organisation;
    return Broadcasts.find({
        organisation: organisation,reportType:{$ne:'Burglary (Sample)'}
    },{fields: {'images': 0,'sentTo': 0}});
});


Meteor.publish('messagesByBroadcast', function(broadcastID) {
if (this.userId) {
console.log(broadcastID)
return Messages.find({source_id:broadcastID});

}
});