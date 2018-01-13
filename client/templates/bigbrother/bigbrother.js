// Template.bigbrother.onCreated(function() {
//     GoogleMaps.ready('map', function(map) {
//
//         var polygon = Organisations.findOne({});
//
//         function addPolygon(coords) {
//             var polygon_coordinates = [];
//             for (var i = 0; i < coords.length; i++) {
//                 polygon_coordinates.push({
//                     lat: parseFloat(coords[i][1]),
//                     lng: parseFloat(coords[i][0])
//                 });
//                 console.log(i)
//             }
//
//             var new_polygon = new google.maps.Polygon({
//                 paths: polygon_coordinates,
//                 strokeColor: '#2996c0',
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: '#2996c0',
//                 fillOpacity: 0.35
//             });
//             new_polygon.setMap(map.instance);
//         }
//
//         addPolygon(polygon.polygons.coordinates[0]);
//
//     });
// });


Template.bigbrother.onCreated(function() {

  this.subscribe('allUserFields');
  //
    GoogleMaps.ready('map', function(map) {

        var markers = {};

        var duresserPath = [];

        var guardiansArray = Userfields.find({

          "loc": { $exists: true}
        }).observe({

            added: function(document) {




              var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var marker = new google.maps.Marker({
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
                    map: map.instance,
                    id: document.user_id,
                    icon: '/img/' + document.type + '.png',


                });

                var contentString = '<img height="50" width="50" src="'+document.profilePicture+'"><br /> '+document.fullname;

                                          var infowindow = new google.maps.InfoWindow({
                                            content: contentString
                                          });

                                          marker.addListener('mouseover', function() {
      infowindow.open(map, marker);
  });

  // assuming you also want to hide the infowindow when user mouses-out
  marker.addListener('mouseout', function() {
      infowindow.close();
  });

                // if (document.eventType == "duresserLocationUpdate" || document.eventType == "initialDuressRequest" || document.eventType == "duresserMarkDuressSafe") {
                //     duresserPath.push(new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]));
                // }
                // Creates the polyline object

                // var duresserLine = new google.maps.Polyline({
                //     map: map2.instance,
                //     path: duresserPath,
                //     strokeColor: '#D7775A',
                //     strokeOpacity: 0.8,
                //     strokeWeight: 2
                // });

                google.maps.event.addListener(marker, 'click', function(event) {
                    // map.instance.setZoom(8);
                    // map.instance.panTo(this.getPosition());
                    Router.go('/bigbrotheruser/'+this.id)

                });

                google.maps.event.addListener(marker, 'dragend', function(event) {
                    console.log('dragged: ', document)
                    Locations.update(marker.id, {
                        $set: {
                            loc: {
                                type: "Point",
                                coordinates: [
                                    event.latLng.lng(),
                                    event.latLng.lat()
                                ]
                            }
                        }
                    });
                });



                markers[document._id] = marker;
            },
            changed: function(newDocument, oldDocument) {
                console.log(newDocument._id)
                markers[newDocument._id].setPosition({

                    lat: newDocument.loc.coordinates[1],
                    lng: newDocument.loc.coordinates[0]
                });
            }
        });


        // var laLatLng = new google.maps.LatLng(-32.1249215, 115.7962095);
        //   map2.panTo(laLatLng);
        //   map2.setZoom(5);

    });
});

Template.bigbrother.events({
    'click .feed-item': function(e) {
        e.preventDefault();
        Router.go(this.redirect)

    }
});

Template.bigbrother.helpers({
    mapOptions: function() {

      var latLng = Location.getReactivePosition();

        if (GoogleMaps.loaded() && latLng) {


            return {
                center: new google.maps.LatLng(latLng.latitude,latLng.longitude),
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
