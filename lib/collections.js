Userfields = new Mongo.Collection('userfields');
Markers = new Mongo.Collection('markers');
Locations = new Mongo.Collection('locations');
Acitivity = new Mongo.Collection('activitys');
Reports = new Mongo.Collection("reports");
Messages = new Mongo.Collection('messages');
Feedbacks = new Mongo.Collection('feedbacks');
Organisations = new Mongo.Collection('organisations');
Broadcasts = new Mongo.Collection('broadcasts');
Savenlogger = new Mongo.Collection('savenlogger');
Suburbs = new Mongo.Collection('suburbs');
Precincts = new Mongo.Collection('precincts');
Refers = new Mongo.Collection('refers');
Locationbg = new Mongo.Collection('locationbg');

Userfields.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});
//
Locations.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});

Broadcasts.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});

Organisations.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});
