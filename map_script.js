var ourLoc;
var view;
var map;

function init(){
  ourLoc = ol.proj.fromLonLat([-73.9810534,40.7580656]);
  view = new ol.View({
    center: ourLoc,
    zoom: 10
  });

  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    loadTilesWhileAnimating: true,
    view: view
  });
  var button = document.getElementById("myButton");
  button.onclick = panHome;

  var panButton = document.getElementById("panButton");
  panButton.onclick = panToLocation;
}

function panHome(){
  view.animate({
    center: ourLoc,
    duration: 2000, // 2 seconds
    zoom: 18
  });
}

function panToLocation(){
  var countryName = document.getElementById("country-name").value;
  if(countryName == ""){
    alert("You didn't enter a country name!");
    return;
  }

  var query = "https://restcountries.eu/rest/v2/name/"+countryName;

  var lon = 0.0;
  var lat = 0.0;

  // error checking
  query = query.replace(/ /g, "%20");
  alert(query);

  //make our http GET request:
  var countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', query, false);
  countryRequest.send();

//  alert("Ready State " + countryRequest.readyState);
//  alert("Status " + countryRequest.status);
//  alert("Response " + countryRequest.responseText);

  if(countryRequest.readyState != 4 || countryRequest.status != 200 ||
    countryRequest.responseText==""){
      alert("Request had an error!");
      return;
    }

    var countryInfo = JSON.parse(countryRequest.responseText);

    lat = countryInfo[0].latlng[0];
    lon = countryInfo[0].latlng[1];

    alert(countryName + ":lon " + lon + "& lat " + lat);
    var location = ol.proj.fromLonLat([lon, lat]);

  view.animate({
    center: location,
    duration: 2000,
    zoom: 10
  });
}
window.onload = init;
