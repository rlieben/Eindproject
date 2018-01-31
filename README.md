Copyright (c) 2018 Raoul Lieben

##### Study: Minor programming, University of Amsterdam
##### Course: Programmeerproject
##### Student ID: 10556346
##### Name: Raoul Lieben
##### Content: Visualization of functional frail and non-frail brain network data

Go to project: Github Pages Project: https://rlieben.github.io/Eindproject

# Functional brain network visualization
This application is build to visualize functional brain network data. This field of research is fairly new and that's why a good visualization tool is needed. The schematic overview and draggable nodes give a good insight in how the network is build. The nodes represent brain regions and the links correlation in activity between them. The idea was to create a template to observe the network and some network parameters. The idea was later expanded to do not only this, but also add an extra network. The barchart gives a good opportunity to compare certain values of network parameters within and between networks. The heatmap also gives a good insight of the modules. 
![](doc/nw.png)
![](doc/bc.png)
![](doc/hm.png)

## Content

The application is shown with an average frail and non-frail functional brain network. Frailty is a vulnerable state of increased risk of adverse health outcomes or dying when exposed to a stressor. 
A property of networks is modularity. This is the subdivision of a network in smaller clustered networks called modules. In the visualization, the colours show to what module the node belongs to. There is no legend added for this, because the modules itself do not have a name, but merely the colour is defining which module a node belongs to. The network is established on a correlation on how much the signal of two brain regions correlate. The shorter the length of the weight, the stronger the correlation. 
The barchart show average correlation strength of each node or modularity value of each node. The first speaks for itself, but the latter is the degree in how modular the node is. There is no unit of measure for these parameters, so I did not add it to the y-axis.
The heatmap shows correlation strength between each node.

## Sources

https://bl.ocks.org/mbostock/4062045

https://bl.ocks.org/ianyfchang/8119685#data_heatmap.tsv

https://bl.ocks.org/mbostock/3885304

https://bl.ocks.org/d3noob/7030f35b72de721622b8

https://github.com/shanegibney/D3-v4-Sortable-Bar-Chart-Checkbox-1-Value/blob/master/index.html

https://d3js.org/

https://getbootstrap.com/
