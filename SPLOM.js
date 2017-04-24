// Part of a brief D3 tutorial.
// Upon completion, will display an interactive scatterplot showing relationship between
//   different values associated with the top 100 words in Shakespeare's First Folio
// CS 314, Spring 2017
// Eric Alexander

// First, we will create some constants to define non-data-related parts of the visualization
w = 200;			// Width of our visualization
h = 200;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
yOffset = 40;		// Space for y-axis labels
margin = 0;		// Margin around visualization
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure','tufte_metric'];
axis_names = {'flight_index': 'Flight Index', 
			  'num_o_ring_distress': 'O-rings Experiencing Distress',
			  'launch_temp': 'Launch Temperature (degrees F)',
			  'leak_check_pressure': 'Leak-check Pressure (psi)',
			  'tufte_metric': 'Tufte Metric',};

function plot(xIndex, yIndex, svg) {
	var xVal = vals[xIndex];
	var yVal = vals[yIndex];
	// console.log(xVal);
	// console.log(yVal);
	// Next, we will load in our CSV of data
	d3.csv('challenger.csv', function(csvData) {
		data = csvData;

		var xBase = w*xIndex;
		var yBase = h*yIndex;

		// This will define scales that convert values
		// from our data domain into screen coordinates.
		xScale = d3.scale.linear()
					.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
							 d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
						.range([yOffset + margin + xBase, w - margin + xBase]);
		yScale = d3.scale.linear()
					.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
							 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
					.range([h - xOffset - margin + yBase, margin + yBase]); // Notice this is backwards!

		// Build axes! (These are kind of annoying, actually...)
		xAxis = d3.svg.axis()
					.scale(xScale)
					.orient('bottom')
					.ticks(5);
		xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0,' + (h - xOffset + yBase) + ')')
					.call(xAxis);
		xLabel = svg.append('text')
					.attr('class','label')
					.attr('x', w/2 + xBase)
					.attr('y', h - 5 + yBase)
					.text(xVal);
		            // Uncomment the following event handler to change xVal by clicking label (and remove above semi-colon)
					//.on('click', function() {
					//	setXval(getNextVal(xVal));
					//});
		yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('left')
					.ticks(5);
		yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + (yOffset + xBase) + ',0)')
					.attr('left', xBase)
					.attr('position', 'absolute')
					.call(yAxis);
		yLabel = svg.append('text')
					.attr('class','label')
					.attr('transform', 'rotate(-90)')
					.attr('x', (-yOffset-40 - xBase))
					.attr('y', (h/2-90 + yBase)) //TODO(SAM) make this cloud based
					.text(yVal);
					// Uncomment the following event handler to change yVal by clicking label (and remove above semi-colon)
					//.on('click', function() {
					//	setYval(getNextVal(yVal));
					//});

		// Now, we will start actually building our scatterplot!
		// *****************************************************
		// ************** YOUR CODE WILL GO HERE! **************
		// *****************************************************
			// Select elements
			// Bind data to elements

			// Create new elements if needed

			// Update our selection
				// Give it a class
				// x-coordinate
				// y-coordinate
				// radius
	            // color
				// tooltip?

		// circles = svg.selectAll('circle')
		// 	.data(csvData);
		// circles.enter()
		// 	.append('svg:circle')
		// 	.attr('class', function(d) { return "x" + parseInt(d['flight_index']); })
		// 	.attr('cx', function(d) { return xScale(d[xVal]) + xBase; })
		// 	.attr('cy', function(d) { return yScale(d[yVal]) + yBase; })
		// 	.attr('r', 5)
		// 	.style("fill", "red");
		for (i = 1; i < 23; i++) {
			circle = svg.append('circle')
						.attr('class', "x" + parseInt(i))
						.attr('cx', xScale(data[i][xVal]))
						.attr('cy', yScale(data[i][yVal]))
						.attr('r', 5)
						.style("fill", "red");
		
			circle
				.append('svg:title');
				//.text(function(d) {return vals.map(val => "\n" + axis_names[val] + ": " + d[val]); } );

			circle
				.on('mouseover', function() {
					curPoint = d3.select(this);
					d3.selectAll("." + curPoint.attr('class'))
						.attr('r', 10);
				})

				.on('mouseout', function() {
					curPoint = d3.select(this);
					d3.selectAll("." + curPoint.attr('class'))
						.attr('r', 5);
				})
			
				.on('click', function() {
					curPoint = d3.select(this);
					currentColor = curPoint.attr("style")
					newColor = currentColor == "fill: red;" ? "blue" : "red";
					d3.selectAll("." + curPoint.attr("class"))
						.style("fill", newColor);
				});
		}

		// circles = svg.selectAll('circle');
		
		// circles
		// 	.append('svg:title');
		// 	.text(function(d) {return vals.map(val => "\n" + axis_names[val] + ": " + d[val]); } );

		// circles
		// 	.on('mouseover', function() {
		// 		curPoint = d3.select(this);
		// 		d3.selectAll("." + curPoint.attr('class'))
		// 			.attr('r', 10);
		// 	})

		// 	.on('mouseout', function() {
		// 		curPoint = d3.select(this);
		// 		d3.selectAll("." + curPoint.attr('class'))
		// 			.attr('r', 5);
		// 	})
		
		// 	.on('click', function() {
		// 		curPoint = d3.select(this);
		// 		currentColor = curPoint.attr("style")
		// 		newColor = currentColor == "fill: red;" ? "blue" : "red";
		// 		d3.selectAll("." + curPoint.attr("class"))
		// 			.style("fill", newColor);
		// 	});
	});
}

// A function to retrieve the next value in the vals list
function getNextVal(val) {
	return vals[(vals.indexOf(val) + 1) % vals.length];
}

// A function to change what values we plot on the x-axis
function setXval(val) {
	// Update xVal
	xVal = val;

	// Update the axis
	xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
	xAxis.scale(xScale);
	xAxisG.call(xAxis);
	xLabel.text(xVal);

	// Update the points
	// ************************************************
	// *********** YOUR CODE WILL GO HERE **************
	// ************************************************
}

// A function to change what values we plot on the y-axis
function setYval(val) {
	// Update yVal
	yVal = val;

	// Update the axis
	yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
	yAxis.scale(yScale);
	yAxisG.call(yAxis);
	yLabel.text(yVal);

	// Update the points
	// ************************************************
	// *********** YOUR CODE WILL GO HERE *************
	// ************************************************
}

// Next, we will create an SVG element to contain our visualization.
svg = d3.select('#pointsSVG').append('svg:svg')
	.attr('width', w*5)
	.attr('height', h*5);

for(x = 0; x < 5; x++) {
	for(y = 0; y < 5; y++) {
		plot(x, y, svg);				
	}
}