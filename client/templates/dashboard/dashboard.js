    

Template.dashboard.rendered = function() {

        // var barParent = $('#sparkline-bar').closest('.card');
        // var barPoints = [0, 1, 3, 2, 1, 1, 4, 1, 2, 0, 3, 1, 3, 4, 1, 0, 2, 3, 6, 3, 4, 2, 7, 5, 2, 4, 1, 2, 6, 13, 4, 2];
        // var barWidth = 6;
        // $('#sparkline-bar').sparkline(barPoints, {
        //     type: 'bar',
        //     height: $('#sparkline-bar').height() + 'px',
        //     width: '100%',
        //     barWidth: barWidth,
        //     barSpacing: (barParent.width() - (barPoints.length * barWidth)) / barPoints.length,
        //     barColor: 'rgba(0,0,0,.07)',
        //     tooltipFormat: ' <span style="color: #ccc">&#9679;</span> {{value}}</span>'
        // });


};






Template.dashboard.onCreated(function() {


    this.subscribe('savenLogger', {
        onReady: function() {
            if (subscriptionDebug) {
                console.log("SUBSCRIPTION: savenLogger ready or changed");
            }
        },
        onError: function() {
            if (subscriptionDebug) {
                console.error("SUBSCRIPTION: savenLogger error", arguments);
            }
        }
    });



    Meteor.call('activeUsers', null, function(error, result) {

        if (error) {
            console.error(error.reason);
            return;
        }

        if (result.length > 0) {
            Session.set('activeUsers', result[0].number);
        } else {
            Session.set('activeUsers', '0');
        }

    });


    GoogleMaps.ready('map', function(map) {

        var orgCode = Meteor.user().profile.organisation;
        var polygon = Organisations.findOne({organisation: orgCode});
        var polylineExists = Organisations.find({ organisation: orgCode, "polygons": { $exists: true } }).count();

        function addPolygon(coords) {
            var polygon_coordinates = [];
            for (var i = 0; i < coords.length; i++) {
                polygon_coordinates.push({
                    lat: parseFloat(coords[i][1]),
                    lng: parseFloat(coords[i][0])
                });
            }

            var new_polygon = new google.maps.Polygon({
                paths: polygon_coordinates,
                strokeColor: '#2996c0',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#2996c0',
                fillOpacity: 0.35
            });
            new_polygon.setMap(map.instance);
        }

        if(polylineExists){

        addPolygon(polygon.polygons.coordinates[0]);
    }

    });
});

Template.dashboard.events({
    'click .feed-item': function(e) {
        e.preventDefault();
        Router.go(this.redirect)

    }
});

Template.dashboard.helpers({

    activeUsers: function() {

        return Session.get('activeUsers');

    },

    activityFeed: function() {
        var activity = Savenlogger.find({}, {
            skip: 0,
            limit: 7,
            sort: {
                dateTime: -1
            }
        });

        if (activity) {
            return activity;
        }

    },
    mapOptions: function() {
        var orgCode = Meteor.user().profile.organisation;
        var polygon = Organisations.findOne({organisation: orgCode});
        var polylineExists = Organisations.find({ organisation: orgCode, "polygons": { $exists: true } }).count();


        if (GoogleMaps.loaded() && polylineExists) {

            var latLng = Location.getReactivePosition();
            return {
                center: new google.maps.LatLng(polygon.polygons.coordinates[0][0][1], polygon.polygons.coordinates[0][0][0]),
                zoom: 10,
  scrollwheel: false,
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

Template.dashboard.helpers({
    organisation_polygon: function() {
        var polygon = Organisations.findOne({});

        return polygon;
    }
});