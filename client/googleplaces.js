
googleplaces = function(googlePlacesSearchInput,postcodeInput) {
    function initialize() {

        var input = document.getElementById(googlePlacesSearchInput);
        var autocomplete = new google.maps.places.Autocomplete(input);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    var input = /** @type {HTMLInputElement} */
        (document.getElementById(googlePlacesSearchInput));

    // map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.setTypes(['(cities)']); // or 'geocode
    autocomplete.setComponentRestrictions({ 'country': ['au'] });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {


        input.className = '';
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // Inform the user that the place was not found and return.
            input.className = 'notfound';
            return;
        }



        if (place.formatted_address) {


            $.getJSON({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + place.formatted_address + '&result_type=administrative_area_level_2&components=country:AU',
                data: {
                    sensor: false
                },
                success: function(data, textStatus) {
                    console.log(data)
                    var suburb = data.results[0].address_components.filter(function(address_component) {
                        return address_component.types.includes("locality");
                    });
                    var reversedSuburb = suburb.length ? suburb[0].short_name : "";
                    ///var reversedSuburb = reversedSuburb.toLowerCase();

                    var postcode = data.results[0].address_components.filter(function(address_component) {
                        return address_component.types.includes("postal_code");
                    });
                    var postcode = postcode.length ? postcode[0].short_name : "";

                    if(googlePlacesSearchInput){
                        $('#'+googlePlacesSearchInput).val(reversedSuburb);
                    }

                    if(postcodeInput){
                        $('#'+postcodeInput).val(postcode);

                    }
                    


                }


            });


           

        }




        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });



}