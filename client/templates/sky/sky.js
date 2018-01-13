    Template.sky.onCreated(function() {



        GoogleMaps.ready('map', function(map) {



          google.maps.event.addListener(map.instance, 'dragstart', function() {


            $('#navBar').slideToggle();

           } );

           google.maps.event.addListener(map.instance, 'dragend', function() {

$('#navBar').slideToggle();
             } );



            // var iconBase = '/img/markeryou.png';
            // var marker = new google.maps.Marker({
            //     map: map.instance,
            //     position: new google.maps.LatLng(latLng.latitude, latLng.longitude),
            //     icon: iconBase
            // });
            // //
            // // Add circle overlay and bind to marker
            // var circle = new google.maps.Circle({
            //     map: map.instance,
            //     clickable: false,
            //     radius: 500, // 10 miles in metres
            //     fillColor: '#BCED91',
            //     strokeWeight: 1
            // });
            // circle.bindTo('center', marker, 'position');

            markers = {};
            Locations.find({
                eventType: 'initialDuressRequest'
            }).observe({
                added: function(document) {

console.log(document.status);

                  if(document.status == "safe"){
                    iconType = 'inactive';
                  }else{
                    iconType = 'active';
                  }

                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
                        map: map.instance,
                        id: document._id,
                        icon: '/img/' + iconType + '.png'
                    });

                    // var circle = new google.maps.Circle({
                    //     map: map.instance,
                    //     clickable: false,
                    //     radius: 500, // 10 miles in metres
                    //     fillColor: '#BCED91',
                    //     strokeWeight: 1
                    // });
                    // circle.bindTo('center', marker, 'position');


                    google.maps.event.addListener(marker, 'click', function(event) {
                        console.log('dragged: ', document)

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
        });
    });



    Template.sky.helpers({
        mapOptions: function() {
            if (GoogleMaps.loaded()) {
                var latLng = Location.getReactivePosition();

                return {
                    center: new google.maps.LatLng(latLng.latitude, latLng.longitude),
                    zoom: 10,
                    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

                };
            }
        }
    });

    Template.sky.helpers({
      skyLocations: function() {

          var duress_id = Router.current().params._id;

          var skyLocations = Locations.find(

              {
                eventType: 'initialDuressRequest'

              }
          );

          return skyLocations;
      },

        settings: function() {
            return {

                rowsPerPage: 100,
                showFilter: true,
                fields: [


           {
                        key: 'fullname',
                        label: 'Duresser Full Name',
                    },{
                        key: 'dateTime',
                        label: 'Duress Date',
                    }


                ]
            };
        }
    });


    Template.sky.events({
      'click .reactive-table tbody tr': function (event) {
        event.preventDefault();
        var duress = this;
console.log(duress.loc.coordinates[1])

var latLng = new google.maps.LatLng(duress.loc.coordinates[1], duress.loc.coordinates[0]);
GoogleMaps.maps.map.instance.panTo(latLng);

GoogleMaps.maps.map.instance.setZoom(15);

        // Router.go("/viewduress/"+duress._id);

      }
    });
