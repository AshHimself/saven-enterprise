Template.viewalert.helpers({
            totalReports: function() {

            var totalReports = Reports.findOne({
                alert_id: Router.current().params._id
            }).count();

            return totalReports;
        },
        userprofile: function() {

            var user_id = Router.current().params._id;

            var userprofile = Userfields.findOne({
                user_id: user_id
            });

            return userprofile;
        },
        userDuress: function() {

            var duress_id = Router.current().params._id;

            var duressEvent = Locations.find(

                {
                    "$or": [{
                        duress_id: duress_id
                    }, {
                        _id: duress_id
                    }]

                }
            );

            return duressEvent;
        },
        statisticsSentTo: function() {

            var duress_id = Router.current().params._id;

            var statisticsSentTo = Locations.find(

                {
                    eventType: 'requestGuardian',
                    "$or": [{
                        duress_id: duress_id
                    }, {
                        _id: duress_id
                    }]

                }
            ).count();


            return statisticsSentTo;
        },
        settings: function() {
            return {

                rowsPerPage: 100,
                showFilter: false,
                fields: [

                    {
                        key: 'user_type',
                        label: 'User Type',
                        fn: function(value, object, key) { return camelize(value); }

                    }, {
                        key: 'fullname',
                        label: 'Full Name',
                        fn: function(value, object, key) { return camelize(value); }

                    }, {
                        key: 'eventType',
                        label: 'Legend',
                        fn: function(value, object, key) {

                            return new Spacebars.SafeString("<img src='/img/" + value + ".png'>");

                        }
                    }, {
                        key: 'eventType',
                        label: 'Event Type',
                    }, {
                        key: 'status',
                        label: 'Status',
                        fn: function(value, object, key) { return camelize(value); }

                    }, {
                        key: 'dateTime',
                        label: 'Duress Date',
                        fn: function(value, object, key) { return moment(value).format('MM/DD/YYYY, h:mm a'); }

                    }


                ]
            };
        },
        mapOptions: function() {
            if (GoogleMaps.loaded()) {
                var alertID = Router.current().params._id;
                var getInitAlert = Locations.findOne({ _id: alertID, eventType:'initialDuressRequest' });

                var latitude = getInitAlert.loc.coordinates[1];
                var longitude = getInitAlert.loc.coordinates[0];

                return {
                    center: new google.maps.LatLng(latitude, longitude),
                    zoom: 17,

                    styles: [{
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [{
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        }
                    ]
                }
            }
        }
    });