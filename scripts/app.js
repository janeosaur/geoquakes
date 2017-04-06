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
  var newmarker = new google.maps.Marker({
      position: {lat: 13.6183, lng: 121.0218},
      map: map,
    });
  };

  google.maps.event.addDomListener(window, 'load', initMap);


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

      var coordObj = {}; // to turn it into object
        coordObj['lat'] = findLatLng[0];
        coordObj['lng'] = findLatLng[1];
        console.log(coordObj); // test
      })}
      // newMap();

      // function newMap() {
      //       // var myLatlng = new google.maps.LatLng(findLatLng[0], findLatLng[1]); this might get rid of need to turn into object
      //       // var myLatlng = coordObj;
      //
      //       // var map = new google.maps.Map(document.getElementById('map'), {
      //       //           zoom: 2,
      //       //           center: coordObj
      //       //         });
      //
      //       var newmarker = new google.maps.Marker({
      //                 position: coordObj,
      //                 map: map,
      //               });
      //           newmarker.setMap();
      //     }})};
