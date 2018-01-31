/*

Course: Endproject
Minor programming, University of Amsterdam
Raoul Lieben
10556346

makeHeatmap.js : creates the heatmap

*/

// variables heatmap
var hmmargin = { top: 50, right: 10, bottom: 50, left: 50, gap:100},
	cellSize = 5;
	col_number = 90;
	row_number = 90;
	hmwidth = 500 + hmmargin.left + hmmargin.right,
	hmheight = 500 + hmmargin.top + hmmargin.bottom;
	legendElementWidth = cellSize * 1.5,
	colorBuckets = 11,
	colors = ['#FFFFFF','#F1EEF6','#E6D3E1','#DBB9CD','#D19EB9','#C684A4','#BB6990','#B14F7C','#A63467','#9B1A53','#91003F'];
	
// setting colorscale for heatmap
var colorScale = d3.scale.quantile()
	.domain([0, 1])
	.range(colors);

// appends nonfrail heatmap svg to div element
var hmsvgnonfrail = d3.select("#hmnonfrail").append("svg")
	.attr("id", "svghmnf")
	.attr("width", hmwidth)
	.attr("height", hmheight)
	.append("g")
	.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

// appends frail heatmap svg to div element
var hmsvgfrail = d3.select("#hmfrail")
	.append("svg")
	.attr("id", "svghmf")
	.attr("width", hmwidth + hmmargin.left + hmmargin.right)
	.attr("height", hmheight + hmmargin.top + hmmargin.bottom)
	.append("g")
	.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

