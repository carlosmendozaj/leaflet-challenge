// Store API
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
console.log("It's working")

//Request to URL:

d3.json(queryUrl).then(function(data) {
    
    createFeatures(data.features);
  });
  
  //Set up colo scheme:

  function circleColor(depth){
    if (depth >90)
      return "#cc0000"; 
    else if (depth >70)
      return "#ff6600";
    else if (depth >50)
      return "#ff9966";
    else if (depth >30)
      return "#ffff00";
    else if (depth >10)
      return "#33cc33";
    else return "#00ff00";
  }

