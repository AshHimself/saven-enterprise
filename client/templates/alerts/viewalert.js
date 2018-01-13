    Template.viewalert.onCreated(function() {

        this.subscribe('alertByID', Router.current().params._id, {
            onReady: function() {
                if (subscriptionDebug) {
                    console.log("SUBSCRIPTION: alertByID ready or changed");
                }
            },
            onError: function() {
                if (subscriptionDebug) {
                    console.error("SUBSCRIPTION: alertByID error", arguments);
                }
            }
        });

                this.subscribe('reportsByID', Router.current().params._id, {
            onReady: function() {
                if (subscriptionDebug) {
                    console.log("SUBSCRIPTION: reportsByID ready or changed");
                }
            },
            onError: function() {
                if (subscriptionDebug) {
                    console.error("SUBSCRIPTION: reportsByID error", arguments);
                }
            }
        });

        GoogleMaps.ready('map2', function(map2) {

            var markers = {};
            var duress_id = Router.current().params._id;

            var locationCount = Locations.find({ duress_id: duress_id }).count();

            var duresserPath = [];

            var LocationsArray = Locations.find({ $or: [{ duress_id: duress_id }, { _id: duress_id }] }).observe({

                added: function(document) {
                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
                        map: map2.instance,
                        id: document._id,
                        icon: '/img/' + document.eventType + '.png'
                    });

                    if (document.eventType == "duresserLocationUpdate" || document.eventType == "initialDuressRequest" || document.eventType == "duresserMarkDuressSafe") {
                        duresserPath.push(new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]));
                    }
                    // Creates the polyline object

                    var duresserLine = new google.maps.Polyline({
                        map: map2.instance,
                        path: duresserPath,
                        strokeColor: '#D7775A',
                        strokeOpacity: 0.8,
                        strokeWeight: 2
                    });

                    google.maps.event.addListener(marker, 'click', function(event) {
                        console.log('clicked: ', document)

                    });
                    markers[document._id] = marker;
                }
            });

        });
    });

    

    Template.viewalert.events({
        'click .reactive-table tbody tr': function(event) {
            event.preventDefault();
            var duress = this;


            var latLng = new google.maps.LatLng(duress.loc.coordinates[1], duress.loc.coordinates[0]);
            GoogleMaps.maps.map2.instance.panTo(latLng);

            GoogleMaps.maps.map2.instance.setZoom(30);
            $('html, body').animate({ scrollTop: 0 }, 'fast');

            // Router.go("/viewduress/"+duress._id);

        }
    });