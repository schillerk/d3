We used the standard Challenger dataset.

To see our final result, run python3 -m http.server and navigate to http://localhost:8000/viz.html.

To see the visualizations individually, goto to http://localhost:8000/SPLOM.html for part 1 and http://localhost:8000/parallelCoordinates.html for part 2.

The scatterplot matrix has axis titles down the diagonal, with the corresponding graphs making up a grid. The label to the side of the chart is the yaxis, the label to the top or bottom is the xaxis. You can hover over any point to enlarge it across all charts, click on it to highlight it, and hover and hold for a second to see the data point’s label.

The parallel coordinates chart has axis titles along the top, with one line for each flight, and the intersection of a line and vertical bar indicating the value of that flight on that axis. Numbers at the top and bottom of each vertical bar indicate the max/min values for that axis. As with the scatterplot, you can click on any line to highlight it, hover to enlarge, and hover and hold for a second to see a label. On this chart, clicking a vertical bar will sort all the lines based on their position on that bar, with pink indicating higher values, and yellow indicator lower values.