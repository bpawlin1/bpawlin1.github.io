require(["esri/Map", "esri/views/MapView", "esri/layers/TileLayer"], function(Map, MapView,TileLayer) {
        
var transportationLayer = new TileLayer({url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",id: "streets", opacity: 0.7});

var housingLayer = new TileLayer({url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",id: "ny-housing"});

var map = new Map({basemap: "oceans", layers: [housingLayer]});
        var view = new MapView({
          container: "viewDiv", // Reference to the scene div created in step 5
          map: map, // Reference to the map object created before the scene
          zoom: 4, // Sets zoom level based on level of detail (LOD)
          center: [-73, 40] // Sets center point of view using longitude,latitude
        });
      });