if(savenEnterpriseVersion){
  console.info('Saven Enterprise Version: ', savenEnterpriseVersion);
}

Profile = (function() {
    var api = {};

    api.profileID = function() {
        var profile_ID = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                '_id': 1
            }
        });

        if(profile_ID){
        return profile_ID._id;
      }
    };

    api.referCode = function() {
        var referCode = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'referCode': 1
            }
        });

        if(referCode){
        return referCode.referCode;
      }
    };

    api.type = function() {
        var type = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'type': 1
            }
        });

        if (type){
            return type.type;
        }

    };

    api.all = function() {
        var all = Userfields.findOne({
            user_id: Meteor.userId()

        });
        if(all){
        return all;
      }
    };



    api.activeDuressID = function() {
        var activeDuressID = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'activeDuressID': 1
            }
        });
        if(activeDuressID){
        return activeDuressID.activeDuressID;
      }
    };

    api.activeDuresserID = function() {
        var activeDuresserID = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'activeDuresserID': 1
            }
        });
        if(activeDuresserID){
        return activeDuresserID.activeDuresserID;
      }
    };

    api.profilePicture = function() {
        var profilePicture = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'profilePicture': 1
            }
        });

        if(profilePicture){
        return profilePicture && profilePicture.profilePicture;
      }
    };

    api.fullname = function() {
        var fullname = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'fullname': 1
            }
        });

        if (fullname) {
            return camelize(fullname.fullname);
        }

    };


    api.suburb = function() {
        var suburb = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'suburb': 1
            }
        });
        if(suburb){
        return suburb.suburb;
      }
    };
    api.postcode = function() {
        var postcode = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'postcode': 1
            }
        });
        if(postcode){
        return postcode.postcode;
      }
    };
    //get organisation based on geolocation
    api.geoOrganisation = function() {
      //On mobile get the organisation based on your GPS, desktop will grab this from profile and not use GPS
        var organisation = Organisations.findOne({}, {
            fields: {
                'organisation': 1
            }
        });
        if(organisation){
        return organisation.organisation;
      }
    };

    //get organisation assigned to profile
    api.profileOrganisation = function() {
      //On mobile get the organisation based on your GPS, desktop will grab this from profile and not use GPS
        var organisation = Userfields.findOne({}, {
            fields: {
                'organisation': 1
            }
        });
        if(organisation){
        return organisation.organisation;
      }else{
        RavenLogger.log('api.profileOrganisation: Organisation not found',{ component: 'saven-enterprise' });
      }
    };

    api.inDuress = function() {
        var active = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'duressMode': 1
            }
        });

        if(active){
        return active;
      }
    };

    api.isAdmin = function() {
        var isAdmin = Userfields.find({
            user_id: Meteor.userId()
        }, {
            fields: {
                'admin': 1
            }
        }).count();
console.log(isAdmin)
        if(isAdmin){
        return isAdmin;
      }
    };



    api.currentLocation = function() {
        var location = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'loc.coordinates': 1
            }
        });

        if(location){
          var currentLocation = {};
          currentLocation['lat'] = location.loc.coordinates[1];
          currentLocation['long'] = location.loc.coordinates[0];

        return currentLocation;
      }
    };

    return api;
}());



Duresser = (function() {
    var api = {};

    api.profilePicture = function() {

        var activeDuresserID = Userfields.findOne({
            user_id: Meteor.userId()
        }, {
            fields: {
                'activeDuresserID': 1
            }
        });


        var profilePicture = Userfields.findOne({
            user_id: activeDuresserID.activeDuresserID

        }, {
            fields: {
                'profilePicture': 1
            }
        });

        return profilePicture.profilePicture;


        // if (!profilePicture.profilePicture) {
        //     return "data:image/jpeg;base64,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";
        // } else {
        //     return profilePicture.profilePicture;
        // }
    };

    api.profile = function() {
        var profile = Meteor.users.findOne({
            _id: Profile.activeDuresserID()
        });

        return profile;
    };

    return api;
}());

Guardian = (function() {
    var api = {};

    api.getProfilePicture = function(user_id) {

        var profilePicture = Userfields.findOne({
            user_id: user_id
        }, {
            fields: {
                'profilePicture': 1
            }
        });

        return profilePicture.profilePicture;
    };

    return api;
}());
