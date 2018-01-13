Meteor.methods({
  getLocationBg: function(data) {
    var start = new Date();
    start.setHours(11,00,0,0);

    var end = new Date();
    end.setHours(11,59,59,999);
var locations = Locationbg.find({user_id:data},{fields: {'loc.coordinates':1}}).fetch();
    return locations;

}
});
