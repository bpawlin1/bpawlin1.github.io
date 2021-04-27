// Pasword zone
    function passWord() 
  {
  var testV = 1;
  var pass1 = prompt('Please Enter Your Password',' ');
    while (testV < 3) {
      if (!pass1) 
          history.go(-1);
      if (pass1.toLowerCase() == "letmein") {
          alert('You Got it Right!');
          location.href = "ProtectedPage.html";
      break;
  } 
    testV+=1;
    var pass1 = 
    prompt('Access Denied - Password Incorrect, Please Try Again.','Password');
  }
    if (pass1.toLowerCase()!="password" & testV ==3) 
    history.go(-1);
    return " ";
  } 



// map view
    
    require(["esri/Map", "esri/views/MapView","esri/layers/FeatureLayer"], function(Map, MapView,FeatureLayer) {
        var map = new Map({
          basemap: "terrain"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 13,
          center: [-118.80543,34.02700] // longitude, latitude
        });
// Trailheads feature layer (points)
      var trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
      });

      map.add(trailheadsLayer);
      });
  
	// Create a request variable and assign a new XMLHttpRequest object to it.



