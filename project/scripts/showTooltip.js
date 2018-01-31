/*

Course: Endproject
Minor programming, University of Amsterdam
Raoul Lieben
10556346

showTooltip.js : shows and updates tooltip for hovered element

contains: 	tooltipNetwork: tooltip for network graph
			tooltipBarchartacs: tooltip for correlation data of barchart
			tooltipBarchartmod: tooltip for modularity data of barchart
			tooltipHeatmap: tooltip for heatmap
		
*/

function tooltipNetwork (d){

	// selects tooltip and updates values
	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value1")
		.text("Node: " + d.id);
	d3.select("#tooltip")
		.select("#value2")
		.text("Name: " + d.name);

	d3.select("#tooltip").classed("hidden", false);
};

function tooltipBarchartacs (d){

	// selects tooltip and updates values
	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value1")
		.text("ACS: " + d.avecorrstr);
	d3.select("#tooltip")
		.select("#value2")
		.text("Node: "+ d.id)
	d3.select("#tooltip")
		.select("#value3")
		.text("Name: " + d.name);

	d3.select("#tooltip").classed("hidden", false);	
};

function tooltipBarchartmod (d){

	// selects tooltip and updates values
	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value1")
		.text("Mod: " + d.mod);
	d3.select("#tooltip")
		.select("#value2")
		.text("Node: "+ d.id)
	d3.select("#tooltip")
		.select("#value3")
		.text("Name: " + d.name);

	d3.select("#tooltip").classed("hidden", false);	
};

function tooltipHeatmap (d){

	// selects tooltip and updates values
	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value1")
		.text("Connection: " + parseInt(d.target.id) + "," + parseInt(d.source.id));
	d3.select("#tooltip")
		.select("#value2")
		.text("Strength: " + d.value);	

	d3.select("#tooltip").classed("hidden", false);
};