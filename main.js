require(["esri/Map", "esri/views/MapView", "esri/layers/TileLayer"], function(Map, MapView,TileLayer) {
        
var transportationLayer = new TileLayer({url: "https://services3.arcgis.com/f8FBNX4bfDyc804R/arcgis/rest/services/Locations/FeatureServer",opacity: 0.7});



var map = new Map({basemap: "oceans", layers: [housingLayer]});
        var view = new MapView({
          container: "viewDiv", // Reference to the scene div created in step 5
          map: map, // Reference to the map object created before the scene
          zoom: 10, // Sets zoom level based on level of detail (LOD)
           center: [-73.87, 40.70]  // Sets center point of view using longitude,latitude
        });
      });