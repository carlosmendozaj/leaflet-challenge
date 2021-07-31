// Store API
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
console.log("It's working")

//Request to URL:

d3.json(queryUrl).then(function(data) {
    
    createFeatures(data.features);
  });
  
  //Set up color scheme:

  function circleColor(depth){
    if (depth >90)
      return "DarkRed"; 
    else if (depth >70)
      return "Red";
    else if (depth >50)
      return "Orange";
    else if (depth >30)
      return "Yellow";
    else if (depth >10)
      return "Green";
    else return "Green";
  }

function createFeatures(earthquakeData) {

  //  Set up labels as a pop-up 
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + "Location: " + 
    feature.properties.place +
      "</h3><hr><p>" + "Date: "+ 
      new Date(feature.properties.time) + 
      "</p>"+ "<hr><p> Magnitude: " + 
      (feature.properties.mag) + 
       "   <hr>   Depth: " + 
       (feature.geometry.coordinates[2]) + 
       "</p>");
      
  }

  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer:function(feature,latlon){
        return new L.circle(latlon,
          {fillColor:circleColor(feature.geometry.coordinates[2]),
          color:"gray",
          radius:(feature.properties.mag)*20000,
          stroke: true,
          weight: 1,
          fillOpacity:0.8
          })
      },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Map Layers:
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

  var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  });


  // BaseMaps for layers
  var baseMaps = {
    "Grayscale": grayscale,
    "Satellite": satellite,
    "Outdoors": outdoors
  };

  // overlay for layers
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      35, -100
    ],
    zoom: 3,
    layers: [satellite ,earthquakes]
  });

  // Create a layer Select
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}