// Part of a brief D3 tutorial.
// Upon completion, will display an interactive scatterplot showing relationship between
//   different values associated with the top 100 words in Shakespeare's First Folio
// CS 314, Spring 2017
// Eric Alexander

// First, we will create some constants to define non-data-related parts of the visualization
w = 200;			// Width of our visualization
h = 500;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
yOffset = 80;		// Space for y-axis labels
margin = 0;		// Margin around visualization
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure','tufte_metric'];

function plot(xIndex, yIndex) {
	var xVal = vals[xIndex];
	var yVal = vals[yIndex];
	// console.log(xVal);
	// console.log(yVal);
	// Next, we will load in our CSV of data
	d3.csv('challenger.csv', function(csvData) {
		data = csvData;

		
		var yScales = [];
		for(x = 0; x < 5; x++) {
			var yScale = d3.scale.linear()
					.domain([d3.min(data, function(d) { return parseFloat(d[vals[x]]); }),
							 d3.max(data, function(d) { return parseFloat(d[vals[x]]); })])
					.range([h - yOffset + 60, 60]); // Notice this is backwards!
			yScales.push(yScale);
		}


		// Next, we will create an SVG element to contain our visualization.
		svg = d3.select('#pointsSVG').append('svg:svg')
					.attr('width', w*5)
					.attr('height', h);

		// Build axes! (These are kind of annoying, actually...)
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
				.attr('x', w*x+100)
				.attr('y', 60)
				.attr('width', 10)
				.attr('height', h-yOffset)
				.attr('opacity', .2)
			svg.append('rect')
				.attr('x', w*x+104)
				.attr('y', 60)
				.attr('width', 2)
				.attr('height', h-yOffset)
		}

		var pathFunc = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;})
                        .interpolate("linear"); 

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
		 		console.log(pointsString);
		 		return pointsString; 
		 	})
		 	.attr("fill", "none")
		 	.attr("stroke", "black")
		 	.attr("stroke-width", "3");

		lines
			.on('click', function() {
				d3.select(this)
				 	.attr("stroke", "red")
			});

		lines
			.on('mouseover', function() {
				d3.select(this)
				 	.attr("stroke-width", "5");
			});

		lines
			.on('mouseout', function() {
				d3.select(this)
				 	.attr("stroke-width", "3");
			});
		// Specify the path points         
        

		// xLabel = svg.append('text')
		// 			.attr('class','label')
		// 			.attr('x', w/2)
		// 			.attr('y', h - 5)
		// 			.text(xVal);
		// xLabel2 = svg.append('text')
		// 			.attr('class','label')
		// 			.attr('x', w)
		// 			.attr('y', h - 5)
		// 			.text(xVal);
		            // Uncomment the following event handler to change xVal by clicking label (and remove above semi-colon)
					//.on('click', function() {
					//	setXval(getNextVal(xVal));
					//});
		// yAxis = d3.svg.axis()
		// 			.scale(yScale)
		// 			.orient('left')
		// 			.ticks(5);
		// yAxisG = svg.append('g')
		// 			.attr('class', 'axis')
		// 			.attr('transform', 'translate(' + yOffset + ',0)')
		// 			.call(yAxis);
		// yLabel = svg.append('text')
		// 			.attr('class','label')
		// 			.attr('transform', 'rotate(-90)')
		// 			.attr('x', -yOffset-40)
		// 			.attr('y', h/2-90) //TODO(SAM) make this cloud based
		// 			.text(yVal);
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
		// 	.attr('cx', function(d) { return xScale(d[xVal]); })
		// 	.attr('cy', function(d) { return yScale(d[yVal]); })
		// 	.attr('r', 5)
		// 	.style("fill", "red");

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

plot(1,2)