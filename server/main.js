import { Meteor } from 'meteor/meteor';
Userfields._ensureIndex({ "loc": "2dsphere"});
Suburbs._ensureIndex({ "postcode": 1});

