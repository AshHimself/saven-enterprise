Template.users.events({
    'click #location': function(e) {
        e.preventDefault();
        var latLng = Location.getReactivePosition();
        Location.startWatching(function(pos) {
            console.log("Got a position!", pos);
        }, function(err) {
            console.log("Oops! There was an error", err);
        });
    }

});

Template.users.helpers({
    userdata: function () {
      var userdata = Userfields.find({},{$sort: {_id: -1}});
        return userdata;
    }
});

Template.users.helpers({
    settings: function () {
        return {

            rowsPerPage: 100,
            showFilter: true,
            showFilter: false,
            filters: ['adminSavenFilter'],
            fields: [
                   {
                     key: 'fullname',
                     label: 'Full Name',
                     fn: function (value, object, key) { return camelize(value) }

                   },
                   {
                       key: 'type',
                       label: 'Guardian',
                       fn: function (value, object, key) { if(value==="g"){return "Yes"}else{return "No"} }
                   },
                   {
                     key: 'dateTime',
                     label: 'Created',
                     fn: function (value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a');}

                   },

                {
                    key: 'dateTime',
                    label: 'Created',
                    hidden: true,
                    sortOrder: 0, sortDirection: 'descending'
                },
                                      {
                     key: 'suburb',
                     label: 'Suburb',
                     fn: function (value, object, key) { if(!value){return 'X'}else{ return camelize(value);}}

                   },
                   {
                     key: 'lastGPSUpdate',
                     label: 'Last Seen',
                     fn: function (value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a');}

                   }



                 ]
                           };
    }
});

Template.adminSavenFilter.events({
   "change #adminSavenFilter": function (event, template) {
    console.log(template)
      var input = $('#adminSavenFilter').val();
      console.log(input)
      // if (!_.isNaN(input)) {
       
      // } else {
      //   template.filter.set("");
      // }
      switch (input) {
    case '1':
     template.filter.set("true");
    console.log('filter for 1')

        break;
    case '2':

      break;
    default:
        // execute default code block
}

   }
});


Template.adminSavenFilter.created = function () {
  this.filter = new ReactiveTable.Filter('adminSavenFilter', ['profile.tokenVerified']);
};


Template.users.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var user = this;

    Router.go("/userprofile/"+user.user_id);

  }
});

Template.users.helpers({
    alluserfields: function() {


var userfields = Userfields.find({});


        return userfields;
    }
});
