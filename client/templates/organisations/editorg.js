Template.editorg.helpers({
    organisation: function() {

        var orgID = Router.current().params._id;

        return Organisations.findOne({ _id: orgID });

    }
});

Template.editorg.events({
    'keyup #organisation': function(e) {
        $('#organisation').val($('#organisation').val().replace(/ +?/g, ''));
    },
    'click .save': function(event, template) {
        event.preventDefault();

        if ($("form").valid()) {
            //
            var organisation = $('#organisation').val().toLowerCase();
            var licensedTo = $('#licensedTo').val();
            var broadcastLicense = $('#broadcastLicense').prop('checked')
            var alertLicense = $('#alertLicense').prop('checked')
            var orgID = Router.current().params._id;
            var coord = Session.get('pathstr');

            if (coord.path) {
                var data = {
                    licensedTo: licensedTo,
                    license: {
                        broadcast: broadcastLicense,
                        alert: alertLicense
                    },
                    area: coord.area,
                    polygons: {
                        type: "Polygon",
                        coordinates: [
                            coord.path
                        ]

                    },
                    createdDate: new Date(),
                    lastModified: new Date()
                }
            } else {
                var data = {
                    licensedTo: licensedTo,
                    license: {
                        broadcast: broadcastLicense,
                        alert: alertLicense
                    },
                    createdDate: new Date(),
                    lastModified: new Date()
                }
            }

            Organisations.update({ _id: orgID }, { $set: data });

            swal({
                title: "Updated!",
                text: camelize(organisation) + " has been updated",
                type: "success",
                timer: 1500
            });

        }

    }

});

Template.editorg.onRendered(function() {
    //This is fixing a text overlap issue in MaterlizeCSS for input values which already have a value.
    //https://github.com/Dogfalo/materialize/issues/180
    setTimeout(function() {
        $('.input-field label').addClass('active');
        $('select').material_select();

    }, 2);

    $("form").validate({
        errorClass: 'invalid',
        errorPlacement: function(error, element) {
            $(element)
                .closest("form")
                .find("label[for='" + element.attr("id") + "']")
                .attr('data-error', error.text());
        }
    });
});


