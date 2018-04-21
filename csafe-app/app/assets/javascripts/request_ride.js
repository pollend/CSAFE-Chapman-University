var autocompletePickUp, autocompleteDropOff;
var start_pos,end_pos;
var directionDisplay;
var directionsService;
var waypoint_count = 0;
var input_Clear = document.getElementById("searchclear");
var markerArray = [];
var routes = [];
var pickCount = 0;
var dropCount = 0;
var radio_count = 0;
var dest_map;
var dest_marker;
var rdn_btn_doc = document.getElementsByName('optradio');



function initAutocompleteRequestMap(map) {

    //Create the autocomplete object, restricting the search to geographical
    //location types.
    //directionsDisplay = new google.maps.DirectionsRenderer({map: map});

    var directionsService = new google.maps.DirectionsService();
    var stepDisplay = new google.maps.InfoWindow;
    var service = new google.maps.DistanceMatrixService();

    autocompletePickUp = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    autocompleteDropOff = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
        {types: ['geocode']});

    pickUpmarker = new mapIcons.Marker({
    });
    dropOffMarker = new mapIcons.Marker({
    });

    directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });



    // use address to get lat long
    google.maps.event.addListener(autocompletePickUp, 'place_changed', function() {

        try {
            bounds = getBoundsRequestMap();

            var rectangle = new google.maps.Rectangle({
                bounds: bounds,
                editable: false,
                draggable: false
            });
            var place = autocompletePickUp.getPlace();
            var lat = place.geometry.location.lat(),
                lng = place.geometry.location.lng();


            document.getElementById('errorPickUp').innerHTML = ""
            //PickUp
            var pickUpPos = {
                lat: lat,
                lng: lng
            };

            if (rectangle.getBounds().contains(pickUpPos)){
                console.log("contains")
                start_pos = pickUpPos;
                pickUpmarker.setMap(null);
                //DropOff
                pickUpmarker = mapIcons.Marker({
                    map: map,
                    position: pickUpPos,
                    icon: {
                  //      path: mapIcons.shapes.MAP_PIN,
                        fillColor: '#7d22bd',
                        fillOpacity: 1,
                        strokeColor: '',
                        strokeWeight: 0,
                        scale: 2/3
                    },
                    map_icon_label: '<span class="map-icon"></span>'
                });
                start_pos = pickUpPos;
            }else{
                console.log("nah")
                document.getElementById('errorPickUp').innerHTML = "Please make sure your pick up location is within our map bounds"
            }}catch(err) {
                console.log(err.message);
                document.getElementById('errorPickUp').innerHTML = "Please use the drop down menu to choose your address"
        }
    });

    google.maps.event.addListener(autocompleteDropOff, 'place_changed',  function() {

        try {
            var place = autocompleteDropOff.getPlace();
            var lat = place.geometry.location.lat(),
                lng = place.geometry.location.lng();
            document.getElementById('errorDropOff').innerHTML = ""
            //dropOff
            var dropOffPos = {
                lat: lat,
                lng: lng
            };

            if (rectangle.getBounds().contains(dropOffPos)) {
                console.log("contains")
                end_pos = dropOffPos;
                dropOffMarker.setMap(null);
                dropOffMarker = mapIcons.Marker({
                    map: map,
                    position: dropOffPos,
                    icon: {
                      //  path: mapIcons.shapes.MAP_PIN,
                        fillColor: '#ee2727',
                        fillOpacity: 1,
                        strokeColor: '',
                        strokeWeight: 0,
                        scale: 2/3
                    },
                    map_icon_label: '<span class="map-icon"></span>'
                });
                dest_marker = dropOffMarker;
                  end_pos = dropOffPos;
            }else{
                console.log("nah")
                document.getElementById('errorDropOff').innerHTML = "Please make sure your drop off destination is within our map bounds";
                directionsDisplay.setDirections({ routes: [] });
            }} catch(err) {
              console.log(err.message);
              document.getElementById('errorDropOff').innerHTML = "Please use the drop down menu to choose your address";
        }
        setMAPWAY(start_pos,end_pos);
    });


    function setMAPWAY(start_pos,end_pos){

        setWaypoint(start_pos,end_pos,markerArray,stepDisplay);
          // Listen to change events from the start and end lists.
          document.getElementById('autocomplete').addEventListener('change', function(){
            pickUpmarker.setMap(null);
            pickCount++;
            callDisplay();
            });
          document.getElementById('autocomplete2').addEventListener('change', function(){
            dropOffMarker.setMap(null);
            dropCount++;
            //cancelDirections();
            //setWaypoint(start_pos,end_pos,markerArray,stepDisplay);
            callDisplay();
        });
      /*
        alert("DROP:\n" + dropCount + "PICK:\n" + pickCount);

        if (pickCount != dropCount) {
              alert("SET NEW WAYPOINT");
              alert("DROP:\n" + dropCount + "PICK:\n" + pickCount);
              //  console.log("CONFUSED");
              cancelDirections();
              alert("SET NEW IN PICK ");
              setWaypoint(start_pos,end_pos,markerArray,stepDisplay);

                  }else {
                    alert("CANCEL");
                    alert("DROP:\n" + dropCount + "PICK:\n" + pickCount);
                    cancelDirections();
                    alert("SET NEW IN DROP ");
                    setWaypoint(start_pos,end_pos,markerArray,stepDisplay);
              }
      */
    }


    function callDisplay(){ calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);}
    function cancelDirections(){ directionsDisplay.setDirections({ routes: [] }); }

