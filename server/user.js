Accounts.onCreateUser(function(options, user) {

    if (options && user) {
        var profileApproved = 1;

        if (options.profile.type) {
            profileType = "g";
            var profileApproved = 0;
        } else {
            profileType = "u";
        }

        Userfields.insert({
            user_id: user._id,
            fullname: options.profile.fullname,
            suburb: options.profile.suburb.toLowerCase(),
            postcode: options.profile.postcode,
            type: profileType,
            organisation: options.profile.organisation,
            status: "available",
            duressMode: 0,
            dateTime: new Date(),
            profileApproved: profileApproved,
            firstOpen: 1,
            // referCode: makeid(),
            activeDuressID: "",
            activeDuresserID: "",
            lastUpdateMethod: "NEVER",
            profilePicture: "https://storage.cloud.google.com/prd-saven/avatars/noprofile.png"
        });


        // We still want the default hook's 'profile' behavior.
        if (options.profile)
            user.profile = options.profile;


    }

              Meteor.call('getOrganisationFromSuburb', options.profile.suburb.toLowerCase(), function(error, result) {
Meteor.users.update(user._id, { $set: {'profile.organisation':result.organisation,'profile.suburb':options.profile.suburb.toLowerCase()} });


});

    return user;
});

Accounts.validateLoginAttempt(function(options) {

    if(options.user.profile.role=='seUser' || options.user.profile.organisation=='administrator'){
        return true;
    }else{
        throw new Meteor.Error(403, 'ACCESS DENIED DUDE');
        return false;
    }
});