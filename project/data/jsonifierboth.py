import json
import csv

url = "/Users/raoullieben/Documents/Psychobiologie/minorprogrammeren/project/meancorrnonfrail.csv"
url2 = "/Users/raoullieben/Documents/Psychobiologie/minorprogrammeren/project/AALregionsinclCnonfrail.csv"
url3 = "/Users/raoullieben/Documents/Psychobiologie/minorprogrammeren/project/modularitylouvain.txt"

def jsonifier(url, url2, url3):

	# open file
	infile = open(url, 'r')
	data = infile.read()

	# split data at lines
	datasplit = data.splitlines()

	print(datasplit)

	# initiate empty dict for links
	links = []
	ctr = 0
	heatmap = []
	heatmappie = []

	avecorrstrength = []
	# heatmapheader = "row_idx    col_idx    log2ratio"
	# heatmappie.append(heatmapheader)

	# iterate over lines
	for i in range(len(datasplit)):

		sourceindex = i + 1

		tmp = datasplit[i].split(';')
		avecorrstrengthtmp = 0

		# iterate over connectivity strengths
		for j in range(len(tmp)):

			tmp2 = 0
			targetindex = j + 1

			# # ctr = ctr + 1

			heatmap2 = str(sourceindex) + "	" + str(targetindex) + "	" + str(tmp[j])
			heatmappie.append(heatmap2)
			avecorrstrengthtmp = avecorrstrengthtmp + float(tmp[j])

			if float(tmp[j]) > 0.25:

				print(j)
				links.append({'source': sourceindex, 'target': targetindex, 'value': tmp[j]})
				ctr = ctr + 1

				# heatmap2 = str(sourceindex) + ',' + str(targetindex) + ',' + str(tmp[j])
				# heatmap2 = str(sourceindex) + "	" + str(targetindex) + "	" + str(tmp[j])
				# heatmappie.append(heatmap2)
				# heatmap.append(sourceindex)
				# heatmap.append(targetindex)
				# heatmap.append(tmp[j])
			
			# else:
			# 	heatmap2 = str(sourceindex) + "	" + str(targetindex) + "	" + str(0)
			# 	heatmappie.append(heatmap2)

		avecorrstrength.append((avecorrstrengthtmp/ 90))


	# open file
	infile = open(url2, 'r')
	data2 = infile.read()

	# split data2 at lines
	datasplit2 = data2.splitlines()

	# open file
	infile2 = open(url3, 'r')
	data3 = infile2.read()

	# split data2 at lines
	datasplit3 = data3.splitlines()

	# initiate empty dict for nodes
	nodes = []

	# iterate over lines
	for i in range(len(datasplit2)):

		splittednode = datasplit2[i].split(';')
		splittedmod = datasplit3[i].split("	")
		print(splittedmod[0])

		
		idindex = i + 1
		nodes.append({'id': idindex, 'name': splittednode[0], 'group' : splittednode[1], 'avecorrstr' : avecorrstrength[i], 'mod' : splittedmod[0]})


	# creating dict for nodes and links
	total = {'nodes': nodes, 'links': links}
	# print(total)

	# # print statement in terminal for tsv values
	# for line in heatmappie:
	# 	print(line)

	# place data2 in variable
	jsondicts = json.dumps(total)

	# load the data2 into the variable
	jsonified = json.loads(jsondicts)

	# write data2 to output file
	with open('jsonifiedfrail.json', 'w') as outfile:
		json.dump(jsonified, outfile)

	# textfile = open("textfile.txt","w") 
 
	# for i in range(len(heatmappie)):
	# 	textfile.writerows(heatmappie[i]) 

	# textfile.close()

	# Write the CSV file to disk (including a header)
	# # with open('OUTPUT_CSV.csv', 'w') as output_file:
		
	# 	# initiatie csv file
	# 	writer = csv.writer(output_file, delimiter=' ', quotechar='|')

	# 	# writer.writerow(['row_idx', 'col_idx', 'log2ratio'])
		
	# 	a = '139482'
	# 	b = '2'
	# 	c = '3'

	# 	for line in heatmappie:
	# 		print(line)
	# 		writer.writerows(line)


jsonifier(url, url2, url3)