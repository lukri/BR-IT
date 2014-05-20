function loadMap() {
    //var width = window.innerWidth-100, height = window.innerHeight-100;
    var width = "99%", height = "100%";
    var vis = d3.select("#map").append("svg:svg").attr('width', width).attr('height', height);
    var po = org.polymaps;
    
    var map = po.map()
                .container(vis.node());
    
    var geoData = po.geoJson()
        .url("data/switzerland.json")
        .on("load", load)
        .id("canton");
        
    map.add(geoData)
        .center({
              lat: 46.8,
              lon: 9
          })
          .zoom(8)
          .zoomRange([6,9])
          .add(po.interact());

    map.add(po.compass());
    
    function load(e) {
      for (var i = 0; i < e.features.length; i++) {
        var feature = e.features[i];
        feature.element.setAttribute("id", feature.data.id);
        feature.element.setAttribute("class", "canton");
        feature.element.setAttribute("name", feature.data.properties.Name);
        //console.log(feature.data.id);
        feature.element.setAttribute("onclick", "printData(this);");
      }
    }
    
}