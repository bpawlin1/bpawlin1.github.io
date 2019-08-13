require([
      "esri/Map",
      "esri/views/MapView","esri/layers/FeatureLayer"
    ], function(Map, MapView, FeatureLayer) {

      var map = new Map({
        basemap: "topo-vector"
      });

      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543,34.02700],
        zoom: 13
      });
var trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
      });

      map.add(trailheadsLayer);
    });