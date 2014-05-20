function sequences(kantonsdaten, kanton){
//http://bl.ocks.org/kerryrodden/7090426
// Dimensions of sunburst.
var width = 300;
var height = 250;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 290, h: 30, s: 3, t: 5
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

//clear former diagram
document.getElementById("sequence").innerHTML = '<span id="percentage"></span>';
document.getElementById("chart").innerHTML = "";

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
/*
d3.text("data/test.csv", function(text) {
  var csv = d3.csv.parseRows(text);
  //alert(csv);
  var json = buildHierarchy(csv);
  createVisualization(json);
});
*/

var csv = {};
csv.length = 0;
var i = 0;
var selectedColor = "green";
var notSelectedColor = "black";
document.getElementById("selected").style.background = selectedColor;
document.getElementById("notselected").style.background = notSelectedColor;
for (var dt in kantonsdaten[kanton]){
    if((dt=="Device")|(dt=="OS")|(dt=="Browser")|(dt=="total")|(dt=="selected")|(dt=="percent")){}else{
        for (var os in kantonsdaten[kanton][dt]){
            if(os=="amount"){}else{    
                for (var browser in kantonsdaten[kanton][dt][os]){
                    if(browser=="amount"){}else{
                        var percent = rpc(kantonsdaten[kanton][dt][os][browser],kantonsdaten[kanton].total);
                        csv[i] = {};
                        var color = notSelectedColor;
                        switch(selectionMode) {
                            case 0: color=selectedColor; break;
                            case 1: if(dt==Paint.Device){color=selectedColor;} break;
                            case 2: if(os==Paint.OS){color=selectedColor;} break;
                            case 3: if((dt==Paint.Device)&(os==Paint.OS)){color=selectedColor;} break;
                            case 4: if(browser==Paint.Browser){color=selectedColor;} break;
                            case 5: if((dt==Paint.Device)&(browser==Paint.Browser)){color=selectedColor;} break;
                            case 6: if((os==Paint.OS)&(browser==Paint.Browser)){color=selectedColor;} break;
                            case 7: if((dt==Paint.Device)&(os==Paint.OS)&(browser==Paint.Browser)){color=selectedColor;} break;
                        }
                        csv[i][0] = dt+';'+os+';'+browser;
                        csv[i][1] = percent;
                        csv[i][2] = color;
                        csv.length++;
                        i++;
                    }
                }
            }
        }
    }
}
//text = text.substring(0, text.length - 1);
var json = buildHierarchy(csv);
createVisualization(json);


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) {return d.color;})
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 }

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {
  //var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentage = rpc(d.value, totalSize);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
      .text(percentageString);

  d3.select("#percentage")
      .style("visibility", "");

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);
  d3.select("#canton").selectAll("path").each(function(i){
      if(this.id == currentKantonId){this.style.opacity = 1;}
  });

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  //d3.selectAll("path")
  d3.select("#chart").selectAll("path")
      .transition()
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });
            
  d3.selectAll("path")
      .style("opacity", 1);
            
  d3.select("#percentage")
      .transition()
      .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
  
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 100)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}


// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return d.color; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    //return "translate(" + i * (b.w + b.s) + ", 0)";
    return "translate(0, " + i * (b.h + b.s) + ")";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}


// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "color":"", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    var color = csv[i][2];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split(";");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode.children;
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    if(childNode.color!=selectedColor){childNode.color = color;}
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "color": color, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "color": color, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
}
}