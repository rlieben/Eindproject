/*

Course: Endproject
Minor programming, University of Amsterdam
Raoul Lieben
10556346

makeNetwork.js : creates the network graph and adds the drag events

*/


// margins network graph
var	graphmargin = {top: 100, bottom: 100, left: 25, right: 50, gap:50},
	graphwidth = 500 + graphmargin.left + graphmargin.right,
	graphheight = 300 + graphmargin.top + graphmargin.bottom;

// appends nonfrail network svg to div element
var svggraphnonfrail = d3.select("#nonfrailnetwork")
	.append("svg")
	.attr("id", "svgnf")
	.attr("width", graphwidth)
	.attr("height", graphheight);

// appends frail network svg to div element
var svggraphfrail = d3.select("#frailnetwork")
  	.append("svg")
  	.attr("id", "svgf")
	.attr("width", graphwidth)
	.attr("height", graphheight);

// color scheme network graph
var colorgraph = d3.scaleOrdinal(d3.schemeCategory10);

// simulation for force in nonfrail network
var simulationnonfrail = d3.forceSimulation()
	.force("link", d3.forceLink().id(function(d){ 

		return d.id; 
	}))
	.force("charge", d3.forceManyBody())
	.force("center", d3.forceCenter(graphwidth / 2, graphheight / 2));

// simulation for force in frail network
var simulationfrail = d3.forceSimulation()
	.force("link", d3.forceLink().id(function(d){ 

		return d.id; 
	}))
	.force("charge", d3.forceManyBody())
	.force("center", d3.forceCenter(graphwidth / 2, graphheight / 2));

// creates the network graph
function makeNetwork(graphdatanonfrail, graphdatafrail){
	
	// creates links of non frail data
	var linknonfrail = svggraphnonfrail.append("g")
		.attr("class", "links")
		.selectAll("line")
		.data(graphdatanonfrail.links)
		.enter()
		.append("line")
		.attr("stroke-width", function(d){ 

			return Math.sqrt(d.value); 
		});


	// creating nodes of non frail data
	var nodenonfrail = svggraphnonfrail.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graphdatanonfrail.nodes)
		.enter()
		.append("circle")
		.attr("id", function(d){ 

			return "svgnf" + d.id.toString()
		})
		.attr("r", "5px")
		.attr("fill", function(d){ 

			return colorgraph(d.group); 
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	// adding tooltip on mouseover and selection of clicked element
	nodenonfrail.on("mouseover", function(d, i){

			tooltipNetwork(d);
		})
		.on("mouseout", function(){

				d3.select("#tooltip").classed("hidden", true);
			})
		.on("click", function(d){

			clickLinkactivate(d.id);
		})
		.on("dblclick", function(d){
			
			clickLinkdeactivate(d.id);
		});

	// adding simulation to nodes and links
	simulationnonfrail
		.nodes(graphdatanonfrail.nodes)
		.on("tick", tickednonfrail);

	simulationnonfrail.force("link")
		.links(graphdatanonfrail.links);

	// returning new location for simulation
	function tickednonfrail(){

		linknonfrail
			.attr("x1", function(d){ 

				return d.source.x; 
			})
			.attr("y1", function(d){ 

				return d.source.y; 
			})
			.attr("x2", function(d){ 

				return d.target.x; 
			})
			.attr("y2", function(d){ 

				return d.target.y; 
			});

		nodenonfrail
			.attr("cx", function(d){ 

				return d.x; 
			})
			.attr("cy", function(d){ 

				return d.y; 
			});
	};

	// creates links of frail data
	var linkfrail = svggraphfrail.append("g")
		.attr("class", "links")
		.selectAll("line")
		.data(graphdatafrail.links)
		.enter()
		.append("line")
		.attr("stroke-width", function(d){ 

			return Math.sqrt(d.value); 
		});

	// creates links of frail data
	var nodefrail = svggraphfrail.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graphdatafrail.nodes)
		.enter()
		.append("circle")
		.attr("id", function(d){ 

			return "svgf" + d.id.toString()
		})
		.attr("r", 5)
		.attr("fill", function(d){ 

			return colorgraph(d.group); 
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended))

	// adding tooltip on mouseover and selection of clicked element
	nodefrail.on("mouseover", function(d){
		
			tooltipNetwork(d);
		})

		.on("mouseout", function(){
			
			d3.select("#tooltip").classed("hidden", true);		
		})
		.on("click", function(d){
			
			clickLinkactivate(d.id);
		})
		.on("dblclick", function(d){
		
			clickLinkdeactivate(d.id);
		});

	// adding simulation to nodes and links
	simulationfrail
		.nodes(graphdatafrail.nodes)
		.on("tick", tickedfrail);

	simulationfrail.force("link")
		.links(graphdatafrail.links);

	// returning new location for simulation
	function tickedfrail(){

		linkfrail
			.attr("x1", function(d){ 

				return d.source.x; 
			})
			.attr("y1", function(d){ 

				return d.source.y; 
			})
			.attr("x2", function(d){ 

				return d.target.x; 
			})
			.attr("y2", function(d){ 

				return d.target.y; 
			});

		nodefrail
			.attr("cx", function(d){ 
				
				return d.x; 
			})
			.attr("cy", function(d){ 
				
				return d.y; 
			});
	};
};

// drag functions for nodes
function dragstarted(d){

	if (!d3.event.active) simulationnonfrail.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	if (!d3.event.active) simulationfrail.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
}

function dragged(d){

	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d){

	if (!d3.event.active) simulationnonfrail.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	if (!d3.event.active) simulationfrail.alphaTarget(0);
		d.fx = null;
		d.fy = null;
}