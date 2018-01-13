    Template.map1.onCreated(function() {

        GoogleMaps.ready('map', function(map) {

          google.maps.event.addListener(map.instance, 'dragstart', function() {




           } );

           google.maps.event.addListener(map.instance, 'dragend', function() {


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
            //     radius: 20000, // 10 miles in metres
            //     fillColor: '#BCED91',
            //     strokeWeight: 1
            // });
            // circle.bindTo('center', marker, 'position');

            var markers = {};
            Userfields.find({
                // user_id: {
                //     $ne: Meteor.userId()
                // }
            }).observe({
                added: function(document) {

                  if(document.user_id == Meteor.userId()){
                    iconType = 'start';
                  }else{
                    iconType = 'end';
                  }


var contentString = '<img height="50" width="50" src="'+document.profilePicture+'"><br /> '+document.fullname;

                          var infowindow = new google.maps.InfoWindow({
                            content: contentString
                          });

                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
                        map: map.instance,
                        id: document._id,
                        icon: '/img/' + iconType + '.png'
                    });

                    marker.addListener('click', function() {
                       infowindow.open(map, marker);
                     });

                    // var circle = new google.maps.Circle({
                    //     map: map.instance,
                    //     clickable: false,
                    //     fillOpacity: 0.2,
                    //     radius: 20000, // 10 miles in metres
                    //     fillColor: '#BCED91',
                    //     strokeWeight: 1
                    // });
                    // circle.bindTo('center', marker, 'position');

                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        console.log('dragged: ', document)
                        Userfields.update(marker.id, {
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
                  //  console.log(newDocument._id)
                    markers[newDocument._id].setPosition({

                        lat: newDocument.loc.coordinates[1],
                        lng: newDocument.loc.coordinates[0]
                    });
                }
            });
        });
    });





    Meteor.startup(function() {


        // GoogleMaps.load();


    });

    Template.map1.helpers({
        mapOptions: function() {
            if (GoogleMaps.loaded()) {
                var latLng = Location.getReactivePosition();

                return {
                    center: new google.maps.LatLng(latLng.latitude, latLng.longitude),
                    zoom: 15
                };
            }
        }
    });
