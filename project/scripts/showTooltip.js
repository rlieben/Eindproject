function tooltipNetwork (d){

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