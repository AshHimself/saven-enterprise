//
/*DASHBOARD COUNTS */
//
Meteor.publish('totalBroadcasts', function() {
    var organisation = Meteor.user().profile.organisation;
  if(organisation!='administrator'){
    Counts.publish(this, 'totalBroadcasts', Broadcasts.find({
        organisation: organisation
    }));
  }else{
    Counts.publish(this, 'totalBroadcasts', Broadcasts.find({}));
    }
});

Meteor.publish('totalAlerts', function() {
    var organisation = Meteor.user().profile.organisation;
  if(organisation=='administrator'){
    Counts.publish(this, 'totalAlerts', Locations.find({eventType: 'initialDuressRequest'}));
  }else{
    Counts.publish(this, 'totalAlerts', Locations.find({eventType: 'initialDuressRequest',organisation:organisation}));
    }
});

// Meteor.publish('totalActiveUsers', function() {
//     var organisation = Meteor.user().profile.organisation;
//   if(organisation=='administrator'){
//      Counts.publish(this, 'totalActiveUsers', Savenlogger.find({$or: [{event: 'resumeEvent'},{event: 'loginEvent'}]}).distinct('user_id', true));
//     // Counts.publish(this, 'totalActiveUsers', Acitivity.aggregate([{$unwind:'$user_id'},{$group:{_id:'$user_id'}}]));
//   }else{
//     Counts.publish(this, 'totalActiveUsers', Locations.find({eventType: 'initialDuressRequest',organisation:organisation}));
//     }
// });



Meteor.publish('totalPriorityBroadcasts', function() {
  var organisation = Meteor.user().profile.organisation;
  if(organisation!='administrator'){
    Counts.publish(this, 'totalPriorityBroadcasts', Broadcasts.find({
        organisation: organisation,
        priority:true
    }));
  }else{
      Counts.publish(this, 'totalPriorityBroadcasts', Broadcasts.find({priority:true}));
    }
});

// Meteor.publish('totalActiveUsers', function(organisation) {

//     if (this.userId) {
// var organisation = Meteor.user().profile.organisation;

//   if(organisation=='administrator'){
//     return 
//   }else{
//         return Savenlogger.find({
//             organisation: organisation
//         });
//       }
//     } else {
//         this.ready();
//     }

// // "lastGPSUpdate": 
// //     {
// //         $gte: new Date((new Date().getTime() - (1 * 24 * 60 * 60 * 1000)))
// //     }

//     // Counts.publish(this, 'totalActiveUsers', Acitivity.aggregate([{$unwind:'$user_id'}, { $match: {organisation:'organisation'}},{$group:{_id:'$user_id'}}])

//   );
// });

Meteor.publish("orgByGps", function(long,lat){
  var organisation = Meteor.user().profile.organisation;
  Counts.publish(this, 'totalPriorityBroadcasts', Broadcasts.find({
      organisation: organisation,
      priority:true
  }));


});


Meteor.publish('userfields', function() {

    return Userfields.find({
        user_id: this.userId
    });
});

Meteor.publish('userByID', function(id) {

    return Meteor.users.find({
        _id: id
    });
});

Meteor.publish('allUsers', function() {

    return Meteor.users.find({});
});

Meteor.publish('locations', function() {
    return Locations.find({});
});

Meteor.publish('alertByID', function(id) {
    return Locations.find({$or: [{_id: id},{duress_id: id}]});
});

Meteor.publish('reportsByID', function(id) {
    return Reports.find({alert_id:id});
});

Meteor.publish('locationsByUser', function(user_id) {
    return Locations.find({user_id: user_id,eventType: 'initialDuressRequest'});
});




Meteor.publish('alertsByOrganisation', function() {
var organisation = Meteor.user().profile.organisation;
  if(organisation=='administrator'){
    return Locations.find({
        eventType:'initialDuressRequest'
    });
  }else{
    return Locations.find({
        eventType:'initialDuressRequest',
        organisation: organisation
    });
  }
});



Meteor.publish('allUserFields', function() {
  var organisation = Meteor.user().profile.organisation;
  if(organisation=='administrator'){
  return Userfields.find({});
}else{
  return Userfields.find({
      organisation: organisation
  });
}


});

Meteor.publish('Locationbg', function(user_id) {
  var start = new Date();
  start.setHours(00,00,0,0);

  var end = new Date();
  end.setHours(11,59,59,999);
    if (user_id) {
      return Locationbg.find({user_id:user_id});

} else {
  return this.stop();
}
});



Meteor.publish("organisations", function() {
    if (this.userId) {
      var organisation = Meteor.user().profile.organisation;
  if(organisation=='administrator'){
    return Organisations.find({});
  }else{
        return Organisations.find({
            organisation: organisation
        });
      }
    } else {
        this.ready();
    }

});

Meteor.publish("organisationsByID", function(key) {
  return Organisations.find({
            key:key
        });

});

Meteor.publish("savenLogger", function() {
    if (this.userId) {
var organisation = Meteor.user().profile.organisation;

  if(organisation=='administrator'){
    return Savenlogger.find({},{skip: 0, limit: 9});
  }else{
        return Savenlogger.find({
            organisation: organisation
        },{skip: 0, limit: 9, $sort: {_id: -1}}  );
      }
    } else {
        this.ready();
    }

});

Meteor.publish("savenLoggerByUser", function(user_id) {
    if (this.userId) {
        return Savenlogger.find({
            user_id: user_id
        });
    } else {
        this.ready();
    }

});




Meteor.publish("otheruserfields", function(organisation) {

  var organisation = Meteor.user().profile.organisation;

    if (this.userId) {
  if(organisation=='administrator'){
    return Userfields.find({});
  }else{
        return Userfields.find({
            organisation: organisation
        });
      }
    } else {
        this.ready();
    }

});

Meteor.publish('refers', function() {
    return Refers.find({});
});
