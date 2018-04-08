var bounds;
var geocoder;
var location;
function radiusParamRequestMap(map){ //RADIUS FOR PSAFE TO PICK UP
bounds = { //PARAMS OF PSAFE TO ALLOW PICKUP
          north: 33.805033545182255,
          south: 33.776082751851,
          east: -117.83182508881,
          west: -117.8779956515
        };

    console.log("bounds");
    console.log(bounds);
        // Define the rectangle and set its editable property to true.
        rectangle = new google.maps.Rectangle({
          bounds: bounds,
          editable: false,
          draggable: false
        });
  rectangle.setMap(map);
}

function getBoundsRequestMap(){
    console.log("getting bounds");
    return bounds;
}

function nightModeRequestMap(time, theMap){ //NIGHT MODE FEATURE

    console.log("night or day");
  if (time >= 18 || time <= 7) { //if the time is around 6PM change to Night Mode
  // Styles a map in night mode.
      console.log("night time map")
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
      console.log("day time map")
         theMap = theMap; //it is not dark
      }

    console.log("setting radius")
    radiusParamRequestMap(theMap);
    return theMap;
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//We should probably have some pop-up explaining that^

var map, infoWindow;
var date = new Date();
var hour = date.getHours();
var default_location = {lat: 33.793348, lng: -117.851350};
var current_location_fiel = document.getElementById("crn_lcl")

function initRideMap() {
    console.log("init map request");

    map = new google.maps.Map(document.getElementById('map'), {
        center: default_location,
        zoom: 13
    });
        configRequestMap(map, current_location_fiel);
        initAutocompleteRequestMap(map);

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        function geocodeLatLng(geocoder, map, infowindow, input) {
          alert("Reached GEO CODE");
          geocoder = new google.maps.Geocoder;
          var latlngStr = input.split(',', 2);
          var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
            geocoder.geocode({'location': latlng}, function(results, status) {
              alert("REACHED GEOCODE");
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
}

function configRequestMap(aMap, currentLocField){
    map = nightModeRequestMap(hour,aMap); //map depending on the time of the day
    infoWindow = new google.maps.InfoWindow;
  //  getCurrentLocation();
}


var theL;
var theLong;

function getCurrentLocation() {

geocoder = new google.maps.Geocoder;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {

      console.log("Current Location");
      navigator.geolocation.getCurrentPosition(function(position) {
        theL = position.coords.latitude;
        theLong = position.coords.longitude;
          var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
           infoWindow.setPosition(pos);

           console.log("THE REAL POSITION" + pos.value);
          // Create a marker and set its position.

          location = theL + "," + theLong;
          geocodeLatLng(geocoder,map,infoWindow,location);

          var marker = new google.maps.Marker({
              map: map,
              position: pos
          });

          infoWindow.open(map);
          alert("POSITION" + position.value);
          console.log(position.value);
          map.setZoom(16);
          map.setCenter(pos); //SET LOCATION

          $("#autocomplete").val(pos);

          map.addListener('center_changed', function() {
              // 3 seconds after the center of the map has changed, pan back to the
              // marker.
              window.setTimeout(function() { //MARKER PAN ON CLICK EVENT
                  map.panTo(marker.getPosition());
              }, 3000);
          });

          map.addListener('click', function() { //ZOOM IN ON MARKER
              map.setZoom(18);
              map.setCenter(marker.getPosition());
          });

        //  currentLocField.value = aMap.getCenter(); //Location to be sent to PSAFE; getCenter() is OUTDATED
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
