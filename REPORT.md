## Short description

The application shows an average frail and non-frail functional brain network. Frailty is a medical condition, where people are more susceptible to such things as diseases or hospitalizations. The application shows a weighted force-directed graph, a barchart showing average correlation strength for each node and modularity value for each node and a heatmap showing all correlations of the network (see image below)

![](/doc/total.png)

## Functionality

For the functionality I will first give a basic overview of the graphs, then go into deeper detail on each element or action corresponding to the code.


### - Basic overview of the graphs
First of all there are the network graphs. The nodes are draggable, so you can look at all the connections better. All nodes are clickable and these click will trigger events which will be explained later. The nodes have different colours and the colours represent modules. 

Then there is a dropdown menu with the options "average correlation strength" and "modularity value". These will trigger an update in the barchart. Next to it is a checkbox which will sort the barchart per module and if unchecked per node. Next to that is an "unselect selection" button. Which unselects all clicked elements. More on this later.

Then we have the barchart, and each bar corresponds to a node and the colour of the node correpsonds to the module.
At last, we have the heatmap, which represents correlation strength between the nodes. 


### - Technical functionality

The visualization starts with the mainscript.js. This scripts loads the data and gives the data to three functions : makeNetwork(), makeBarchart(), makeHeatmap(). These are in the corresponding name js files. 

The makeNetwork.js draws the links and nodes for the two datasets. It also contains functions to add the drag events to the network. 

The makeBarchart.js draws the barcharts for the two datasets and two variables, but shows only one. For updating the data, there is a dropdown menu and when the other data is selected, it will hide the shown variable and show the hidden variable. Inside the function there is also a sort function for the bars. When the checkbox is clicked, this function will sort the bars per module.

The makeHeatmap.js draws the heatmap for the two datasets and adds a legend on the bottom.

Returning to the mainscript, when all three functions above are called, there is a listener for the dropdown menu, which shows other data in the barchart as described above.

Then there are three more script files. The first one interactiveClick.js is called when an element, such as a node, bar or cell is clicked it triggers an update in the other graphs. If there is a single click than clickLinkactivate() is called. The barchart and network are linked within and between the datasets. Clicking a node of bar in either one of them results in a selection of that element in all barcharts and networks. When a cell in the heatmap is clicked, the same cell, if present, is selected in the other heatmap. When one of these elements is double-clicked, clickLinkdeactive() is called and the selection of that element in all graphs is unselected. Another function in interactiveClick.js is unselectSelection(). This function is called when the button "Unselect Selection" is called. And it removes all selections of elements in all graphs.

The script dropdownSwitch.js hides or shows the selected data in the dropdown menu.

The last script is showTooltip.js and is called when the mouse hovers over an element. It returns a tooltip with some info on the element.
