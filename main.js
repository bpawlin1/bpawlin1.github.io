require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], function(Map, MapView,FeatureLayer) {
        
var trailheadsLayer = new FeatureLayer({url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",opacity: 0.7});



var map = new Map({basemap: "oceans", layers: [trailheadsLayer]});
        var view = new MapView({
          container: "viewDiv", // Reference to the scene div created in step 5
          map: map, // Reference to the map object created before the scene
          zoom: 10, // Sets zoom level based on level of detail (LOD)
           center: [-73.87, 40.70]  // Sets center point of view using longitude,latitude
        });
      });