Template.editorg.onCreated(function() {
    Session.set('pathstr', false)
    GoogleMaps.ready('map', function(map) {







        var drawingManager;
        var selectedShape;
        var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
        var selectedColor;
        var colorButtons = {};

        function clearSelection() {
            if (selectedShape) {
                $('.delete').prop("disabled", true);


                if (typeof selectedShape.setEditable == 'function') {
                    selectedShape.setEditable(false);
                }
                selectedShape = null;
            }
            // curseldiv.innerHTML = "<b>cursel</b>:";
        }

        function updateCurSelText(shape) {

            posstr = "" + selectedShape.position;
            if (typeof selectedShape.position == 'object') {
                posstr = selectedShape.position.toUrlValue();
            }
            pathstr = selectedShape.getPath;
            if (typeof selectedShape.getPath == 'function') {
                pathstr = [];
                for (var i = 0; i < selectedShape.getPath().getLength(); i++) {
                    // .toUrlValue(5) limits number of decimals, default is 6 but can do more

                    var a = selectedShape.getPath().getAt(i).toUrlValue();
                    var loc = a.split(',');


                    var loc1 = Number(loc[1]);
                    var loc2 = Number(loc[0]);
                    pathstr.push([loc1, loc2])
                }


                var b = selectedShape.getPath().getAt(0).toUrlValue();
                var loca = b.split(',');


                var loc1a = Number(loca[1]);
                var loc2a = Number(loca[0]);
                pathstr.push([loc1a, loc2a])

                var area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());

                Session.set('pathstr', {path: pathstr, area: area})

                drawingManager.setOptions({
                    drawingControl: false
                });


            }


            bndstr = "" + selectedShape.getBounds;
            cntstr = "" + selectedShape.getBounds;
            if (typeof selectedShape.getBounds == 'function') {
                var tmpbounds = selectedShape.getBounds();
                cntstr = "" + tmpbounds.getCenter().toUrlValue();
                bndstr = "[NE: " + tmpbounds.getNorthEast().toUrlValue() + " SW: " + tmpbounds.getSouthWest().toUrlValue() + "]";
            }
            cntrstr = "" + selectedShape.getCenter;
            if (typeof selectedShape.getCenter == 'function') {
                cntrstr = "" + selectedShape.getCenter().toUrlValue();
            }
            radstr = "" + selectedShape.getRadius;
            if (typeof selectedShape.getRadius == 'function') {
                radstr = "" + selectedShape.getRadius();
            }
        }

        function setSelection(shape, isNotMarker) {
            clearSelection();
            selectedShape = shape;
            if (isNotMarker)
                $('.delete').prop("disabled", false);
            shape.setEditable(false);
            // $('.delete').prop("disabled",false);
            //   selectColor(shape.get('fillColor') || shape.get('strokeColor'));
            updateCurSelText(shape);
        }

        function deleteSelectedShape() {

            $('.delete').prop("disabled", true);
                    drawingManager.setOptions({
                    drawingControl: true,
                });
            if (selectedShape) {
                

                selectedShape.setMap(null);
        
            }else{

                if(new_polygon){
                new_polygon.setMap(null);

            

            Organisations.update({ _id: orgID }, {$unset:{polygons:1} });


            }
            }
        }

        function selectColor(color) {
            selectedColor = '#2996c0';
            for (var i = 0; i < colors.length; ++i) {
                var currColor = colors[i];
                colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
            }

            // Retrieves the current options from the drawing manager and replaces the
            // stroke or fill color as appropriate.
            var polylineOptions = drawingManager.get('polylineOptions');
            polylineOptions.strokeColor = color;
            drawingManager.set('polylineOptions', polylineOptions);

            var rectangleOptions = drawingManager.get('rectangleOptions');
            rectangleOptions.fillColor = color;
            drawingManager.set('rectangleOptions', rectangleOptions);

            var circleOptions = drawingManager.get('circleOptions');
            circleOptions.fillColor = color;
            drawingManager.set('circleOptions', circleOptions);

            var polygonOptions = drawingManager.get('polygonOptions');
            polygonOptions.fillColor = color;
            drawingManager.set('polygonOptions', polygonOptions);
        }

        function setSelectedShapeColor(color) {
            if (selectedShape) {
                if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
                    selectedShape.set('strokeColor', '#2996c0');
                } else {
                    selectedShape.set('fillColor', '#2996c0');
                }
            }
        }

        var map; //= new google.maps.Map(document.getElementById('map'), {
        // these must have global refs too!:
        var placeMarkers = [];
        var input;
        var searchBox;
        var curposdiv;
        var curseldiv;

        function deletePlacesSearchResults() {
            for (var i = 0, marker; marker = placeMarkers[i]; i++) {
                marker.setMap(null);
            }
            placeMarkers = [];
            input.value = ''; // clear the box too
        }


        // curposdiv = document.getElementById('curpos');
        // curseldiv = document.getElementById('cursel');

        var polyOptions = {
            strokeWeight: 1,
            fillOpacity: 0.45,
            editable: true,
            strokeColor: '#2996c0',
            fillColor: '#2996c0'
        };
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            markerOptions: {
                draggable: true,
                editable: true,
            },
            polylineOptions: {
                editable: true
            },
            rectangleOptions: polyOptions,
            circleOptions: polyOptions,
            polygonOptions: polyOptions,
            map: map.instance,
            drawingControlOptions: {
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            }
        });



        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
            //~ if (e.type != google.maps.drawing.OverlayType.MARKER) {
            var isNotMarker = (e.type != google.maps.drawing.OverlayType.MARKER);
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);


            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function() {
                setSelection(newShape, isNotMarker);
            });
            // google.maps.event.addListener(newShape, 'drag', function() {
            //     updateCurSelText(newShape);
            // });
            google.maps.event.addListener(newShape, 'dragend', function() {
                updateCurSelText(newShape);
            });
            setSelection(newShape, isNotMarker);
            //~ }// end if
        });

        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
        google.maps.event.addListener(map.instance, 'click', clearSelection);
        google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);

        //   buildColorPalette();

        //
        var DelPlcButDiv = document.createElement('div');
        //~ DelPlcButDiv.style.color = 'rgb(25,25,25)'; // no effect?
        DelPlcButDiv.style.backgroundColor = '#fff';
        DelPlcButDiv.style.cursor = 'pointer';
        DelPlcButDiv.innerHTML = 'DEL';

        google.maps.event.addDomListener(DelPlcButDiv, 'click', deletePlacesSearchResults);

        //Add polyline if it exists already

        var orgID = Router.current().params._id;
        //Add polyline if it exists already
        var polygon = Organisations.findOne({ _id: orgID });


        //disable polyline control if exists already
        var polylineExists = Organisations.find({ _id: orgID, "polygons": { $exists: true } }).count();


        if (polylineExists) {
            drawingManager.setOptions({
                drawingControl: false,
                drawingMode: (null)
            });
        

        function addPolygon(coords) {
            var polygon_coordinates = [];
            for (var i = 0; i < coords.length; i++) {
                polygon_coordinates.push({
                    lat: parseFloat(coords[i][1]),
                    lng: parseFloat(coords[i][0])
                });
            }

         new_polygon = new google.maps.Polygon({
                paths: polygon_coordinates,
                strokeColor: '#2996c0',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#2996c0',
                fillOpacity: 0.35
            });
            new_polygon.setMap(map.instance);

            function clearNewPolygon(){



        $('.delete').prop("disabled", true);
            }


             google.maps.event.addListener(new_polygon, 'click', function(e) {

                $('.delete').prop("disabled", false);
   

               google.maps.event.addListener(map.instance, 'click', clearNewPolygon);
 });


        }

        addPolygon(polygon.polygons.coordinates[0]);


}

    });
});



Template.editorg.helpers({

    mapOptions: function() {

        var orgCode = Meteor.user().profile.organisation;
        var polygon = Organisations.findOne({organisation: orgCode});
        var polylineExists = Organisations.find({ organisation: orgCode, "polygons": { $exists: true } }).count();

        if (GoogleMaps.loaded() && polygon) {

            var latLng = Location.getReactivePosition();
            return {
              //  center: new google.maps.LatLng(polygon.polygons.coordinates[0][0][1], polygon.polygons.coordinates[0][0][0]),
                zoom: 10,
                center: {lat: -28.643387, lng: 153.612224},
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