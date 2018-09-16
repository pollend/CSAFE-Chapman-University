
var pickUpHeatMapLocations = [];
var dropOffHeatMapLocations = [];

function initChartsMap() {
    mapOne = new google.maps.Map(document.getElementById('pickUpheatMap'), {
        zoom: 13,
        center: {lat: 33.793348, lng: -117.85135},

    });
    mapTwo = new google.maps.Map(document.getElementById('dropOffheatMap'), {
        zoom: 13,
        center: {lat: 33.793348, lng: -117.85135},

    });


    $.get("/api/v1/rides", function (result) {
        var allRides = result.data;
        for (var i = 0; i < allRides.length; ++i) {
            var pickupLocationLat = allRides[i].start_loca_lat;
            var pickupLocationLong = allRides[i].start_loca_lng;



            var dropOffLocationLat = allRides[i].end_loca_lat;
            var dropOffLocationLong = allRides[i].end_loca_lng;

            updatePickUpHeatMapPoints(pickupLocationLat, pickupLocationLong);

            updateDropOffHeatMapPoints(dropOffLocationLat, dropOffLocationLong);
        }


    });

    pickUpheatmap = new google.maps.visualization.HeatmapLayer({
        data: pickUpHeatMapLocations,
        map: mapOne
    });

    dropOffheatMap = new google.maps.visualization.HeatmapLayer({
        data: dropOffHeatMapLocations,
        map: mapTwo
    });


}


function updatePickUpHeatMapPoints(lat, long){
    var newHeatMapPoint = new google.maps.LatLng(lat, long);
    pickUpHeatMapLocations.push(newHeatMapPoint);

    pickUpheatmap = new google.maps.visualization.HeatmapLayer({
        data: pickUpHeatMapLocations,
        map: mapOne
    });


}
function updateDropOffHeatMapPoints(lat, long){
    var newHeatMapPoint = new google.maps.LatLng(lat, long);
    dropOffHeatMapLocations.push(newHeatMapPoint);

    dropOffheatMap = new google.maps.visualization.HeatmapLayer({
        data: dropOffHeatMapLocations,
        map: mapTwo
    });


}

function getUser() {

    $.get("/api/v1/admin/getRidesToday", function (result) {
        console.log(result.data);

    });

}


$(document).ready(function() {
    $("#testButton").click(function () {
        console.log("heyy");
        getUser();
    });

    var btn = $('#BackToTopCharts');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });
});





