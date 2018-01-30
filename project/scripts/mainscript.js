window.onload = function(){


	// create queue
	// queue()
	// .defer(d3.json, 'jsonifiednonfrail.json')
	// .defer(d3.json, 'jsonifiedfrail.json')
	// .await(updateGraph);

	// color scheme network graph
	var colorgraph = d3.scaleOrdinal(d3.schemeCategory10);



	updateGraph();

	function updateGraph(error){
		if (error) throw error;

		d3.json('jsonifiedfrail.json', function(datafrail) {

			d3.json('jsonifiednonfrail.json', function(datanonfrail){
			
			
			makeNetwork(datanonfrail, datafrail);
			makeBarchart(datanonfrail, datafrail);
			makeHeatmap(datanonfrail, datafrail);

			});
		});
	}


	// d3.select("#order").on("change",function(){
 //  	  	order(this.value);
 //  	});

 //  	function order(value){
 //   		if (value == "conn1"){

 //   			d3.select("#svgnf").removeAll()
 //   			d3.select("#svgf").removeAll()
 //   			d3.select("#svgbcnf").removeAll()
 //   			d3.select("#svgbcf").removeAll()
 //   			d3.select("#svghmnf").removeAll()
 //   			d3.select("#svgmf").removeAll()

 //   			d3.json('jsonifiedfrail1.json', function(datanonfrail) {

	// 			d3.json('jsonifiednonfrail.json', function(datafrail){

	// 				makeNetwork(datanonfrail, datafrail);
	// 				makeBarchart(datanonfrail, datafrail);
	// 				makeHeatmap(datanonfrail, datafrail);
	// 			});
	// 		});

   					
   			

 //   			// makeNetwork()

 //   		} else if (value == "conn2"){

 //   			d3.select("#svgnf").remove()
 //   			d3.select("#svgf").remove()
 //   			d3.select("#svgbcnf").remove()
 //   			d3.select("#svgbcf").remove()
 //   			d3.select("#svghmnf").remove()
 //   			d3.select("#svghmf").remove()

 //   			d3.json('jsonifiedfrail.json', function(datanonfrail) {

	// 			d3.json('jsonifiednonfrail.json', function(datafrail){

	// 				console.log("Test")
	// 				console.log(datafrail)
	// 				console.log(datanonfrail)
	// 				makeNetwork(datanonfrail, datafrail);
	// 				makeBarchart(datanonfrail, datafrail);
	// 				makeHeatmap(datanonfrail, datafrail);
	// 			});
	// 		});
	// 	};
	
};