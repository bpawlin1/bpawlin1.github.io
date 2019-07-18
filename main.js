require([
          "esri/Map",
          "esri/views/MapView",
	  "esri/geometry/Point",
          "esri/symbols/SimpleMarkerSymbol",
	  "esri/graphic",
          "dojo/domReady!"
      ],
      function(
          Map, MapView, Point) {
          //create map 
          var map = new Map({
              basemap: "topo"
          });

          var lon = -95.7129;
          lat = 37.0902;

	  view.graphics.add(ptGraphic);

          //view the map 
          var view = new MapView({
              container: "viewDiv",
              map: map,
              zoom: 4,
              center: [lon, lat]
          });
      });
var pt = new Point({
  latitude: 40.792,
  longitude: -77.871 
});

var sym = new SimpleMarkerSymbol({
  color: "blue",
  style: "square",
  size: 12
});

var ptGraphic = new Graphic({
  geometry:pt,
  symbol:sym
});