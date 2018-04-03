// https://developers.google.com/maps/documentation/javascript/examples/rectangle-event
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.



    var map, infoWindow;
    var date = new Date();
    var hour = date.getHours();
    var default_location = {lat: 33.793348, lng: -117.851350};
    var zones = {};

    function initMap() {
        console.log("init zones map");
        day_map = new google.maps.Map(document.getElementById('map'), {
            center: default_location,
            zoom: 13
        });

        // Change color of map depending on time of day
        map = nightMode(hour, day_map);

        // Infowindow is like a popup on the map
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

// If location finding has failed then show an infoWindow
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

// Night mode feature
    function nightMode(time, theMap) {
        // If the time is around 6PM change to Night Mode
        if (time >= 18 || time <= 7) {
            // Styles a map in night mode.
            theMap = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 33.793348, lng: -117.851350},
                zoom: 13,
                styles: [
                    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                    {
                        featureType: 'administrative.locality',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#d59563'}]
                    },
                    {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#d59563'}]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{color: '#263c3f'}]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#6b9a76'}]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{color: '#38414e'}]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#212a37'}]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#9ca5b3'}]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{color: '#746855'}]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#1f2835'}]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#f3d19c'}]
                    },
                    {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [{color: '#2f3948'}]
                    },
                    {
                        featureType: 'transit.station',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#d59563'}]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{color: '#17263c'}]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#515c6d'}]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.stroke',
                        stylers: [{color: '#17263c'}]
                    }
                ]
            });

        }
        return theMap;
    }

    $(document).ready(function () {
        //console.log(window.location.pathname);
        if(window.location.pathname == "/admin/bounds"){
            console.log("bounds ready ");
        $.get("/api/v1/zones", function (result) {
            var jzones = result.data;
            for (var i = 0; i < jzones.length; ++i) {
                var bounds = {
                    north: parseFloat(jzones[i].north),
                    south: parseFloat(jzones[i].south),
                    east: parseFloat(jzones[i].east),
                    west: parseFloat(jzones[i].west)
                };

                var name = jzones[i].name;
                zones[name] = {
                    id: jzones[i].id, rect: new google.maps.Rectangle({
                        bounds: bounds,
                        editable: false,
                        draggable: false,
                        strokeColor: '#045A8D',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#045A8D',
                        fillOpacity: 0.35
                    })
                };

                // Add rectangle object to dictionary
                zones[name].rect.setMap(map);
            }

        });

        var removeZone = $('#remove_zone');
        removeZone.click(function (event) {
            var zoneOption = $('#zone_list').find(":selected");
            var zoneName = zoneOption.text();
            // AJAX call to remove from database
            $.ajax({
                url: '/api/v1/zones/' + zones[zoneName].id,
                type: 'delete',
                success: function (result) {
                    // TODO: Do something to show that the zone was deleted
                    zones[zoneName].rect.setMap(null);
                    delete zones[zoneName];
                    zoneOption.remove();
                }
            });
        });

        var saveZone = $('#save_zone');
        saveZone.prop('disabled', true);
        $('#add_zone').click(function (event) {
            // Check if the zone field is not empty before adding rectangle to map
            var zoneName = document.getElementById('zone_name').value;
            if (!zoneName) return;
            $('#zone_name').prop("readonly", true);
            $('#add_zone').prop("disabled", true);
            $('#save_zone').prop('disabled', false);


            // These are the bounds around the university that PSAFE has given us
            var bounds = {
                north: 33.805033545182255,
                south: 33.776082751851,
                east: -117.83182508881,
                west: -117.8779956515
            };

            // Define the rectangle and set its editable property to true.
            var rectangle = new google.maps.Rectangle({
                bounds: bounds,
                editable: true,
                draggable: true,
                strokeColor: '#b2b4f6',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#b2b4f6',
                fillOpacity: 0.35
            });

            // Add rectangle object to dictionary
            rectangle.setMap(map);
            zones[zoneName] = rectangle;
            $('#zone_list').append('<option value=' + zoneName + '>' + zoneName + '</option>');
        });
        saveZone.click(function (event) {
            // UI updates; enable the add zone button, reset text value and enable the field, disable the save zone button
            $('#add_zone').prop('disabled', false);
            var zn = $('#zone_name');
            $('#save_zone').prop('disabled', true);

            var r = zones[zn.val()];
            var ne = r.getBounds().getNorthEast();
            var sw = r.getBounds().getSouthWest();
            var data = {
                "name": zn.val(),
                "north": ne.lat(),
                "south": sw.lat(),
                "east": ne.lng(),
                "west": sw.lng()
            };
            $.post("/api/v1/zones", data)
                .done(function (result) {
                    r.setMap(null);
                    var newrect = new google.maps.Rectangle({
                        bounds: r.bounds,
                        editable: false,
                        draggable: false,
                        strokeColor: '#045A8D',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#045A8D',
                        fillOpacity: 0.35
                    });
                    newrect.setMap(map);
                    zones[zn.val()] = {id: result.data.id, rect: newrect};
                    zn.val('').prop('readonly', false);
                });
        });

        }
    });