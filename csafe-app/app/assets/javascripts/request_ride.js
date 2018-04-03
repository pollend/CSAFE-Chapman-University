

var autocompletePickUp, autocompleteDropOff;
var start_pos,end_pos;
var directionDisplay;
var directionsService;

var markers = [];


function initAutocompleteRequestMap(map) {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();


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


    // use address to get lat long
    google.maps.event.addListener(autocompletePickUp, 'place_changed', function() {
        try {

            bounds = getBoundsRequestMap();

            console.log(bounds);
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
                        path: mapIcons.shapes.MAP_PIN,
                        fillColor: '#7d22bd',
                        fillOpacity: 1,
                        strokeColor: '',
                        strokeWeight: 0,
                        scale: 2/3
                    },
                    map_icon_label: '<span class="map-icon"></span>'
                });

                directionsDisplay = new google.maps.DirectionsRenderer({
                    map: map
                });


                console.log(lat);
                console.log(lng);
                start_pos = pickUpPos;
                console.log("START" + start_pos);
            }

            else{
                console.log("nah")
                document.getElementById('errorPickUp').innerHTML = "Please make sure your pick up location is within our map bounds"
            }

        }
        catch(err) {
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
                        path: mapIcons.shapes.MAP_PIN,
                        fillColor: '#ee2727',
                        fillOpacity: 1,
                        strokeColor: '',
                        strokeWeight: 0,
                        scale: 2/3
                    },
                    map_icon_label: '<span class="map-icon"></span>'
                });

                console.log(lat);
                console.log(lng);
                end_pos = dropOffPos;

                console.log("START \n" + start_pos.value + "END\n" + end_pos.value);

                // Set destination, origin and travel mode.
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
                        //  clearMarkers();
                        console.log("REACHED DIRECTIONS");
                        directionsDisplay.setDirections(response);

                    }

                });
            }
            else{
                console.log("nah")
                document.getElementById('errorDropOff').innerHTML = "Please make sure your drop off destination is within our map bounds"
            }
        } catch(err) {
            console.log(err.message);
            document.getElementById('errorDropOff').innerHTML = "Please use the drop down menu to choose your address"
        }
    });
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


//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {

    console.log("Request a ride pressed")
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    console.log("current index")
    console.log($("fieldset").index(current_fs));
    console.log("next index")
    console.log($("fieldset").index(next_fs));


    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");


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



//Used for Way Points between start and finish

function calcRoute(start_pos,end_pos) {
    alert("REACHED CALC ROUTE");
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



//Just for me - Omar
// <div class="card mb-3">
    //     <div class="card-header">
    //     <i class="fa fa-table"></i>Hours of Operation</div>
    // <div class="card-body">
    //     <div class="table-responsive">
    //     <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    //     <thead>
    //     <tr>
    //     <th>Day of Week</th>
    // <th>Start Time</th>
    // <th>End Time</th>
    // <th>Enabled?</th>
    // </tr>
    // </thead>
    // <tfoot>
    // <tr>
    // <th>Day of Week</th>
    // <th>Start Time</th>
    // <th>End Time</th>
    // <th>Enabled?</th>
    // </tr>
    // </tfoot>
    // <tbody>
    // <% @hours.each do |hours| %>
    // <tr>
    // <td><%= hours.email %></td>
    //     <td><input id="st_<%= hours.id %>" type="time" value="<%= hours.email %>"></td>
    //     <td><input id="et_<%= hours.id %>" type="time" value="<%= hours.email %>"></td>
    //
    //     </tr>
    //     <% end %>
    //     </tbody>
    //     </table>
    //     <input id="save_hours" type=button value="Save Hours">
    //     </div>
    //     </div>
    //     </div>
