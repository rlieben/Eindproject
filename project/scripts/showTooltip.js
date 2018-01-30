function tooltipNetwork (d){

	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value1")
		.text("Node:" + d.id)
		.select("#value2")
		.text("Name:" + d.name)
		.select("#value3")
		.text("Name:" + d.name);

	d3.select("#tooltip").classed("hidden", false);
};

function tooltipBarchart (d){

	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value1")
		.text("AVS: " + d.avecorrstr + "\n Node: "+ d.id + "\n Name: " + d.name);

	d3.select("#tooltip").classed("hidden", false);	
};

function tooltipHeatmap (d){

	d3.select("#tooltip")
		.style("left", (d3.event.pageX + 10) + "px")
		.style("top", (d3.event.pageY - 10) + "px")
		.select("#value")
		.text("Connection: " + rowLabel[d.target.id - 1] + "," + colLabel[d.source.id - 1] + "\n Strength: " + d.value);
				
	d3.select("#tooltip").classed("hidden", false);
};