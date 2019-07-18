require([
          "esri/Map",
          "esri/views/MapView",
          "dojo/domReady!"
      ],
      function(
          Map, MapView
      ) {
          //create map 
          var map = new Map({
              basemap: "topo"
          });

          var lon = -95.7129;
          lat = 37.0902;

          //view the map 
          var view = new MapView({
              container: "viewDiv",
              map: map,
              zoom: 4,
              center: [lon, lat]
          });
      });