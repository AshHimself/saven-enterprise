Template.refers.onCreated( function(){
  this.documents = this.subscribe( 'refers');

});

Template.refers.helpers({
  settings: function () {
      return {
          showNavigation: 'auto',
          noDataTmpl: 'noDataTmpl',
          rowsPerPage: 10,
          showFilter: true,
          fields: [
                 {
                   key: 'fullname',
                   label: 'Fullname',
                 },
                 {
                   key: 'points',
                   label: 'Points',
                 },


               ]
                         };
  },

    refers: function () {
      var refers = Refers.find({});
        return refers;
    }


});
