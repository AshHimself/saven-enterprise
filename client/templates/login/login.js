// Meteor.startup(function () {
//   var telInput = $("#phone"),
//   errorMsg = $("#error-msg"),
//   validMsg = $("#valid-msg");
//
//
// });

Accounts.config({
  forbidClientAccountCreation : true
});

Template.login.onRendered = function() {
  $('.dropdown-toggle').addClass( "btn" );
  $('.dropdown-toggle').text('I\'m already using Saven ▾');

if(!Meteor.userId()){

  Meteor.setTimeout(function() {
    $('body').particleground({
        dotColor: '#5a5d70',
        lineColor: '#3F414D',
        minSpeedX:0.1,
        minSpeedY:0.1,
        maxSpeedX:0.1,
        maxSpeedY:0.1,
        proximity:100,
        parallax: true,
        
    });


  }.bind(this), 0);
}

};

Meteor.autorun(function() {

        if(Meteor.loggingIn()){
          LoginbuttonValue =  $( "#at-btn" ).html();
           $( "#at-btn" ).addClass( "disabled" );
           $("#at-btn").html('Loading..');
           $(".preloader-wrapper").toggle();
        }

});

var myDescriptiveError = {
  en: 'Error Logging in'
};
_.each(myDescriptiveError, function(value, key){
  T9n.map(key, {'error.accounts.myDescriptiveError': value});
});

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      console.log(state)
      // ...
    }
    if (state === "signUp") {
      // Successfully registered
      // ...
    }
  }
};



AccountsTemplates.configure({
  onSubmitHook: mySubmitFunc,
  focusFirstInput: true,
  forbidClientAccountCreation:true,
    texts: {
      title: {
        signIn: "",
        signUp: ""
      },
      errors: {
        loginForbidden: "error.accounts.myDescriptiveError"
      }
    }
});
