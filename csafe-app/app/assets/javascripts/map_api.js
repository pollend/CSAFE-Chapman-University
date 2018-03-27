
function radiusParam(map){ //RADIUS FOR PSAFE TO PICK UP
var rectangle;

var bounds = { //PARAMS OF PSAFE TO ALLOW PICKUP
          north: 33.805033545182255,
          south: 33.776082751851,
          east: -117.83182508881,
          west: -117.8779956515
        };
        // Define the rectangle and set its editable property to true.
        rectangle = new google.maps.Rectangle({
          bounds: bounds,
          editable: false,
          draggable: false
        });
  rectangle.setMap(map);
}


function nightMode(time, theMap){ //NIGHT MODE FEATURE

  if (time >= 18 || time <= 7) { //if the time is around 6PM change to Night Mode
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

       } else {
         theMap = theMap; //it is not dark
      }

    radiusParam(theMap);
    return theMap;
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//We should probably have some pop-up explaining that^

var map,map2, infoWindow;
var date = new Date();
var hour = date.getHours();
var default_location = {lat: 33.793348, lng: -117.851350};
var current_location_fiel = document.getElementById("crn_lcl")
var current_location_fiel2 = document.getElementById("crn_lcl2")

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: default_location,
        zoom: 13
    });

    $.getScript("request_ride.js", function() {
        initAutocomplete()
    });

    configMap(map, current_location_fiel);

}

function configMap(aMap, currentLocField){

    map = nightMode(hour,aMap); //map depending on the time of the day

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //  infoWindow.setPosition(pos);
            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: aMap,
                position: pos,
            });
            infoWindow.open(map);

            aMap.setZoom(16);
            aMap.setCenter(pos); //SET LOCATION

            aMap.addListener('center_changed', function() {
                // 3 seconds after the center of the map has changed, pan back to the
                // marker.
                window.setTimeout(function() { //MARKER PAN ON CLICK EVENT
                    map.panTo(marker.getPosition());
                }, 3000);
            });

            aMap.addListener('click', function() { //ZOOM IN ON MARKER
                aMap.setZoom(18);
                aMap.setCenter(marker.getPosition());
            });

            currentLocField.value = aMap.getCenter(); //Location to be sent to PSAFE

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function geocodeLatLng(geocoder, map, infowindow) {
    var input = document.getElementById('latlng').value;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) { //IF LOCATION FAILED
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


