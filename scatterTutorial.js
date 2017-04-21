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

function plot(xIndex, yIndex) {
	var xVal = vals[xIndex];
	var yVal = vals[yIndex];
	console.log(xVal);
	console.log(yVal);
	// Next, we will load in our CSV of data
	d3.csv('challenger.csv', function(csvData) {
		data = csvData;

		// This will define scales that convert values
		// from our data domain into screen coordinates.
		xScale = d3.scale.linear()
					.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
							 d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
						.range([yOffset + margin, w - margin]);
		yScale = d3.scale.linear()
					.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
							 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
					.range([h - xOffset - margin, margin]); // Notice this is backwards!

		// Next, we will create an SVG element to contain our visualization.
		svg = d3.select('#pointsSVG').append('svg:svg')
					.attr('width', w)
					.attr('height', h);

		// Build axes! (These are kind of annoying, actually...)
		xAxis = d3.svg.axis()
					.scale(xScale)
					.orient('bottom')
					.ticks(5);
		xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0,' + (h - xOffset) + ')')
					.call(xAxis);
		xLabel = svg.append('text')
					.attr('class','label')
					.attr('x', w/2)
					.attr('y', h - 5)
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
					.attr('transform', 'translate(' + yOffset + ',0)')
					.call(yAxis);
		yLabel = svg.append('text')
					.attr('class','label')
					.attr('transform', 'rotate(-90)')
					.attr('x', -yOffset-40)
					.attr('y', h/2-90) //TODO(SAM) make this cloud based
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
		circles = svg.selectAll('circle')
			.data(csvData);
		circles.enter()
			.append('svg:circle')
			.attr('class', 'dataPoint')
			.attr('cx', function(d) { return xScale(d[xVal]); })
			.attr('cy', function(d) { return yScale(d[yVal]); })
			.attr('r', 2)

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


for(x = 0; x < 4; x++) {
	for(y = 0; y < 4; y++) {
		plot(x,y);				
	}
}