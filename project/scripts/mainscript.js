/*

Course: Endproject
Minor programming, University of Amsterdam
Raoul Lieben
10556346

mainscript.js : loads the data and creates all the graphs.
	also ensures the dropdown menu option calls the update function

*/

window.onload = function(){

	// loads the data and updates the graph and switches data on dropdown
	updateGraph();

	function updateGraph(error){
		if (error) throw error;

		d3.json('jsonifiedfrail.json', function(datafrail) {

			d3.json('jsonifiednonfrail.json', function(datanonfrail){
			
				makeNetwork(datanonfrail, datafrail);
				makeBarchart(datanonfrail, datafrail);
				makeHeatmap(datanonfrail, datafrail);

				d3.select("#order").on("change",function(){
				
					switchData(this.value);
				});
			});
		});
	};
};