/*

Course: Endproject
Minor programming, University of Amsterdam
Raoul Lieben
10556346

interactiveClick.js : ensures the click event triggers the right element in the other graphs

contains: 	clickLinkactivate : 	activates the elements
			clinkLinkdeactivate: 	deactivates the elements
			unselectSelection: 		unselects all clicked elements
				
*/

// selects the right elements and creates selection border around them
function clickLinkactivate(id) {

	var nonfrailElement = d3.select("#svgnf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var frailElement = d3.select("#svgf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var baracsnonfrailElement = d3.select("#barnfacs" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var baracsfrailElement = d3.select("#barfacs" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var barmodnonfrailElement = d3.select("#barnfmod" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var barmodfrailElement = d3.select("#barfmod" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var hmnonfrailElement = d3.select("#hmnf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");

	var hmfrailElement = d3.select("#hmf" + id)
		.style("stroke", "black")
		.style("stroke-width", "2px");
}

// selects the right elements and removes selection border around them
function clickLinkdeactivate(id) {

	var nonfrailElement = d3.select("#svgnf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var frailElement = d3.select("#svgf" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var barnonfrailElement = d3.select("#barnfacs" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var barfrailElement = d3.select("#barfacs" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var barnonfrailElement = d3.select("#barnfmod" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var barfrailElement = d3.select("#barfmod" + id)
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var hmnonfrailElement = d3.select("#hmnf" + id)
		.style("stroke", "white")
		.style("stroke-width", "0.01px");

	var hmfrailElement = d3.select("#hmf" + id)
		.style("stroke", "white")
		.style("stroke-width", "0.01px");
}

// selects all elements and removes selection border around them
function unselectSelection() {

	var nonfrailElement = d3.select("#svgnf")
		.selectAll("circle")
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var frailElement = d3.select("#svgf")
		.selectAll("circle")
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var baranonfrailElement = d3.select("#svgbcnf")
		.selectAll(".bar")
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var barfrailElement = d3.select("#svgbcf")
		.selectAll(".bar")
		.style("stroke", "white")
		.style("stroke-width", "1px");

	var baranonfrailElement = d3.select("#svgbcnf")
		.selectAll(".rect")
		.style("stroke", "white")
		.style("stroke-width", "1px");
	
	var barfrailElement = d3.select("#svgbcf")
		.selectAll(".rect")
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