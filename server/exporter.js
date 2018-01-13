Meteor.methods({
	exportBroadcasts: function() {		

		    var organisation = Meteor.user().profile.organisation;

		var fields = [
		"Report Type",
		"Message",
"Broadcaster",
"Suburb",
"Date / Time"		
		];
 
		var data = [];		
		var contacts = Broadcasts.find({organisation:organisation}).fetch();
		_.each(contacts, function(c) {
			data.push([
				c.reportType,
				c.content,
				c.fullname,
				c.suburb,
				c.createDateTime
			]);
		});
 
		return {fields: fields, data: data};
	}
});