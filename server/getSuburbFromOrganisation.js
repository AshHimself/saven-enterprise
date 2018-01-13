Meteor.methods({
    'getOrganisationFromSuburb': function(suburb) {

        //Get lat and long of the suburb assigned to the user sending the broadcast
        //Get the org code based on where the broadcast was sent
        var userSuburb = Suburbs.findOne({ text: suburb });

        console.log('Searching for: ', suburb)
        console.log('Found: ', userSuburb)

        if (userSuburb && userSuburb.lat) {

            var suburbLat = Number(userSuburb.lat);
            var suburbLng = Number(userSuburb.lon);

            //Get the org code based on where the broadcast was sent
            var org_code = Organisations.findOne({
                polygons: {
                    $geoIntersects: {
                        $geometry: {
                            "type": "Point",
                            "coordinates": [suburbLng, suburbLat]
                        }
                    }
                }
            });

            //If an org_code exist.. update the duress with the org_code
            if (org_code) {

            	return {organisation: org_code.organisation, suburbLng: suburbLng, suburbLat:suburbLat,suburb: suburb };
            }

        } else {
            if (debug) { console.error('getOrganisationFromSuburb(): Unable to get suburb lat and long for org code', suburb, suburbLng, suburbLat) }
        }
    }
});