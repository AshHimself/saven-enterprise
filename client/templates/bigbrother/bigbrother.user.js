Template.bigbrotheruser.onCreated(function() {

    GoogleMaps.ready('map', function(map) {



      Meteor.call('getLocationBg', Router.current().params._id, function(error, result){

        if(error){
      console.log(error.reason);
      return;
      }
      console.log('loaded big brother data')
        Session.set('getLocationBg', result);
        Session.set('getLocationBgReady', true);

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var locations = [];

        var getLocationBg = Session.get('getLocationBg')

        getLocationBg.forEach(function(item) {

          //  locations.push({"lat":item.loc.coordinates[1], "lng":item.loc.coordinates[0]});
          locations.push(new google.maps.LatLng(item.loc.coordinates[1], item.loc.coordinates[0]));


        })
console.log(locations)
        var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
      });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map.instance, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


      });






        // var markers = {};
        //
        // var duresserPath = [];
        //
        // var guardiansArray = Locationbg.find({
        //   "loc": { $exists: true}
        // }).observe({
        //
        //     added: function(document) {
        //
        //         var marker = new google.maps.Marker({
        //             draggable: true,
        //             animation: google.maps.Animation.DROP,
        //             position: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
        //             map: map.instance,
        //             id: document.user_id,
        //           //  icon: '/img/' + document.type + '.png'
        //         });

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
    //
    //             google.maps.event.addListener(marker, 'click', function(event) {
    //                 map.instance.setZoom(8);
    //                 map.instance.panTo(this.getPosition());
    //
    //             });
    //
    //             google.maps.event.addListener(marker, 'dragend', function(event) {
    //                 console.log('dragged: ', document)
    //                 Locations.update(marker.id, {
    //                     $set: {
    //                         loc: {
    //                             type: "Point",
    //                             coordinates: [
    //                                 event.latLng.lng(),
    //                                 event.latLng.lat()
    //                             ]
    //                         }
    //                     }
    //                 });
    //             });
    //
    //
    //
    //             markers[document._id] = marker;
    //         },
    //         changed: function(newDocument, oldDocument) {
    //             console.log(newDocument._id)
    //             markers[newDocument._id].setPosition({
    //
    //                 lat: newDocument.loc.coordinates[1],
    //                 lng: newDocument.loc.coordinates[0]
    //             });
    //         }
    //     });
    //
    //
    //     // var laLatLng = new google.maps.LatLng(-32.1249215, 115.7962095);
    //     //   map2.panTo(laLatLng);
    //     //   map2.setZoom(5);
    //
    // });
});
});
Template.bigbrotheruser.events({
    'click .feed-item': function(e) {
        e.preventDefault();
        Router.go(this.redirect)

    }
});

Template.bigbrotheruser.helpers({

    dataReady: function(){
      if(Session.get('getLocationBgReady'))
      {return true}
    },

    mapOptions: function() {
      console.log('mapOptions loading')

var latLng = Location.getReactivePosition();
        if (GoogleMaps.loaded() && latLng) {
console.log('mapOptions loaded')

            return {
                center: new google.maps.LatLng(latLng.latitude,latLng.longitude),
                zoom: 3,
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
