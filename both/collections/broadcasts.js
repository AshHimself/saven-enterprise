SimpleSchema.debug = true
Broadcasts.attachSchema(new SimpleSchema({
    content: {
        type: String,
          optional: false,
          max:140,
        autoform: {
   label: false,
   'length': 140,
   rows: 5,
   placeholder: "What do you want to notify your community about?"
}
    },
    'sentTo.$': {
  type: Object,
  optional: true,
  blackbox: true
},
'precincts': {
type: Object,
optional: true,
// blackbox: true
},

    reportType: {
        type: String,
        optional: false,
        autoform: {
          label: false,
          type: "select",
          options: function () {
            return [
              {label: "Suspicious Activity", value: 'Suspicious Activity'},
              {label: "Burglary", value: 'Burglary'},
              {label: "Other", value: 'Other'}
            ];
          }
        }
      },
user_id: {
    type: String,
    autoform: {
     type: "hidden",
     label: false
 },
    autoValue:function(){ return this.userId }
},
createDateTime: {
    type: Date,
    optional: true,
 //    autoform: {
 //     type: "hidden",
 //     label: false
 // },
 //     autoValue:function(){ return new Date() }
},
fullname: {
    type: String,
    optional: false
},
priority: {
    type: Boolean,
    optional: true
},
organisation: {
    type: String,
    optional: true
},
postcode: {
    type: String,
    optional: true,
}
,
precint: {
    type: String,
    optional: true,
},
// id: {
//     type: Meteor.Collection.ObjectID,
//     optional: true,
// }

}));
