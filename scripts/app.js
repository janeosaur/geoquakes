// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

$(document).on("ready", function() {
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint ,
    dataType: "json",
    success: onSuccess
  });   // ajax
});  // doc on read


function onSuccess(responseData) {
  var coord = [{lat: 37.78, lng: -122.44}]; // creates array starting with SF coord

  var output = responseData.features;

  output.forEach(function(item, index) {
    var timeOutput = output[index].properties.time;
    var today = Date.now();
    var hoursAgo = Math.floor((today-timeOutput)/(1000*60*60));
    var newOutput = output[index].properties.title;
    // template string attempt
    $("#info").append(`<p> ${newOutput} / ${hoursAgo} hours ago </p>`);
    // $("#info").append('<p>' + newOutput + ' / ' + hoursAgo + ' hours ago </p>');

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
