window.onload = function(){
	var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height");

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2));

	d3.json("jsonifiedboth.json", function(error, graph) {
		if (error) throw error;

		console.log(graph)

		var link = svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(graph.links)
			.enter().append("line")
			.attr("stroke-width", function(d) { return Math.sqrt(d.value); });

		var node = svg.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(graph.nodes)
			.enter().append("circle")
			.attr("r", 5)
			.attr("fill", function(d) { return color(d.group); })
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

		node.append("title")
			.text(function(d) { return d.id; });

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

var margin = { top: 150, right: 10, bottom: 50, left: 100 },
	cellSize=12;
	col_number=60;
	row_number=50;
	width = cellSize*col_number, // - margin.left - margin.right,
	height = cellSize*row_number , // - margin.top - margin.bottom,
  //gridSize = Math.floor(width / 24),
	legendElementWidth = cellSize*2.5,
	colorBuckets = 21,
	colors = ['#005824','#1A693B','#347B53','#4F8D6B','#699F83','#83B09B','#9EC2B3','#B8D4CB','#D2E6E3','#EDF8FB','#FFFFFF','#F1EEF6','#E6D3E1','#DBB9CD','#D19EB9','#C684A4','#BB6990','#B14F7C','#A63467','#9B1A53','#91003F'];      	
	hcrow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30",,"31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
"41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
	hccol = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30",,"31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
"41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
	rowLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30",,"31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
"41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
	colLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30",,"31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
"41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"];

d3.tsv("data_heatmap.tsv",
function(d) {
  return {
	row:   +d.row_idx,
	col:   +d.col_idx,
	value: +d.log2ratio
  };
},
function(error, data) {
  var colorScale = d3.scale.quantile()
	  .domain([ -10 , 0, 10])
	  .range(colors);
  
  var svg = d3.select("#chart").append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	  ;
  var rowSortOrder=false;
  var colSortOrder=false;
  var rowLabels = svg.append("g")
	  .selectAll(".rowLabelg")
	  .data(rowLabel)
	  .enter()
	  .append("text")
	  .text(function (d) { return d; })
	  .attr("x", 0)
	  .attr("y", function (d, i) { return hcrow.indexOf(i+1) * cellSize; })
	  .style("text-anchor", "end")
	  .attr("transform", "translate(-6," + cellSize / 1.5 + ")")
	  .attr("class", function (d,i) { return "rowLabel mono r"+i;} ) 
	  .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
	  .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
	  .on("click", function(d,i) {rowSortOrder=!rowSortOrder; sortbylabel("r",i,rowSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;})
	  ;

  var colLabels = svg.append("g")
	  .selectAll(".colLabelg")
	  .data(colLabel)
	  .enter()
	  .append("text")
	  .text(function (d) { return d; })
	  .attr("x", 0)
	  .attr("y", function (d, i) { return hccol.indexOf(i+1) * cellSize; })
	  .style("text-anchor", "left")
	  .attr("transform", "translate("+cellSize/2 + ",-6) rotate (-90)")
	  .attr("class",  function (d,i) { return "colLabel mono c"+i;} )
	  .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
	  .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
	  .on("click", function(d,i) {colSortOrder=!colSortOrder;  sortbylabel("c",i,colSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;})
	  ;

  var heatMap = svg.append("g").attr("class","g3")
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
				 .text("lables:"+rowLabel[d.row-1]+","+colLabel[d.col-1]+"\ndata:"+d.value+"\nrow-col-idx:"+d.col+","+d.row+"\ncell-xy "+this.x.baseVal.value+", "+this.y.baseVal.value);  
			   //Show the tooltip
			   d3.select("#tooltip").classed("hidden", false);
		})
		.on("mouseout", function(){
			   d3.select(this).classed("cell-hover",false);
			   d3.selectAll(".rowLabel").classed("text-highlight",false);
			   d3.selectAll(".colLabel").classed("text-highlight",false);
			   d3.select("#tooltip").classed("hidden", true);
		})
		;

  var legend = svg.selectAll(".legend")
	  .data([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10])
	  .enter().append("g")
	  .attr("class", "legend");
 
  legend.append("rect")
	.attr("x", function(d, i) { return legendElementWidth * i; })
	.attr("y", height+(cellSize*2))
	.attr("width", legendElementWidth)
	.attr("height", cellSize)
	.style("fill", function(d, i) { return colors[i]; });
 
  legend.append("text")
	.attr("class", "mono")
	.text(function(d) { return d; })
	.attr("width", legendElementWidth)
	.attr("x", function(d, i) { return legendElementWidth * i; })
	.attr("y", height + (cellSize*4));

}