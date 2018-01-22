window.onload = function(){

	var svg = d3.select("svg"),
		bcmargin = {top: 20, right: 20, bottom: 30, left: 40},
		bcwidth = +svg.attr("width") - margin.left - margin.right,
		bcheight = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand().rangeRound([0, bcwidth]).padding(0.1),
		y = d3.scaleLinear().rangeRound([bcheight, 0]);

	// creating tip on bar
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Average correlation strength:</strong> <span style='color:red'>" + d.avecorrstr + "</span>\n <strong>Node:</strong> <span style='color:red'>" + d.id + "</span>";
	 });

	var g = svg.append("g")
		.attr("transform", "translate(" + bcmargin.left + "," + bcmargin.top + ")");

	g.call(tip);

	console.log("hoi")


	d3.json("jsonifiednonfrail.json", function(error, data) {

		var data2 = data.nodes

		console.log(data2)

		data2.forEach(function(d) {
			d.id = +d.id;
			d.avecorrstr = +d.avecorrstr;
		});

		x.domain(data2.map(function(d) { return d.id; }));
		y.domain([0, 0.25]);

		bar.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + bcheight + ")")
			.call(d3.axisBottom(x));

		bar.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y).ticks(10, "%"))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Frequency");

		bar.selectAll(".bar")
			.data(data2)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.id); })
			.attr("y", function(d) { return y(d.avecorrstr); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return bcheight - y(d.id); })
			// showing and hiding tip
	     	.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
	});
}