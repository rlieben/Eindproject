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
	hcrow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90], 
	hccol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
	// rowLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
	// "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
	// colLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
	// "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"];


// setting colorscale for heatmap
var colorScale = d3.scale.quantile()
	.domain([0, 1])
	.range(colors);

// heatmapnonfrail svg
var hmsvgnonfrail = d3.select("#hmnonfrail").append("svg")
	.attr("id", "svghmnf")
	.attr("width", hmwidth)
	.attr("height", hmheight)
	.append("g")
	.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

// heatmapfrail svg 
var hmsvgfrail = d3.select("#hmfrail")
	.append("svg")
	.attr("id", "svghmf")
	.attr("width", hmwidth + hmmargin.left + hmmargin.right)
	.attr("height", hmheight + hmmargin.top + hmmargin.bottom)
	.append("g")
	.attr("transform", "translate(" + hmmargin.left + "," + hmmargin.top + ")");

// creates the heatmap
function makeHeatmap(hmdatanonfrail, hmdatafrail){

	var rowSortOrder=false;
	var colSortOrder=false;
	var rowLabels1 = hmsvgnonfrail.append("g")
		.selectAll(".rowLabelg")
		.data(hmdatanonfrail.nodes)
		.enter()
		.append("text")
		.text(function (d) { return d.id; })
		.attr("x", 0)
		.attr("y", function (d, i) { return hcrow.indexOf(i + 1) * cellSize; })
		.style("text-anchor", "end")
		.style("font-size", "5px")
		.attr("transform", "translate(-6," + cellSize / 1.5 + ")")
		.attr("class", function (d, i) { return "rowLabel mono r" + i;} ) 
		.on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
		.on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
		.on("click", function(d,i) {

			rowSortOrder =! rowSortOrder;
			sortbylabel("r", i, rowSortOrder); 
			d3.select("#order")
				.property("selectedIndex", 4)
				.node()
				.focus();
			});


	var colLabels1 = hmsvgnonfrail.append("g")
		.selectAll(".colLabelg")
		.data(hmdatanonfrail.nodes)
		.enter()
		.append("text")
		.text(function (d) { return d.id; })
		.attr("x", 0)
		.attr("y", function (d, i) { return hccol.indexOf(i + 1) * cellSize; })
		.style("text-anchor", "left")
		.style("font-size", "5px")
		.attr("transform", "translate("+cellSize / 2 + ",-6) rotate (-90)")
		.attr("class",  function (d, i) { return "colLabel mono c" + i;} )
		.on("mouseover", function (d) {d3.select(this).classed("text-hover",true);})
		.on("mouseout" , function (d) {d3.select(this).classed("text-hover",false);})
		.on("click", function (d, i) {

			colSortOrder =! colSortOrder;
			sortbylabel("c", i, colSortOrder);
			d3.select("#order")
				.property("selectedIndex", 4)
				.node()
				.focus();
			});

	var heatMap1 = hmsvgnonfrail.append("g").attr("class","g3")
		.selectAll(".cellg")
		.data(hmdatanonfrail.links, function (d) { return d.target.id + ":" + d.source.id; })
		.enter()
		.append("rect").attr("id", function (d) { return "hmnf" + d.source.id + "-" + d.target.id; })
		.attr("x", function (d) { return hccol.indexOf(d.source.id) * cellSize; })
		.attr("y", function (d) { return hcrow.indexOf(d.target.id) * cellSize; })
		.attr("class", function (d) { return "cell cell-border cr" + (d.target.id - 1) + " cc" + (d.source.id-1); })
		.attr("width", cellSize)
		.attr("height", cellSize)
		.style("fill", function (d) { return colorScale(d.value); })
			.on("click", function (d) {

				var rowtext = d3.select(".r" + (d.target.id - 1));
				if(rowtext.classed("text-selected") == false){

					rowtext.classed("text-selected", true);
				}else{

					rowtext.classed("text-selected", false);
				}
			})
			.on("mouseover", function (d){
			
				
				d3.select(this).classed("cell-hover", true);
			
				tooltipHeatmap(d);	
			})
			.on("mouseout", function(){

					d3.select(this).classed("cell-hover",false);
					d3.selectAll(".rowLabel").classed("text-highlight",false);
					d3.selectAll(".colLabel").classed("text-highlight",false);
					d3.select("#tooltip").classed("hidden", true);
			})
			.on("click", function (d){
			
				cellid = d.source.id + "-" + d.target.id;
				clickLinkactivate(cellid);
			})
			.on("dblclick", function (d){
				
				cellid = d.source.id + "-" + d.target.id
				clickLinkdeactivate(cellid);
			});

	var rowLabels2 = hmsvgfrail.append("g")
		.selectAll(".rowLabelg")
		.data(hmdatafrail.nodes)
		.enter()
		.append("text")
		.text(function (d) { return d.id; })
		.attr("x", 0)
		.attr("y", function (d, i) { return hcrow.indexOf(i + 1) * cellSize; })
		.style("text-anchor", "end")
		.style("font-size", "5px")
		.attr("transform", "translate(-6," + cellSize / 1.5 + ")")
		.attr("class", function (d, i) { return "rowLabel mono r" + i;} ) 
		.on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
		.on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
		.on("click", function(d,i) {

			rowSortOrder =! rowSortOrder;
			sortbylabel("r", i, rowSortOrder); 
			d3.select("#order")
				.property("selectedIndex", 4)
				.node()
				.focus();
			});


	var colLabels2 = hmsvgfrail.append("g")
		.selectAll(".colLabelg")
		.data(hmdatafrail.nodes)
		.enter()
		.append("text")
		.text(function (d) { return d.id; })
		.attr("x", 0)
		.attr("y", function (d, i) { return hccol.indexOf(i + 1) * cellSize; })
		.style("text-anchor", "left")
		.style("font-size", "5px")
		.attr("transform", "translate("+cellSize / 2 + ",-6) rotate (-90)")
		.attr("class",  function (d, i) { return "colLabel mono c" + i;} )
		.on("mouseover", function (d) {d3.select(this).classed("text-hover",true);})
		.on("mouseout" , function (d) {d3.select(this).classed("text-hover",false);})
		.on("click", function (d, i) {

			colSortOrder =! colSortOrder;
			sortbylabel("c", i, colSortOrder);
			d3.select("#order")
				.property("selectedIndex", 4)
				.node()
				.focus();
			});

	var heatMap2 = hmsvgfrail.append("g").attr("class","g3")
		.selectAll(".cellg")
		.data(hmdatafrail.links, function (d) { return d.target.id + ":" + d.source.id; })
		.enter()
		.append("rect").attr("id", function (d) { return "hmf" + d.source.id + "-" + d.target.id; })
		.attr("x", function (d) { return hccol.indexOf(d.source.id) * cellSize; })
		.attr("y", function (d) { return hcrow.indexOf(d.target.id) * cellSize; })
		.attr("class", function (d) { return "cell cell-border cr" + (d.target.id - 1) + " cc" + (d.source.id-1); })
		.attr("width", cellSize)
		.attr("height", cellSize)
		.style("fill", function (d) { return colorScale(d.value); })
			.on("click", function (d) {

				var rowtext = d3.select(".r" + (d.target.id - 1));
				if(rowtext.classed("text-selected") == false){

					rowtext.classed("text-selected", true);
				}else{

					rowtext.classed("text-selected", false);
				}
			})
			.on("mouseover", function (d){
		
				d3.select(this).classed("cell-hover", true);
				tooltipHeatmap(d);
			})
			.on("mouseout", function(){

					d3.select(this).classed("cell-hover",false);
					d3.selectAll(".rowLabel").classed("text-highlight",false);
					d3.selectAll(".colLabel").classed("text-highlight",false);
					d3.select("#tooltip").classed("hidden", true);
			})
			.on("click", function (d){
			
				cellid = d.source.id + "-" + d.target.id;
				clickLinkactivate(cellid);
			})
			.on("dblclick", function (d){
				
				cellid = d.source.id + "-" + d.target.id
				clickLinkdeactivate(cellid);
			});
};

