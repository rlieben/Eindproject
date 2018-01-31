/*

Course: Endproject
Minor programming, University of Amsterdam
Raoul Lieben
10556346

dropdownSwitch.js : ensures the click event triggers the right element in the other graphs

*/

function switchData(value){

	if (value == "mod"){

		d3.select("#svgbcnf")
			.selectAll(".bar")
			.attr("visibility", "hidden");

		d3.select("#svgbcf")
			.selectAll(".bar")
			.attr("visibility", "hidden");

		d3.select("#svgbcnf")
			.selectAll(".rect")
			.attr("visibility", "visible");

		d3.select("#svgbcf")
			.selectAll(".rect")
			.attr("visibility", "visible");

	} else if (value == "acs"){

		d3.select("#svgbcnf")
			.selectAll(".rect")
			.attr("visibility", "hidden");

		d3.select("#svgbcf")
			.selectAll(".rect")
			.attr("visibility", "hidden");

		d3.select("#svgbcnf")
			.selectAll(".bar")
			.attr("visibility", "visible");

		d3.select("#svgbcf")
			.selectAll(".bar")
			.attr("visibility", "visible");
	};
};