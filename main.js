require([
          "esri/Map",
          "esri/views/MapView",
	  "esri/Graphic", 
	  "dojo/domReady!"
      ],
      function(
          Map, MapView,Graphic) {
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
              center: [lon, lat],
	            
          });
var point = {
        type: "point",
        longitude: -118.29507,
        latitude: 34.13501
      };

      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // orange
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });

      view.graphics.add(pointGraphic);
    });

      });

      