Meteor.subscribe('userfields');

Meteor.subscribe('organisations', {
  onReady: function() {
      if (subscriptionDebug) {
          console.log("SUBSCRIPTION: organisations ready or changed");
      }
  },
  onError: function() {
      if (subscriptionDebug) {
          console.error("SUBSCRIPTION: organisations error", arguments);
      }
  }
});


Meteor.subscribe('broadcasts', {
  onReady: function() {
      if (subscriptionDebug) {
          console.log("SUBSCRIPTION: broadcasts ready or changed");
      }
  },
  onError: function() {
      if (subscriptionDebug) {
          console.error("SUBSCRIPTION: broadcasts error", arguments);
      }
  }
});

Meteor.subscribe('otheruserfields', {
  onReady: function() {
      if (subscriptionDebug) {
          console.log("SUBSCRIPTION: otheruserfields ready or changed");
      }
  },
  onError: function() {
      if (subscriptionDebug) {
          console.error("SUBSCRIPTION: otheruserfields error", arguments);
      }
  }
});


Meteor.subscribe('userfields', {
  onReady: function() {
      if (subscriptionDebug) {
          console.log("SUBSCRIPTION: userfields ready or changed");
      }
  },
  onError: function() {
      if (subscriptionDebug) {
          console.error("SUBSCRIPTION: userfields error", arguments);
      }
  }
});



Meteor.subscribe('totalBroadcasts');
Meteor.subscribe('totalAlerts');
Meteor.subscribe('totalActiveUsers');

// Meteor.subscribe('totalPriorityBroadcasts');

Meteor.subscribe('allUserFields');
