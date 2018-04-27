
var heatMapLocations = []

function initChartsMap() {
    map = new google.maps.Map(document.getElementById('heatMap'), {
        zoom: 13,
        center: {lat: 33.793348, lng: -117.85135},

    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapLocations,
        map: map
    });
}


function updateHeatMapPoints(lat, long){
    var newHeatMapPoint = new google.maps.LatLng(lat, long);
    heatMapLocations.push(newHeatMapPoint);
}