// creates the heatmap
function makeHeatmap(hmdatanonfrail, hmdatafrail){

	// creating nonfrail row with labels for nodes
	var rowLabelsnonfrail = hmsvgnonfrail.append("g")
		.selectAll(".rowLabelg")
		.data(hmdatanonfrail.nodes)
		.enter()
		.append("text")
		.text(function(d){

			return d.id; 
		})
		.attr("x", 0)
		.attr("y", function(d){	

			return d.id * cellSize; 
		})
		.style("text-anchor", "end")
		.style("font-size", "5px")
		.attr("transform", "translate(-6," + cellSize / 1.5 + ")")
		.attr("class", function(d){	

			return "rowLabel mono r" + d.id;
		});

	// creating nonfrail column with labels for nodes
	var colLabelsnonfrail = hmsvgnonfrail.append("g")
		.selectAll(".colLabelg")
		.data(hmdatanonfrail.nodes)
		.enter()
		.append("text")
		.text(function(d){ 

			return d.id; 
		})
		.attr("x", 0)
		.attr("y", function(d){ 

			return d.id * cellSize; 
		})
		.style("text-anchor", "left")
		.style("font-size", "5px")
		.attr("transform", "translate("+ cellSize / 2 + ",-6) rotate (-90)")
		.attr("class",  function(d){ 

			return "colLabel mono c" + d.id;
		});

	// creating non frailheatmap
	var heatMapnonfrail = hmsvgnonfrail.append("g").attr("class","g3")
		.selectAll(".cellg")
		.data(hmdatanonfrail.links, function(d){ 

			return d.target.id + ":" + d.source.id; 
		})
		.enter()
		.append("rect").attr("id", function(d){ 

			return "hmnf" + d.source.id + "-" + d.target.id; 
		})
		.attr("x", function(d){ 

			return d.source.id * cellSize; 
		})
		.attr("y", function(d){ 

			return d.target.id * cellSize; 
		})
		.attr("class", function(d){ 

			return "cell cell-border cr" + (d.target.id - 1) + " cc" + (d.source.id - 1); 
		})
		.attr("width", cellSize)
		.attr("height", cellSize)
		.style("fill", function(d){ 

			return colorScale(d.value); 
		})
		.on("mouseover", function(d){
			
			d3.select(this).classed("cell-hover", true);
			tooltipHeatmap(d);	
		})
		.on("mouseout", function(){

				d3.select(this).classed("cell-hover",false);
				d3.select("#tooltip").classed("hidden", true);
		})
		.on("click", function(d){
		
			cellid = d.source.id + "-" + d.target.id;
			clickLinkactivate(cellid);
		})
		.on("dblclick", function(d){
			
			cellid = d.source.id + "-" + d.target.id
			clickLinkdeactivate(cellid);
		});

	// creating frail row with labels for nodes
	var rowLabelsfrail = hmsvgfrail.append("g")
		.selectAll(".rowLabelg")
		.data(hmdatafrail.nodes)
		.enter()
		.append("text")
		.text(function(d){ 

			return d.id; 
		})
		.attr("x", 0)
		.attr("y", function(d){ 

			return d.id * cellSize; 
		})
		.style("text-anchor", "end")
		.style("font-size", "5px")
		.attr("transform", "translate(-6," + cellSize / 1.5 + ")")
		.attr("class", function(d){ 

			return "rowLabel mono r" + d.id;
		});

	// creating frail column with labels for nodes
	var colLabelsfrail = hmsvgfrail.append("g")
		.selectAll(".colLabelg")
		.data(hmdatafrail.nodes)
		.enter()
		.append("text")
		.text(function(d){ 

			return d.id; 
		})
		.attr("x", 0)
		.attr("y", function(d){ 

			return d.id * cellSize; 
		})
		.style("text-anchor", "left")
		.style("font-size", "5px")
		.attr("transform", "translate(" + cellSize / 2 + ",-6) rotate (-90)")
		.attr("class",  function(d){ 

			return "colLabel mono c" + d.id;
		});

	// creating frail heatmap
	var heatMapnonfrail = hmsvgfrail.append("g").attr("class","g3")
		.selectAll(".cellg")
		.data(hmdatafrail.links, function(d){ 

			return d.target.id + ":" + d.source.id; 
		})
		.enter()
		.append("rect")
		.attr("id", function(d){ 

			return "hmf" + d.source.id + "-" + d.target.id; 
		})
		.attr("x", function(d){ 

			return d.source.id * cellSize; 
		})
		.attr("y", function(d){ 

			return d.target.id * cellSize; 
		})
		.attr("class", function(d){ 

			return "cell cell-border cr" + (d.target.id - 1) + " cc" + (d.source.id - 1); 
		})
		.attr("width", cellSize)
		.attr("height", cellSize)
		.style("fill", function(d){ 

			return colorScale(d.value); 
		})
		.on("mouseover", function(d){
	
			d3.select(this).classed("cell-hover", true);
			tooltipHeatmap(d);
		})
		.on("mouseout", function(){

			d3.select(this).classed("cell-hover",false);
			d3.select("#tooltip").classed("hidden", true);
		})
		.on("click", function(d){
		
			cellid = d.source.id + "-" + d.target.id;
			clickLinkactivate(cellid);
		})
		.on("dblclick", function(d){
			
			cellid = d.source.id + "-" + d.target.id
			clickLinkdeactivate(cellid);
		});

	// creating color legend
	var legend = hmsvgfrail.selectAll(".legend")
		.data([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1])
		.enter().append("g")
		.attr("class", "legend");
	
	// appending rects to legend	 
	legend.append("rect")
		.attr("x", function(d, i){ 

			return legendElementWidth * i * cellSize; 
		})
		.attr("y", hmheight - hmmargin.bottom - hmmargin.top)
		.attr("width", legendElementWidth * cellSize)
		.attr("height", cellSize)
		.style("fill", function(d){ 

			return colorScale(d); 
		})
		.style("stroke", "black");
	
	// appending text above rects	
	legend.append("text")
		.attr("class", "mono")
		.text(function(d){ 

			return d; 
		})
		.style("font-size", "12px")
		.attr("width", legendElementWidth + (legendElementWidth / 2))
		.attr("x", function(d, i){

			return legendElementWidth * i * cellSize + cellSize / 2; 
		})
		.attr("y", hmheight - hmmargin.bottom - hmmargin.top - cellSize);
};




