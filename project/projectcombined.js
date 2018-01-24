window.onload = function(){

	// margins network graph
	var	graphmargin = {top: 100, bottom: 100, left: 50, right: 50},
		graphwidth = 500 + graphmargin.left + graphmargin.right,
		graphheight = 300 + graphmargin.top + graphmargin.bottom;

	// svg element network graph
	var svggraph = d3.select("body").append("svg")
		.attr("width", graphwidth)
		.attr("height", graphheight);

	// color scheme network graph
	var colorgraph = d3.scaleOrdinal(d3.schemeCategory20);

	// simulation for force in network
	var simulation = d3.forceSimulation()
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
	var bcsvg = d3.select("body").append("svg")
		.attr("width", bcwidth)
		.attr("height", bcheight);

	// setting x and y for barchart
	var x = d3.scaleBand().rangeRound([0, bcwidth - bcmargin.right]).padding(0.01),
		y = d3.scaleLinear().rangeRound([bcheight - bcmargin.bottom, 0]);

	// creating tip on bar
	var bartip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([20, 20])
		.html(function(d) {
			return "<strong>Average correlation strength:</strong> <span style='color:red'>" + d.avecorrstr + "</span>\n <strong>Node:</strong> <span style='color:red'>" + d.id + "</span>";
	 });

	// creating bar element
	var bar = bcsvg.append("g")
		.attr("transform", "translate(" + bcmargin.left + "," + bcmargin.top + ")");

	// calling tip onto bar
	bar.call(bartip);

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



	// loadin network data
	d3.json("jsonifiednonfrail.json", function(error, graph) {
		if (error) throw error;

		// creating links of graph
		var link = svggraph.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(graph.links)
			.enter().append("line")
			.attr("stroke-width", function(d) { return Math.sqrt(d.value); });

		// creating nodes of graph
		var node = svggraph.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(graph.nodes)
			.enter().append("circle")
			.attr("r", 5)
			.attr("fill", function(d) { return colorgraph(d.group); })
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

		// title of node
		node.append("title")
			.text(function(d) { return d.id; });
			// .on('mouseover', nodetip.show)
			// .on('mouseout', nodetip.hide);

		simulation
			.nodes(graph.nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(graph.links);

		function ticked() {
		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
			}

		var data = graph.nodes

		console.log(data)

		data.forEach(function(d) {
			d.id = +d.id;
			d.avecorrstr = +d.avecorrstr;
		});

		x.domain(data.map(function(d) { return d.id; }));
		y.domain([0, d3.max(data, function(d) { return d.avecorrstr; })]);

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
			.text("Correlation");

		bar.selectAll(".bar")
			.data(data)
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
	});

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


	d3.tsv("heatmapnonfrail.tsv",
		function(d) {
		  	return {
				row:   +d.row_idx,
				col:   +d.col_idx,
				value: +d.log2ratio
		  	};
		},
		
		function(error, data) {
		var colorScale = d3.scale.quantile()
			.domain([0, 1])
			.range(colors);
		  
		var hmsvg = d3.select("body").append("svg")
			.attr("width", hmwidth + hmmargin.left + hmmargin.right)
			.attr("height", hmheight + hmmargin.top + hmmargin.bottom)
			.append("g")
			.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

		var rowSortOrder=false;
		var colSortOrder=false;
		var rowLabels = hmsvg.append("g")
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

		var colLabels = hmsvg.append("g")
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

		var heatMap = hmsvg.append("g").attr("class","g3")
			.selectAll(".cellg")
			.data(data,function(d){return d.row+":"+d.col;})
			.enter()
			.append("rect")
			.attr("x", function(d) { return hccol.indexOf(d.col) * cellSize; })
			.attr("y", function(d) { return hcrow.indexOf(d.row) * cellSize; })
			.attr("class", function(d){return "cell cell-border cr"+(d.row-1)+" cc"+(d.col-1);})
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
					
					//highlight text
					d3.select(this).classed("cell-hover",true);
					d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ return ri==(d.row-1);});
					d3.selectAll(".colLabel").classed("text-highlight",function(c,ci){ return ci==(d.col-1);});
				
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", (d3.event.pageX+10) + "px")
						.style("top", (d3.event.pageY-10) + "px")
						.select("#value")
						.text("Node connection:"+rowLabel[d.row-1]+","+colLabel[d.col-1]+"\n Data:"+d.value);  
					
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
				})
				.on("mouseout", function(){
					   d3.select(this).classed("cell-hover",false);
					   d3.selectAll(".rowLabel").classed("text-highlight",false);
					   d3.selectAll(".colLabel").classed("text-highlight",false);
					   d3.select("#tooltip").classed("hidden", true);
				});

		var legend = hmsvg.selectAll(".legend")
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

	});

	var sa=d3.select(".g3")
      .on("mousedown", function() {
          if( !d3.event.altKey) {
             d3.selectAll(".cell-selected").classed("cell-selected",false);
             d3.selectAll(".rowLabel").classed("text-selected",false);
             d3.selectAll(".colLabel").classed("text-selected",false);
          }
         var p = d3.mouse(this);
         sa.append("rect")
         .attr({
             rx      : 0,
             ry      : 0,
             class   : "selection",
             x       : p[0],
             y       : p[1],
             width   : 1,
             height  : 1
         })
      })
      .on("mousemove", function() {
         var s = sa.select("rect.selection");
      
         if(!s.empty()) {
             var p = d3.mouse(this),
                 d = {
                     x       : parseInt(s.attr("x"), 10),
                     y       : parseInt(s.attr("y"), 10),
                     width   : parseInt(s.attr("width"), 10),
                     height  : parseInt(s.attr("height"), 10)
                 },
                 move = {
                     x : p[0] - d.x,
                     y : p[1] - d.y
                 }
             ;
      
             if(move.x < 1 || (move.x*2<d.width)) {
                 d.x = p[0];
                 d.width -= move.x;
             } else {
                 d.width = move.x;       
             }
      
             if(move.y < 1 || (move.y*2<d.height)) {
                 d.y = p[1];
                 d.height -= move.y;
             } else {
                 d.height = move.y;       
             }
             s.attr(d);
      
                 // deselect all temporary selected state objects
             d3.selectAll('.cell-selection.cell-selected').classed("cell-selected", false);
             d3.selectAll(".text-selection.text-selected").classed("text-selected",false);

             d3.selectAll('.cell').filter(function(cell_d, i) {
                 if(
                     !d3.select(this).classed("cell-selected") && 
                         // inner circle inside selection frame
                     (this.x.baseVal.value)+cellSize >= d.x && (this.x.baseVal.value)<=d.x+d.width && 
                     (this.y.baseVal.value)+cellSize >= d.y && (this.y.baseVal.value)<=d.y+d.height
                 ) {
      
                     d3.select(this)
                     .classed("cell-selection", true)
                     .classed("cell-selected", true);

                     d3.select(".r"+(cell_d.row-1))
                     .classed("text-selection",true)
                     .classed("text-selected",true);

                     d3.select(".c"+(cell_d.col-1))
                     .classed("text-selection",true)
                     .classed("text-selected",true);
                 }
             });
         }
      })
      .on("mouseup", function() {
            // remove selection frame
         sa.selectAll("rect.selection").remove();
      
             // remove temporary selection marker class
         d3.selectAll('.cell-selection').classed("cell-selection", false);
         d3.selectAll(".text-selection").classed("text-selection",false);
      })
      .on("mouseout", function() {
         if(d3.event.relatedTarget.tagName=='html') {
                 // remove selection frame
             sa.selectAll("rect.selection").remove();
                 // remove temporary selection marker class
             d3.selectAll('.cell-selection').classed("cell-selection", false);
             d3.selectAll(".rowLabel").classed("text-selected",false);
             d3.selectAll(".colLabel").classed("text-selected",false);
         }
      })
      ;

};