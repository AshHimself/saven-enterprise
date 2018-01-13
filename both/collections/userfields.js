Userfields.attachSchema(new SimpleSchema({
  user_id: {
      type: String
  },
    fullname: {
        type: String,
        autoform: {
   label: 'Full name'
}
    },
    suburb: {
        type: String,
        autoform: {
   label: 'Suburb'
}
    },
    postcode: {
        type: String,
        optional: true,
        autoform: {
   label: 'Post Code'
}
    },
    profilePicture: {
        type: String,
        autoform: {
   label: 'Profile picture'
}
    },
    type: {
        type: String,
        optional: true
    },
    referCode: {
        type: String,
        optional: true
    },
    status: {
        type: String
    },
    history: {
        type: String,
        optional: true
    },
    duressMode: {
        type: Number
    },
    dateTime: {
        type: Date
    },
    profileApproved: {
        type: Number
    },
    firstOpen: {
        type: Number
    },
    activeDuressID: {
        type: String,
        optional: true
    },
    activeDuresserID: {
        type: String,
        optional: true
    },
    lastGPSUpdate: {
        type: Date,
        optional: true
    },
    organisation: {
        type: String,
        optional: true
    },
    lastUpdateMethod: {
        type: String
    },
    "loc.type":{
     type: String,
     allowedValues: ["Point"]
 },
     "loc.coordinates":{
        type: Array,
        minCount: 2,
        maxCount: 2
    },
    "loc.coordinates.$":{
        type: Number,
        decimal: true

    },
    "card.id": {
        type: String,
        optional: true
    },
    "card.type": {
        type: String,
        optional: true
    },
    "card.last4": {
        type: String,
        optional: true
    }
    ,
    "card.exp_month": {
        type: String,
        optional: true
    },
    "card.exp_year": {
        type: String,
        optional: true
    }
}));
