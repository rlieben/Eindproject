window.onload = function(){

	// margins network graph
	var	graphmargin = {top: 100, bottom: 100, left: 50, right: 50},
		graphwidth = 500 + graphmargin.left + graphmargin.right,
		graphheight = 300 + graphmargin.top + graphmargin.bottom;

	// svg element network graph
	var svggraphnonfrail = d3.select("body").append("svg")
		.attr("width", graphwidth)
		.attr("height", graphheight);

	// svg element network graph
	var svggraphfrail = d3.select("body").append("svg")
		.attr("width", graphwidth)
		.attr("height", graphheight);

	// color scheme network graph
	var colorgraph = d3.scaleOrdinal(d3.schemeCategory20);

	// simulation for force in nonfrail network
	var simulationnonfrail = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(graphwidth / 2, graphheight / 2));

	// simulation for force in frail network
	var simulationfrail = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(graphwidth / 2, graphheight / 2));

	// // creating tip on node
	// var nodetip = d3.tip()
	// 	.attr('class', 'd3-tip')
	// 	.offset([-10, 0])
	// 	.html(function(d) {
	// 		return "<strong>Node:</strong> <span style='color:red'>" + d.id + "</span>";
	//  });

	// // call tip on node
	// svggraph.call(nodetip);

	// margins barchart
	var bcmargin = {top: 20, right: 20, bottom: 30, left: 40},
		bcwidth = 500 + bcmargin.left + bcmargin.right,
		bcheight = 300 + bcmargin.top + bcmargin.bottom;

	// svg element barchart
	var bcsvgnonfrail = d3.select("body").append("svg")
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
	var bcsvgfrail = d3.select("body").append("svg")
		.attr("width", bcwidth)
		.attr("height", bcheight);

	// setting x and y for barchart
	var x = d3.scaleBand().rangeRound([0, bcwidth - bcmargin.right]).padding(0.01),
		y = d3.scaleLinear().rangeRound([bcheight - bcmargin.bottom, 0]);

	// creating tip on bar
	var bartip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			return "<strong>Average correlation strength:</strong> <span style='color:red'>" + d.avecorrstr + "</span>\n <strong>Node:</strong> <span style='color:red'>" + d.id + "</span>\n <strong>Name:</strong> <span style='color:red'>" + d.name;
	 });

	// creating bar element
	var barnonfrail = bcsvgnonfrail.append("g")
		.attr("transform", "translate(" + bcmargin.left + "," + bcmargin.top + ")");

	// calling tip onto bar
	barnonfrail.call(bartip);

	// creating bar element
	var barfrail = bcsvgfrail.append("g")
		.attr("transform", "translate(" + bcmargin.left + "," + bcmargin.top + ")");

	// calling tip onto bar
	barfrail.call(bartip);

	

	// variables heatmap
	var hmmargin = { top: 150, right: 10, bottom: 50, left: 100 },
	  	cellSize=5;
	  	col_number=90;
	  	row_number=90;
	  	hmwidth = cellSize*col_number, // - margin.left - margin.right,
	  	hmheight = cellSize*row_number , // - margin.top - margin.bottom,
	  	//gridSize = Math.floor(width / 24),
	  	legendElementWidth = cellSize*1.5,
	  	colorBuckets = 11,
	  	colors = ['#FFFFFF','#F1EEF6','#E6D3E1','#DBB9CD','#D19EB9','#C684A4','#BB6990','#B14F7C','#A63467','#9B1A53','#91003F'];
	  	hcrow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90], 
	  	hccol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
	  	rowLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
	  	"41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
	  	colLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
		"41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"];

	// create queue
	queue()
	.defer(d3.json, 'jsonifiednonfrail.json')
	.defer(d3.json, 'jsonifiedfrail.json')
	.await(updateGraph);


	function updateGraph(error, jsonifiedfrail, jsonifiednonfrail){
		if (error) throw error;
		console.log(jsonifiednonfrail);
		console.log(jsonifiedfrail);
		makeNetwork(jsonifiednonfrail, jsonifiedfrail);
		// makeHeatmap(heatmapnonfrail, heatmapfrail)
	}

	// d3.select("#order").on("change",function(){
 //    	selectData(this.value);
 // 	});

	// loadin network data
	function makeNetwork(graphdatanonfrail, graphdatafrail){

		// // svggraph.selectAll("g"). remove()
		// if (error) throw error;
		// console.log("data in network functie")
		
		linkdatanonfrail = graphdatanonfrail.links
		linkdatafrail = graphdatafrail.links
		nodedatanonfrail = graphdatanonfrail.nodes
		nodedatafrail = graphdatafrail.nodes

		// creating links of non frail graph
		var linknonfrail = svggraphnonfrail.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(linkdatanonfrail)
			.enter().append("line")
			.attr("stroke-width", function(d) { return Math.sqrt(d.value); });


		// creating nodes of non frail graph
		var nodenonfrail = svggraphnonfrail.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(graphdatanonfrail.nodes)
			.enter().append("circle")
			.attr("r", 5)
			.attr("fill", function(d) { return colorgraph(d.group); })
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

				// title of node
		nodenonfrail.append("title")
			.text(function(d) { return d.id; });
			// .on("click", function(d) { mouseClick(d.id); }); // define mouseClick function
			// .on('mouseover', nodetip.show)
			// .on('mouseout', nodetip.hide);

		simulationnonfrail
			.nodes(graphdatanonfrail.nodes)
			.on("tick", tickednonfrail);

		simulationnonfrail.force("link")
			.links(graphdatanonfrail.links);

		function tickednonfrail() {
			linknonfrail
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			nodenonfrail
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		};

		// creating links of  frail graph
		var linkfrail = svggraphfrail.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(linkdatafrail)
			.enter().append("line")
			.attr("stroke-width", function(d) { return Math.sqrt(d.value); });

		// creating nodes of frail graph
		var nodefrail = svggraphfrail.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(graphdatafrail.nodes)
			.enter().append("circle")
			.attr("r", 5)
			.attr("fill", function(d) { return colorgraph(d.group); })
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

		nodefrail.append("title")
			.text(function(d) { return d.id; });

		simulationfrail
			.nodes(graphdatafrail.nodes)
			.on("tick", tickedfrail);

		simulationfrail.force("link")
			.links(graphdatafrail.links);

		function tickedfrail(){
			linkfrail
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			nodefrail
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		};

		// make integers of the data
		nodedatanonfrail.forEach(function(d) {
			d.id = +d.id;
			d.avecorrstr = +d.avecorrstr;
		});

		nodedatafrail.forEach(function(d) {
			d.id = +d.id;
			d.avecorrstr = +d.avecorrstr;
		});

		// setting domain
		x.domain(nodedatanonfrail.map(function(d) { return d.id; }));
		y.domain([0, d3.max(nodedatanonfrail, function(d) { return d.avecorrstr; })]);

		barnonfrail.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + bcheight + ")")
			.call(d3.axisBottom(x));

		barnonfrail.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y).ticks(10, "%"))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Correlation");

		barnonfrail.selectAll(".bar")
			.data(nodedatanonfrail)
			.enter().append("rect")
			.attr("class", "bar")
			.style("fill", function(d) { return colorgraph(d.group); })
			.style("stroke", "white")
			.style("stroke-width", "1px")
			.attr("x", function(d) { return x(d.id); })
			.attr("y", function(d) { return y(d.avecorrstr); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return bcheight - y(d.id); })
			// showing and hiding tip
			.on('mouseover', bartip.show)
			.on('mouseout', bartip.hide);

		// setting domain
		x.domain(nodedatafrail.map(function(d) { return d.id; }));
		y.domain([0, d3.max(nodedatafrail, function(d) { return d.avecorrstr; })]);

		barfrail.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + bcheight + ")")
			.call(d3.axisBottom(x));

		barfrail.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y).ticks(10, "%"))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Correlation");

		barfrail.selectAll(".bar")
			.data(nodedatafrail)
			.enter().append("rect")
			.attr("class", "bar")
			.style("fill", function(d) { return colorgraph(d.group); })
			.style("stroke", "white")
			.style("stroke-width", "1px")
			.attr("x", function(d) { return x(d.id); })
			.attr("y", function(d) { return y(d.avecorrstr); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return bcheight - y(d.id); })
			// showing and hiding tip
			.on('mouseover', bartip.show)
			.on('mouseout', bartip.hide);

			// function makeHeatmap(heatmapnonfrail, heatmapfrail){
		
		
	// 	heatmapnonfrail.forEach(function(d) {
	// 		d.row_idx = +d.row_idx;
	// 		d.col_idx = +d.col_idx;
	// 		d.log2ratio = +d.log2ratio;
	// 	});

		// heatmapfrail.forEach(function(d) {
		// 	d.row_idx = +d.row_idx;
		// 	d.col_idx = +d.col_idx;
		// 	d.log2ratio = +d.log2ratio;
		// });

		// console.log(heatmapfrail)
		// console.log(heatmapnonfrail)

		linkdatanonfrail.forEach(function(d) {
			d.value = +d.value;
		});

		linkdatafrail.forEach(function(d) {
			d.value = +d.value;
		});
		
		// function(error, heatmapdata) {
		var colorScale = d3.scale.quantile()
			.domain([0, 1])
			.range(colors);


		  
		var hmsvgnonfrail = d3.select("body").append("svg")
			.attr("width", hmwidth + hmmargin.left + hmmargin.right)
			.attr("height", hmheight + hmmargin.top + hmmargin.bottom)
			.append("g")
			.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

		var rowSortOrder=false;
		var colSortOrder=false;
		var rowLabels1 = hmsvgnonfrail.append("g")
			.selectAll(".rowLabelg")
			.data(rowLabel)
			.enter()
			.append("text")
			.text(function (d) { return d; })
			.attr("x", 0)
			.attr("y", function (d, i) { return hcrow.indexOf(i+1) * cellSize; })
			.style("text-anchor", "end")
			.style("font-size", "5px")
			.attr("transform", "translate(-6," + cellSize / 1.5 + ")")
			.attr("class", function (d,i) { return "rowLabel mono r"+i;} ) 
			.on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
			.on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
			.on("click", function(d,i) {rowSortOrder=!rowSortOrder; sortbylabel("r",i,rowSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;});

		var colLabels1 = hmsvgnonfrail.append("g")
			.selectAll(".colLabelg")
			.data(colLabel)
			.enter()
			.append("text")
			.text(function (d) { return d; })
			.attr("x", 0)
			.attr("y", function (d, i) { return hccol.indexOf(i+1) * cellSize; })
			.style("text-anchor", "left")
			.style("font-size", "5px")
			.attr("transform", "translate("+cellSize/2 + ",-6) rotate (-90)")
			.attr("class",  function (d,i) { return "colLabel mono c"+i;} )
			.on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
			.on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
			.on("click", function(d,i) {colSortOrder=!colSortOrder;  sortbylabel("c",i,colSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;});

		var heatMap1 = hmsvgnonfrail.append("g").attr("class","g3")
			.selectAll(".cellg")
			.data(linkdatanonfrail,function(d){return d.target.id+":"+d.source.id;})
			.enter()
			.append("rect")
			.attr("x", function(d) { return hccol.indexOf(d.source.id) * cellSize; })
			.attr("y", function(d) { return hcrow.indexOf(d.target.id) * cellSize; })
			.attr("class", function(d){return "cell cell-border cr"+(d.target.id-1)+" cc"+(d.source.id-1);})
			.attr("width", cellSize)
			.attr("height", cellSize)
			.style("fill", function(d) { return colorScale(d.value); })
				 .on("click", function(d) {
					   var rowtext=d3.select(".r"+(d.target.id-1));
					   if(rowtext.classed("text-selected")==false){
						   rowtext.classed("text-selected",true);
					   }else{
						   rowtext.classed("text-selected",false);
					   }
					})
				.on("mouseover", function(d){
					console.log(d)
					//highlight text
					d3.select(this).classed("cell-hover",true);
					d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ return ri==(d.target.id-1);});
					d3.selectAll(".colLabel").classed("text-highlight",function(c,ci){ return ci==(d.source.id-1);});
				
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", (d3.event.pageX+10) + "px")
						.style("top", (d3.event.pageY-10) + "px")
						.select("#value")
						.text("Node connection:"+rowLabel[d.target.id-1]+","+colLabel[d.source.id-1]+"\n Data:"+d.value);  
					
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
				})
				.on("mouseout", function(){
					   d3.select(this).classed("cell-hover",false);
					   d3.selectAll(".rowLabel").classed("text-highlight",false);
					   d3.selectAll(".colLabel").classed("text-highlight",false);
					   d3.select("#tooltip").classed("hidden", true);
				});

		var legend = hmsvgnonfrail.selectAll(".legend")
			.data([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1])
			.enter().append("g")
			.attr("class", "legend");
		 
		legend.append("rect")
			.attr("x", function(d, i) { return legendElementWidth * i * 2; })
			.attr("y", hmheight+(cellSize * 4))
			.attr("width", legendElementWidth * 2)
			.attr("height", cellSize)
			.style("fill", function(d, i) { return colors[i]; });
			
		legend.append("text")
			.attr("class", "mono")
			.text(function(d) { return d; })
			.style("font-size", "5px")
			.attr("width", legendElementWidth + (legendElementWidth / 2))
			.attr("x", function(d, i) { return legendElementWidth * i * 2; })
			.attr("y", hmheight + (cellSize * 3));
		  
		var hmsvgfrail = d3.select("body").append("svg")
			.attr("width", hmwidth + hmmargin.left + hmmargin.right)
			.attr("height", hmheight + hmmargin.top + hmmargin.bottom)
			.append("g")
			.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

		var rowSortOrder=false;
		var colSortOrder=false;
		var rowLabels2 = hmsvgfrail.append("g")
			.selectAll(".rowLabelg")
			.data(rowLabel)
			.enter()
			.append("text")
			.text(function (d) { return d; })
			.attr("x", 0)
			.attr("y", function (d, i) { return hcrow.indexOf(i+1) * cellSize; })
			.style("text-anchor", "end")
			.style("font-size", "5px")
			.attr("transform", "translate(-6," + cellSize / 1.5 + ")")
			.attr("class", function (d,i) { return "rowLabel mono r"+i;} ) 
			.on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
			.on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
			.on("click", function(d,i) {rowSortOrder=!rowSortOrder; sortbylabel("r",i,rowSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;});

		var colLabels2 = hmsvgfrail.append("g")
			.selectAll(".colLabelg")
			.data(colLabel)
			.enter()
			.append("text")
			.text(function (d) { return d; })
			.attr("x", 0)
			.attr("y", function (d, i) { return hccol.indexOf(i+1) * cellSize; })
			.style("text-anchor", "left")
			.style("font-size", "5px")
			.attr("transform", "translate("+cellSize/2 + ",-6) rotate (-90)")
			.attr("class",  function (d,i) { return "colLabel mono c"+i;} )
			.on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
			.on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
			.on("click", function(d,i) {colSortOrder=!colSortOrder;  sortbylabel("c",i,colSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;});

		var heatMap2 = hmsvgfrail.append("g").attr("class","g3")
			.selectAll(".cellg")
			.data(linkdatafrail,function(d){return d.target.id+":"+d.source.id;})
			.enter()
			.append("rect")
			.attr("x", function(d) { return hccol.indexOf(d.source.id) * cellSize; })
			.attr("y", function(d) { return hcrow.indexOf(d.target.id) * cellSize; })
			.attr("class", function(d){return "cell cell-border cr"+(d.target.id-1)+" cc"+(d.source.id-1);})
			.attr("width", cellSize)
			.attr("height", cellSize)
			.style("fill", function(d) { return colorScale(d.value); })
				/* .on("click", function(d) {
					   var rowtext=d3.select(".r"+(d.row-1));
					   if(rowtext.classed("text-selected")==false){
						   rowtext.classed("text-selected",true);
					   }else{
						   rowtext.classed("text-selected",false);
					   }
				})*/
				.on("mouseover", function(d){
					console.log("dit is :", d)
					//highlight text
					d3.select(this).classed("cell-hover",true);
					d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ return ri==(d.target.id-1);});
					d3.selectAll(".colLabel").classed("text-highlight",function(c,ci){ return ci==(d.source.id-1);});
				
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", (d3.event.pageX+10) + "px")
						.style("top", (d3.event.pageY-10) + "px")
						.select("#value")
						.text("Node connection:"+rowLabel[d.target.id-1]+","+colLabel[d.source.id-1]+"\n Data:"+d.value);
					
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
				})
				.on("mouseout", function(){
					   d3.select(this).classed("cell-hover",false);
					   d3.selectAll(".rowLabel").classed("text-highlight",false);
					   d3.selectAll(".colLabel").classed("text-highlight",false);
					   d3.select("#tooltip").classed("hidden", true);
				});

		var legend = hmsvgfrail.selectAll(".legend")
			.data([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1])
			.enter().append("g")
			.attr("class", "legend");
		 
		legend.append("rect")
			.attr("x", function(d, i) { return legendElementWidth * i * 2; })
			.attr("y", hmheight+(cellSize * 4))
			.attr("width", legendElementWidth * 2)
			.attr("height", cellSize)
			.style("fill", function(d, i) { return colors[i]; });
			
		legend.append("text")
			.attr("class", "mono")
			.text(function(d) { return d; })
			.style("font-size", "5px")
			.attr("width", legendElementWidth + (legendElementWidth / 2))
			.attr("x", function(d, i) { return legendElementWidth * i * 2; })
			.attr("y", hmheight + (cellSize * 3));
	};

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	function d3CheckBox () {

    var size = 20,
        x = 0,
        y = 0,
        rx = 0,
        ry = 0,
        markStrokeWidth = 3,
        boxStrokeWidth = 3,
        checked = false,
        clickEvent;

    function checkBox (selection) {

        var g = selection.append("g"),
            box = g.append("rect")
            .attr("width", size)
            .attr("height", size)
            .attr("x", x)
            .attr("y", y)
            .attr("rx", rx)
            .attr("ry", ry)
            .style({
                "fill-opacity": 0,
                "stroke-width": boxStrokeWidth,
                "stroke": "black"
            });

        //Data to represent the check mark
        var coordinates = [
            {x: x + (size / 8), y: y + (size / 3)},
            {x: x + (size / 2.2), y: (y + size) - (size / 4)},
            {x: (x + size) - (size / 8), y: (y + (size / 10))}
        ];

        var line = d3.svg.line()
                .x(function(d){ return d.x; })
                .y(function(d){ return d.y; })
                .interpolate("basic");

        var mark = g.append("path")
            .attr("d", line(coordinates))
            .style({
                "stroke-width" : markStrokeWidth,
                "stroke" : "black",
                "fill" : "none",
                "opacity": (checked)? 1 : 0
            });

        g.on("click", function () {
            checked = !checked;
            mark.style("opacity", (checked)? 1 : 0);

            if(clickEvent)
                clickEvent();

            d3.event.stopPropagation();
        });

    }

    checkBox.size = function (val) {
        size = val;
        return checkBox;
    }

    checkBox.x = function (val) {
        x = val;
        return checkBox;
    }

    checkBox.y = function (val) {
        y = val;
        return checkBox;
    }

    checkBox.rx = function (val) {
        rx = val;
        return checkBox;
    }

    checkBox.ry = function (val) {
        ry = val;
        return checkBox;
    }

    checkBox.markStrokeWidth = function (val) {
        markStrokeWidth = val;
        return checkBox;
    }

    checkBox.boxStrokeWidth = function (val) {
        boxStrokeWidth = val;
        return checkBox;
    }

    checkBox.checked = function (val) {

        if(val === undefined) {
            return checked;
        } else {
            checked = val;
            return checkBox;
        }
    }

    checkBox.clickEvent = function (val) {
        clickEvent = val;
        return checkBox;
    }

    return checkBox;
}
};
