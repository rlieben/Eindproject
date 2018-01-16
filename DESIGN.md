#### Data sources:

Data from the BioCog research group of University Medical Centre Utrecht.

The data needs to be converged with demographics data and other specifications about the nodes. 
Next it should be converted into JSON format, such as done in this format:
http://bl.ocks.org/jose187/4733747

#### Diagram:
See github doc diagramsketch.jpeg
https://github.com/rlieben/Eindproject/blob/master/doc/diagramsketch.JPG
![]https://github.com/rlieben/Eindproject/blob/master/doc/diagramsketch.JPG

#### Components:

Website: Bootstrap is used for designing the html pages.
Dataset: all network datasets are in a queue for all other aspects. Only one is loaded every time. This is done by a drop-down menu.
Network graph: every nodes has connections to other nodes and this needs to be implemented in the JSON file. Also each connection strength has to be taken into account.
Table with node info: this is also in the JSON file and needs to be implemented in the table.
Heatmap: If a node is clicked, all connections from that node have to be extracted from the data and all corresponding connection strengths have to be scaled for the colour scheme.
Static table with demographics: Demographic data of the total dataset has to be put into a table.

#### Plugins:
- D3-V3
- D3-queue
