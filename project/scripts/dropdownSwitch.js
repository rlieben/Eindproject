function switchData(value){

	if (value == "mod"){

		console.log("mod");;

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