//SET WAYPOINTS ------
    function setWaypoint(start_pos,end_pos, markerArray, stepDisplay,){
      // Set destination, origin and travel mode.
      // First, remove any existing markers from the map.
      var request = {
          destination: end_pos,
          origin: start_pos,
          travelMode: 'DRIVING'
      };
      // Pass the directions request to the directions service.
      var directionsService = new google.maps.DirectionsService();

      directionsService.route(request, function(response, status) {

          if (status == 'OK') {
              // Display the route on the map.
              document.getElementsByClassName('map-icon')[0].style.visibility = 'hidden';
              directionsDisplay.setDirections(response);
          } else {
                window.alert('Directions request failed due to ' + status);
              }
          });
    }

         // Sets the map on all routes in the array.
    function setMapOnAll(map) {
    //  alert("SET MAP ON ALL")
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(map);
          //  alert("SET MAP ON ALL INSIDE ROUTES")
        }
    }
      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        directionDisplay = null;
        pickUpmarker.setMap(null);
        dropOffMarker.setMap(null);
      }


    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate(pickUpOrDropOff) {
        console.log(pickUpOrDropOff);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                if(pickUpOrDropOff == "pickUp"){
                    autocompletePickUp.setBounds(circle.getBounds());
                }
                else if(pickUpOrDropOff == "dropOff"){
                    autocompleteDropOff.setBounds(circle.getBounds());
                }
            });
        }
    }
}
// ------- END ON INIT AUTOCOMPLETE FUNCTION ------ //////
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var count = 0;
$(document).on('click', '.next', function () {

    var the_rdn = radioCheck();

    for (var i = 0, length = rdn_btn_doc.length; i < length; i++)
      {
        radio_count++;
          if (rdn_btn_doc[i].checked)
            {
              radio_count = radio_count;
              break;
            }
      }

    if (the_rdn === true && autocomplete.value !== '' && autocomplete2.value !== '' && phone.value !== '' ) {

    count++;
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    console.log("current index")
    console.log($("fieldset").index(current_fs));
    console.log("next index")
    console.log($("fieldset").index(next_fs));

    if ($("fieldset").index(current_fs) === 1) { //ON OUR WAY

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    if (animating) return false;
    animating = true;

    console.log( "CURRENT FIELD SET " + $("fieldset").index(current_fs));

  }else {
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
    riderRequestInfo(autocomplete.value,autocomplete2.value,phone.value,radio_count);

  } }else {
    console.log("Error, fields are not filled");
  }
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

function riderRequestInfo(start_loc, end_loc,contact,passenger){ /////INFO TO PASS ON TO ADMIN
    var startLocationLat = start_pos.lat;
    var startLocationLong = start_pos.lng;
    var endLocationLat = end_pos.lat;
    var endLocationLong = end_pos.lng;
    var phoneNumber = contact;
    var startAddress = start_loc;
    var endAddress = end_loc;


    console.log("Requesting a ride");

    var data = {"start_loca_lat" : startLocationLat,"start_loca_lng" : startLocationLong,"end_loca_lat" : endLocationLat,
        "end_loca_lng":endLocationLong,"phone_number":phoneNumber,"start_address":startAddress,"end_address":endAddress};

    $.ajax({
        url: '/api/v1/rides/',
        type: 'POST',
        data: data,
        success: function(result) {
            console.log("requested!");
            // refreshes the table
            console.log(result);
            App.ride_request.notify(result.data.id);
        }
    });

    //params for ref
    // params.permit(:start_loca_lat,:start_loca_lng,:end_loca_lat,:end_loca_lng,:phone_number,:start_address,:end_address,:accepted,:departed,:complete,:eta)


}

//Used for Way Points between start and finish
function calcRoute(start_pos,end_pos) {

    var request = {
        origin: start_pos,
        destination: end_pos,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
};

$(".submit").click(function () {
    return false;
});

$(document).ready(function () {
    $("#phone").mask('(000) 000-0000');
});

function radioCheck(){
  if ($('input[name=optradio]:checked').length > 0) {
      return true;
  }else{
    return false;
  }
}

var type = 0;
function inputClear(){ //CLEAR BUTTON PICK UP
  $("#autocomplete").val(' ');
  type = 1;
  clearBtnMap(type);
  //cancelDirections();
}
function dropClear(){ //CLEAR BUTTON DROP OFF
  $("#autocomplete2").val(' ');
  type = 2;
  clearBtnMap(type);
  //cancelDirections();
}

function clearBtnMap(type){
  switch (type) {
    case 1:
      pickUpmarker.setMap(null);
      break;
    case 2:
      dropOffMarker.setMap(null);
      break;
    default:
  }
}

$("#cancelRide-btn").click(function () {
    alert("CANCEL RIDE");
});





var theL;
var theLong;

function getCurrentLocation(){
inputClear();

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
        //   infoWindow.setPosition(pos);

           console.log("THE REAL POSITION" + pos.value);
          // Create a marker and set its position.

          location = theL + "," + theLong;
        //  geocodeLatLng(geocoder,map,infoWindow,location);

          var marker = new google.maps.Marker({
              map: map,
              position: pos
          });

          infoWindow.open(map);
        //  alert("POSITION" + position.value);
          console.log(position.value);
          autocomplete.value = pos;
          /*
          map.setZoom(16);
          map.setCenter(pos); //SET LOCATION

          autocomplete.value = pos;

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
          */

        //  currentLocField.value = aMap.getCenter(); //Location to be sent to PSAFE; getCenter() is OUTDATED
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
}
var setT;

function updateTimer() {
  arrival  = Date.parse("April 17, 2018 19:52:00"); //Estimated TIME OF ARRIVAL FOR PSAFE
  now  = new Date(); //DATE AT THE MOMENT

  diff = arrival - now;

  days = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours = Math.floor( diff / (1000*60*60) );
  mins  = Math.floor( diff / (1000*60) );
  secs  = Math.floor( diff / 1000 );

  m = mins  - hours * 60;
  s = secs  - mins  * 60;


  if (m === 0 && s === 0) {
    myStopFunction();

  }

  document.getElementById("timer")
    .innerHTML =
      '<div>' + hours + '<span>Hours</span></div>' +
      '<div>' + m + '<span>minutes</span></div>' +
      '<div>' + s + '<span>seconds</span></div>' ;
}
setT = setInterval('updateTimer()', 1000);

function myStopFunction() {
    clearInterval(setT);
}
