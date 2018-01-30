function clickLinkactivate(id) {

	var nonfrailElement = d3.select("#svgnf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var frailElement = d3.select("#svgf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var barnonfrailElement = d3.select("#barnf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var barfrailElement = d3.select("#barf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var hmnonfrailElement = d3.select("#hmnf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var hmfrailElement = d3.select("#hmf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");
}

function clickLinkdeactivate(id) {

	var nonfrailElement = d3.select("#svgnf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var frailElement = d3.select("#svgf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var barnonfrailElement = d3.select("#barnf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var barfrailElement = d3.select("#barf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var hmnonfrailElement = d3.select("#hmnf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var hmfrailElement = d3.select("#hmf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");
}

function unselectSelection() {

	var nonfrailElement = d3.select("#svgnf")
		.selectAll("circle")
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var frailElement = d3.select("#svgf")
		.selectAll("circle")
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var barnonfrailElement = d3.select("#svgbcnf")
		.selectAll(".bar")
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var barfrailElement = d3.select("#svgbcf")
		.selectAll(".bar")
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var hmnonfrailElement = d3.select("#svghmnf")
		.selectAll("rect")
		.style("stroke", "white")
		.style("stroke-width", "0.01px");

	var hmfrailElement = d3.select("#svghmf")
		.selectAll("rect")
		.style("stroke", "white")
		.style("stroke-width", "0.01px");
}