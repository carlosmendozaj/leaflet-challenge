// Store API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

//Request to URL

d3.json(url).then(function(data) {
    createFeatures(data.features);
});

