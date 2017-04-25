// Sam Neubauer and Kyle Schiller
// LAB marks code taken from Eric Alexander's d3_lab

// LAB: First, we will create some constants to define non-data-related parts of the visualization
const w = 200;			// Width of our visualization
const h = 500;			// Height of our visualization
const xOffset = 40;		// Space for x-axis labels
const yOffset = 80;		// Space for y-axis labels
const margin = 0;		// Margin around visualization
const vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure','tufte_metric'];
const defaultColoring = 2;

// LAB: Load in our CSV of data
d3.csv('challenger.csv', function(csvData) {
	data = csvData;

	var colorScales = [];
	for(x = 0; x < 5; x++) {
		var colorScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[vals[x]]); }),
						 d3.max(data, function(d) { return parseFloat(d[vals[x]]); })])
				.range([0, 255]); // Notice this is backwards!
		colorScales.push(colorScale);
	}

	var yScales = [];
	for(x = 0; x < 5; x++) {
		// LAB
		var yScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[vals[x]]); }),
						 d3.max(data, function(d) { return parseFloat(d[vals[x]]); })])
				.range([h - yOffset + 60, 60]); // Notice this is backwards!
		yScales.push(yScale);
	}

	lineColor = (d, index) => {
		colorValue = (parseInt(colorScales[index](d[vals[index]])));
		return "rgb(250,200," + colorValue + ")";
	};

	// LAB Next, we will create an SVG element to contain our visualization.
	svg = d3.select('#pointsSVG2').append('svg:svg')
				.attr('width', w*5)
				.attr('height', h*2);

	for(x = 0; x < 5; x++) {
		svg.append('text')
			.attr('x', w*x+100)
			.attr('y', 30)
			.text(vals[x]);
		svg.append('text')
			.attr('x', w*x+100)
			.attr('y', 50)
			.text(d3.max(data, function(d) { return parseFloat(d[vals[x]]); }));
		svg.append('text')
			.attr('x', w*x+100)
			.attr('y', h)
			.text(d3.min(data, function(d) { return parseFloat(d[vals[x]]); }));
		svg.append('rect')
			.attr('index', x)
			.attr('x', w*x+100)
			.attr('y', 60)
			.attr('width', 10)
			.attr('height', h-yOffset)
			.attr('opacity', .2)
			.attr('fill', (d) => { return x==defaultColoring ? 'red' : 'black'; });
		svg.append('line')
			.attr('x1', w*x+105)
			.attr('y1', 60)
			.attr('x2', w*x+105)
			.attr('y2', h-yOffset+60)
			.attr("stroke-width", 1)
			.attr("stroke", "black");
	}

	lines = svg.selectAll('polyline')
		.data(csvData);

	lines.enter()
	 	.append('svg:polyline')
	 	.attr('points', function(d) {
	 		var pointsString = "";
	 		for(i = 0; i < 5; i++) {
	 			var x = w*i+104;
	 			var y = yScales[i](d[vals[i]]);
	 			pointsString += parseInt(x) + "," + parseInt(y) + " ";
	 		}
	 		return pointsString; 
	 	})
	 	.attr("fill", "none")
		.attr("stroke", (d) => { return lineColor(d, defaultColoring); })
		.attr("unclick-stroke", (d) => { return lineColor(d, defaultColoring); })
	 	.attr("stroke-width", "2");

	lines
		.on('click', function() {
			curLine = d3.select(this);
			currentColor = curLine.attr("stroke")
			newColor = currentColor == "black" ? curLine.attr('unclick-stroke') : "black";
			curLine.attr("stroke", newColor)
		});

	lines
		.on('mouseover', function() {
			d3.select(this)
			 	.attr("stroke-width", "5");
		});

	lines
		.on('mouseout', function() {
			d3.select(this)
			 	.attr("stroke-width", "2");
		});

	rects = svg.selectAll('rect');

	rects
		.on('click', function() {
			d3.selectAll('rect').attr('fill', 'black');
			curRect = d3.select(this);
			index = curRect.attr('index');
			curRect
				.attr('fill', 'red');
			selectedLines = d3.selectAll("[stroke=black]");
			lines
				.attr("unclick-stroke", (d) => { return lineColor(d, 0); })
			 	.transition()
		        .duration(500)	
		        .attr("stroke", (d) => { return lineColor(d, index); });
			selectedLines		
			 	.transition()
		        .duration(500)	
				.attr("stroke", "black");
		})
});

