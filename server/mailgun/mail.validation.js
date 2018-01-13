var mailgun = require('mailgun-js')({apiKey: 'pubkey-a4917fb19d8bffff4a67ac2ff2612752', domain: 'sandbox6330c5cb913248f59787d409c5ce2479.mailgun.org'});
  


Meteor.methods({
    'validateEmail': function(email) {

mailgun.validate(email, function (err, body) {

  if(body && body.is_valid){
   return body;
  }else{
    return false;
  }
});


}
    });