Template.greaterThanFilter.created = function () {
  this.filter = new ReactiveTable.Filter('greater-than-filter', ['score']);
};

Template.greaterThanFilter.events({
   "keyup .greater-than-filter-input, input .greater-than-filter-input": function (event, template) {
      var input = parseInt($(event.target).val(), 10);
      if (!_.isNaN(input)) {
        template.filter.set({'$gt': input});
      } else {
        template.filter.set("");
      }
   }
});



Template.broadcasts.helpers({
  settings: function () {
      return {
          showNavigation: 'auto',
          noDataTmpl: 'noDataTmpl',
          rowsPerPage: 10,
          showFilter: true,
          fields: [
                 {
                   key: 'reportType',
                   label: 'Type',
                 },
                 {
                   key: 'content',
                   label: 'Message',
                   fn: function (value, object, key) { 

                       if (value.length > 100){
      return value.substring(0,250)+'...';
    }else{return value;}
   
      

                   }


                 },
                 {
                   key: 'images',
                   label: 'Images',
                   fn: function (value, object, key) { if(value.image1 || value.image2 || value.image3){return "Yes"}else{return "No"} }

                 },
                 {
                   key: 'fullname',
                   label: 'Broadcaster',
                 },
                 {
                   key: 'suburb',
                   label: 'Suburb',
                    fn: function(value, object, key) { return camelize(value); }

                 },
                 ,

                 {
                   key: 'createDateTime',
                   label: 'Date / Time', sortOrder: 0, sortDirection: 'descending',
                   fn: function (value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a');}


                 },


               ]
                         };
  },

    broadcasts: function () {
      var broadcasts = Broadcasts.find({}, {sort: {createDateTime: -1}});
        return broadcasts;
    }


});

Template.broadcasts.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    Router.go("/viewbroadcast/"+this._id);

  },
  'click .download': function (event) {
    event.preventDefault();
    console.log('clicked')
MyAppExporter.exportBroadcasts();


  },


});
