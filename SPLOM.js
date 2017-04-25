// Sam Neubauer and Kyle Schiller
// LAB marks code taken from Eric Alexander's d3_lab

// LAB: First, we will create some constants to define non-data-related parts of the visualization
const SPLOMw = 200;			// Width of our visualization
const SPLOMh = 200;			// Height of our visualization
const SPLOMxOffset = 40;		// Space for x-axis labels
const SPLOMyOffset = 40;		// Space for y-axis labels
const SPLOMmargin = 0;		// SPLOMMargin around visualization
const buffer = 25;
const defaultColor = "rgb(250, 200, 250)";
const selectedColor = "rgb(250, 200, 0)";
const SPLOMvals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure','tufte_metric'];
const SPLOMaxis_names = {'flight_index': 'Flight Index', 
			  		'num_o_ring_distress': 'O-rings in Distress',
			  		'launch_temp': 'Launch Temperature (F)',
			  		'leak_check_pressure': 'Leak-check Pressure (psi)',
			 		'tufte_metric': 'Tufte Metric'};

function plot(xIndex, yIndex, svg) {
	// console.log(xIndex, yIndex);
	var xVal = SPLOMvals[xIndex];
	var yVal = SPLOMvals[yIndex];

	var xBase = (SPLOMw+buffer)*xIndex;
	var yBase = (SPLOMh+buffer)*yIndex+10;
	
	if(xIndex != yIndex) {

		// LAB: Next, we will load in our CSV of data
		d3.csv('challenger.csv', function(csvData) {
			data = csvData;

			// LAB
			// This will define scales that co nvert values
			// from our data domain into screen coordinates.
			xScale = d3.scale.linear()
						.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
								 d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
							.range([SPLOMyOffset + SPLOMmargin + xBase, SPLOMw - SPLOMmargin + xBase]);
			yScale = d3.scale.linear()
						.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
								 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
						.range([SPLOMh - SPLOMxOffset - SPLOMmargin + yBase, SPLOMmargin + yBase]); // Notice this is backwards!

			// LAB
			// Build axes! (These are kind of annoying, actually...)
			console.log(xIndex, yIndex);
			xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')
						.ticks(5);
			xAxisG = svg.append('g')
						.attr('class', 'axis')
						.attr('transform', 'translate(0,' + (SPLOMh - SPLOMxOffset + yBase) + ')')
						.call(xAxis);
			xLabel = svg.append('text')
						.attr('class','label')
						.attr('x', SPLOMw/2 + 20 + xBase)
						.attr('y', SPLOMh - 5 + yBase)
						.text(SPLOMaxis_names[xVal]);

			yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.ticks(5);
			yAxisG = svg.append('g')
						.attr('class', 'axis')
						.attr('transform', 'translate(' + (SPLOMyOffset + xBase) + ',0)')
						.call(yAxis);
			yLabel = svg.append('text')
						.attr('class','label')
						.attr('transform', 'rotate(-90)')
						.attr('x', (-SPLOMyOffset-55 - xBase))
						.attr('y', (yBase))
						.text(SPLOMaxis_names[xVal]);

			for (i = 0; i < 23; i++) {
				circle = svg.append('circle')
							.attr('class', "x" + parseInt(i))
							.attr('cx', xScale(data[i][xVal]))
							.attr('cy', yScale(data[i][yVal]))
							.attr('r', 5)
							.style("fill", defaultColor);
			
				circle
					.append('svg:title')
					.text(function(d) {return SPLOMvals.map(val =>  "\n" + SPLOMaxis_names[val] + ": " + data[i][val]); } );

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
						newColor = currentColor == `fill: ${defaultColor};` ? selectedColor : defaultColor;
						d3.selectAll("." + curPoint.attr("class"))
							.style("fill", newColor);
					});
			}
		});
	} else {
		xLabel = svg.append('text')
			.attr('class','label')
			.attr('x', SPLOMw/2 + xBase)
			.attr('y', SPLOMh/2 + yBase)
			//.text(axis_names[xVal]);
			.text(SPLOMaxis_names[xVal]);
	}
}

// LAB: Next, we will create an SVG element to contain our visualization.
svg = d3.select('#pointsSVG').append('svg:svg')
	.attr('width', (SPLOMw+buffer)*5)
	.attr('height', (SPLOMh+buffer)*5);

for(x = 0; x < 5; x++) {
	for(y = 0; y < 5; y++) {
		plot(x, y, svg);				
	}
}