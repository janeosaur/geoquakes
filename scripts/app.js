// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

$(document).on("ready", function() {
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint ,
    dataType: "json",
    success: onSuccess
  });   // ajax
});  // doc on ready

function onSuccess(responseData) {
  var coord = [{lat: 37.78, lng: -122.44}]; // creates array starting with SF coord

  var output = responseData.features;

  output.forEach(function(item, index) {
    var newOutput = output[index].properties.title;
    $("#info").append('<p>' + newOutput + '</p>');
    var findLatLng = output[index].geometry.coordinates;
    // console.log(findLatLng); // to test

    findLatLng.pop(); // remove Depth
    findLatLng.reverse(); // need turn this into object and feed into maps
    // console.log(findLatLng); // to test

    var coordObj = {}; // to turn it into object
      coordObj['lat'] = findLatLng[0];
      coordObj['lng'] = findLatLng[1];
      coord.push(coordObj);
      // console.log(coord); // test
    })
    google.maps.event.addDomListener(window, 'load', initMap(coord));
  }

var sfLatLng = {lat: 37.78, lng: -122.44};

function initMap(coord) {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: sfLatLng,
    zoom: 1,
	});

	for (i =0; i < coord.length; i ++) {
	 	var marker = new google.maps.Marker({
      position: coord[i],
      map: map,
		});
	}
}    
