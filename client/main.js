import '/imports/startup/client';
AutoForm.setDefaultTemplate('materialize');


if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyAr2DSjGgMrzk7A-Aal0xggYT4mP0vD75g', libraries: 'drawing,geometry,places,visualization' });
  });
}

Template.registerHelper('relativeTime', function(date) {

  if(date){
    var timePassed = moment(date).fromNow();
return timePassed;
}else{
  return 'Never'
}

});

Template.registerHelper('truncate', function(value) {

   if (value.length > 100)
      return value.substring(0,200)+'...';
   else
      return value;

});

Template.registerHelper('avatar', function(value) {

   if (value){
    return value;
   }else{
    return '/img/no-profile-picture.png';
   }

});




Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});



Template.registerHelper('isIntNull', function(v) {

  if(v){
    return v;
  }else{
    return 0;
  }

});

Template.registerHelper('isStringNull', function(v) {

  if(v){
    return camelize(v);
  }else{
    return 'None';
  }

});

Template.registerHelper('yesOrNo', function(v) {

  if(v){
    return 'Yes';
  }else{
    return 'No';
  }

});



Template.registerHelper('upper', function(upper) {
  if(upper){
    return upper.toUpperCase();
  }
});

Template.registerHelper('camel', function(camel) {

  camelize = function camelize(str) {
    if(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  }

  return camelize(camel);

});



Template.registerHelper('timeAgo', function(date) {

return moment(date).fromNow();

});



// Meteor.startup(function() {

//   Location.locate(function(pos){
//   //  GoogleMaps.load({ v: '3', key: 'AIzaSyCUB4qI3i-nuopfOWzivLg9VtMKFJhT1xc', libraries: 'geometry,places' });

//   }, function(err){
//    console.log("Oops! There was an error", err);
//   });

// });



Template.header.rendered = function() {
  Meteor.setTimeout(function() {

    this.$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      alignment: 'right',
      gutter: 0,
      belowOrigin: true
    });

    this.$('.button-collapse').sideNav({
      menuWidth: 240,
      activationWidth: 70,
      closeOnClick: true
    });

  }.bind(this), 0);


};


Template.registerHelper('equals', function(param1, param2) {
  return param1 === param2;
});

camelize = function camelize(str) {
  if(str){
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
}

Template.registerHelper("selectedIfEquals",function(left,right){
  console.log(left,right)
  return left==right?"selected":"";
});
