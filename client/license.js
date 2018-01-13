Template.registerHelper("license", function () {

  var orgCode = Meteor.user().profile.organisation
  var organisation = Organisations.findOne({'organisation':orgCode}, {
      fields: {
          'license': 1
      }
  });
  if(organisation && organisation.license){

    return organisation.license;

  }
});



Template.registerHelper("adminLicense", function () {

  var organisation = Organisations.findOne({}, {
      fields: {
          'license.admin': 1
      }
  });
    return organisation;
});
