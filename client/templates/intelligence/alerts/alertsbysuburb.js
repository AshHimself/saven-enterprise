Template.alertintelligence.onCreated(function() {
    Session.set('alertBySuburbReady', false);
    GoogleMaps.ready('map', function(map) {

        Meteor.call('getAlertsMethod', null, function(error, result) {

            if (error) {
                console.error(error.reason);
                return;
            }

            Session.set('getalertData', result);
            Session.set('alertBySuburbReady', true);

            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            var alerts = [];

            var getalertData = Session.get('getalertData')
            getalertData.forEach(function(item) {

                //  locations.push({"lat":item.loc.coordinates[1], "lng":item.loc.coordinates[0]});
                alerts.push(new google.maps.LatLng(item.loc.coordinates[1], item.loc.coordinates[0]));


            })
            var markers = alerts.map(function(alert, i) {
                return new google.maps.Marker({
                    position: alert,
                    label: labels[i % labels.length]
                });

            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map.instance, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });


        });

    });
});


Template.alertintelligence.helpers({
    alertBySuburbReady: function() {

console.log('Session.get(alertBySuburbReady)',Session.get('alertBySuburbReady'))
        return Session.get('alertBySuburbReady');

    },
    mapOptions: function() {
        var polygon = Organisations.findOne({});

        if (GoogleMaps.loaded() && polygon) {
            Session.set('alertBySuburbReady', true);
            var latLng = Location.getReactivePosition();
            return {
                center: new google.maps.LatLng(polygon.polygons.coordinates[0][0][1], polygon.polygons.coordinates[0][0][0]),
                zoom: 12,
                styles: [{
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#f5f5f5"
                        }]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#f5f5f5"
                        }]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#bdbdbd"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#eeeeee"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#e5e5e5"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#dadada"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#e5e5e5"
                        }]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#eeeeee"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#c9c9c9"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    }
                ]

            };
        }
    }
});
