Template.events.helpers({
    duressEvents: function() {

var events = Locations.find({
    type: {
        $in: ["duress"]
    }
}).count();

console.log(events);

        return events;
    },

    locationUserfields: function() {

        // var userLocation =  Userfields.findOne({user_id: this.user_id});
        // return userLocation;
    }

});
