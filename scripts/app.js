// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

$(document).on("ready", function() {
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint ,
    dataType: "json",
    success: onSuccess
  });   // ajax

  var sfLatLng = {lat: 37.78, lng: -122.44};
  function initMap() {
  	var map = new google.maps.Map(document.getElementById('map'), {
  	  center: sfLatLng,
  	  zoom: 2
    });
   	var marker = new google.maps.Marker({
        position: sfLatLng,
        map: map,
        title: 'Hello World!'
  	  });   // marker
    };

    google.maps.event.addDomListener(window, 'load', initMap);

});  // doc on ready


  function onSuccess(responseData) {

    var output = responseData.features;
    output.forEach(function(item, index) {
    	var newOutput = output[index].properties.title;
    	$("#info").append('<p>' + newOutput + '</p>');
    	var findLatLng = output[index].geometry.coordinates;
    	// console.log(findLatLng); // to test

      findLatLng.pop();
      findLatLng.reverse(); // need turn this into object and feed into maps
      // console.log(findLatLng); // to test

      var coordObj = {};
        coordObj['lat'] = findLatLng[0];
        coordObj['lng'] = findLatLng[1];
      console.log(coordObj); // test

})};



//       var marker = new google.maps.Marker({
//           position: findLatLng,
//           title: 'Hello World!'
//         });   // marker
//
//       var mapOptions = {
//         zoom: 1,
//         center: findLatLng
//       };
//
//       marker.setMap();
//
//       google.maps.event.addDomListener(window, 'load', mapOptions);
//     ;
//




// }
