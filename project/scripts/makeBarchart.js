// margins barchart
var bcmargin = {top: 20, right: 20, bottom: 30, left: 40, gap: 50},
	bcwidth = 400 + bcmargin.left + bcmargin.right,
	bcheight = 300 + bcmargin.top + bcmargin.bottom;

// svg element barchart
var bcsvgnonfrail = d3.select("#bcnonfrail").append("svg")
	.attr("id", "svgbcnf")
	.attr("width", bcwidth)
	.attr("height", bcheight);

	// bcsvgnonfrail.append("svg").attr("width", 50).attr("height", 30),
 //        checkBox1 = new d3CheckBox(),
 //        checkBox2 = new d3CheckBox(),
 //        checkBox3 = new d3CheckBox();

 //    //Setting up each check box
 //    checkBox1.size(40).x(10).y(10).markStrokeWidth(1).boxStrokeWidth(0.2).checked(true);
 //    checkBox2.size(30).x(70).y(20).rx(5).ry(5).markStrokeWidth(3).boxStrokeWidth(0.2).checked(true);
 //    checkBox3.x(120).y(30).checked(false);

 //    bcsvgnonfrail.call(checkBox1);
 //    bcsvgnonfrail.call(checkBox2);
 //    bcsvgnonfrail.call(checkBox3);

// svg element barchart
var bcsvgfrail = d3.select("#bcfrail")
  .append("svg")
  .attr("id", "svgbcf")
	.attr("width", bcwidth)
	.attr("height", bcheight);

// creating bar element
var barnonfrail = bcsvgnonfrail.append("g")
	.attr("transform", "translate(" + bcmargin.left + "," + bcmargin.top + ")");

// creating bar element
var barfrail = bcsvgfrail.append("g")
	.attr("transform", "translate(" + bcmargin.left + "," + bcmargin.top + ")");

var x = d3.scaleBand().rangeRound([0, bcwidth - bcmargin.right]).padding(0.01),
	y = d3.scaleLinear().rangeRound([bcheight - bcmargin.bottom, 0]);

function makeBarchart(bcdatanonfrail, bcdatafrail){

	// setting domain
	
	x.domain(bcdatanonfrail.nodes.map(function(d) { return d.id; }));
	y.domain([0, d3.max(bcdatanonfrail.nodes, function(d) { return d.avecorrstr; })]);

	barnonfrail.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + bcheight + ")")
		.call(d3.axisBottom(x))
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", "-.55em")
			.attr("transform", "rotate(-90)" );

	barnonfrail.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y).ticks(10))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Correlation");

	barnonfrail.selectAll(".bar")
		.data(bcdatanonfrail.nodes)
		.enter().append("rect").attr("id", function(d){ return "barnfacs" + d.id})
		.attr("class", "bar")
		.style("fill", function(d) { return colorgraph(d.group); })
		.style("stroke", "white")
		.style("stroke-width", "1px")
		.attr("x", function (d) { return x(d.id); })
		.attr("y", function (d) { return y(d.avecorrstr); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return bcheight - y(d.id); })
		.on("mouseover", function (d) {

			tooltipBarchartacs(d);
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

	barnonfrail.selectAll(".rect")
		.data(bcdatanonfrail.nodes)
		.enter().append("rect").attr("id", function(d){ return "barnfmod" + d.id})
		.attr("class", "rect")
		.attr("visibility", "hidden")
		.style("fill", function(d) { return colorgraph(d.group); })
		.style("stroke", "white")
		.style("stroke-width", "1px")
		.attr("x", function (d) { return x(d.id); })
		.attr("y", function (d) { return y(d.mod); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return bcheight - y(d.id); })
		.on("mouseover", function (d) {

			tooltipBarchartmod(d);
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

	barfrail.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + bcheight + ")")
		.call(d3.axisBottom(x));

	barfrail.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y).ticks(10))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Correlation");

		
	barfrail.selectAll(".bar")
		.data(bcdatafrail.nodes)
		.enter().append("rect").attr("id", function(d){ return "barfacs" + d.id})
		.attr("class", "bar")
		.style("fill", function(d) { return colorgraph(d.group); })
		.style("stroke", "white")
		.style("stroke-width", "1px")
		.attr("x", function(d) { return x(d.id); })
		.attr("y", function(d) { return y(d.avecorrstr); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return bcheight - y(d.id); })
		.on("mouseover", function(d, i) {

			tooltipBarchartacs(d);
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

	barfrail.selectAll(".rect")
		.data(bcdatafrail.nodes)
		.enter().append("rect").attr("id", function(d){ return "barfmod" + d.id})
		.attr("class", "rect")
		.attr("visibility", "hidden")
		.style("fill", function(d) { return colorgraph(d.group); })
		.style("stroke", "white")
		.style("stroke-width", "1px")
		.attr("x", function (d) { return x(d.id); })
		.attr("y", function (d) { return y(d.mod); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return bcheight - y(d.id); })
		.on("mouseover", function (d) {

			tooltipBarchartmod(d);
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

	// sorting data on checkbox
	d3.select("#checkbox").on("change", change);

	// // sorting data of barchart
	function change() {

		console.log("checkbox")
		var x0 = x.domain(bcdatanonfrail.nodes.sort(this.checked ? function(a, b) {

				return b.group - a.group;
				return b.group - a.group;
			} : function(a, b) {

				return d3.ascending(a.id, b.id);
			})
			.map(function(d) {

				return d.id;
			}))
			.copy();

		bcsvgnonfrail.selectAll(".bar")
			.sort(function(a, b) {

				return x0(a.id) - x0(b.id);
			});

		bcsvgnonfrail.selectAll(".rect")
			.sort(function(a, b) {

				return x0(a.id) - x0(b.id);
			});

		var transition1 = bcsvgnonfrail.transition().duration(50),
			delay = function(d, i) {

				return i * 50;
			};

		transition1.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) {

				return x0(d.id);
			});

		transition1.selectAll(".rect")
			.delay(delay)
			.attr("x", function(d) {

				return x0(d.id);
			});
		
		transition1.select(".x.axis")
			.selectAll("g")
			.delay(delay);

		var x1 = x.domain(bcdatafrail.nodes.sort(this.checked ? function(a, b) {

				return b.group - a.group;
			} : function(a, b) {

				return d3.ascending(a.id, b.id);
			})
			.map(function(d) {

				return d.id;
			}))
			.copy();
		
		bcsvgfrail.selectAll(".bar")
			.sort(function(a, b) {

				return x1(a.id) - x1(b.id);
			});

		bcsvgfrail.selectAll(".rect")
			.sort(function(a, b) {

				return x1(a.id) - x1(b.id);
			});

		var transition2 = bcsvgfrail.transition().duration(50),
			delay = function(d, i) {

				return i * 50;
			};

		transition2.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) {

				return x1(d.id);
			});

		transition2.selectAll(".rect")
			.delay(delay)
			.attr("x", function(d) {

				return x1(d.id);
			});

		transition2.select(".x.axis")
			.selectAll("g")
			.delay(delay);
	}	


};

