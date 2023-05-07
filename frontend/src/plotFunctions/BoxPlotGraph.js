import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

function BoxPlotGraph() {
  const svgRef = useRef(null);

  useEffect(() => {

    // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(svgRef.current)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Read the data and compute summary statistics for each specie
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then(data => { 



// Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
// Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
// Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
const sumstat = Array.from(d3.group(data, d => d.Species), ([key, values]) => {
  const q1 = d3.quantile(values.map(d => d.Sepal_Length).sort(d3.ascending), 0.25);
  const median = d3.quantile(values.map(d => d.Sepal_Length).sort(d3.ascending), 0.5);
  const q3 = d3.quantile(values.map(d => d.Sepal_Length).sort(d3.ascending), 0.75);
  const interQuantileRange = q3 - q1;
  const min = q1 - 1.5 * interQuantileRange;
  const max = q3 + 1.5 * interQuantileRange;
  return { key, values, q1, median, q3, interQuantileRange, min, max };
});

console.log(sumstat);


// Show the X scale
var x = d3.scaleBand()
.range([ 0, width ])
.domain(["setosa", "versicolor", "virginica"])
.paddingInner(1)
.paddingOuter(.5);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Show the Y scale
var y = d3.scaleLinear()
.domain([3,9])
.range([height, 0]);
svg.append("g").call(d3.axisLeft(y));

// Show the main vertical line
svg
.selectAll("vertLines")
.data(sumstat)
.join("line")
  .attr("x1", d => x(d.key))
  .attr("x2", d => x(d.key))
  .attr("y1", d => y(d.min))
  .attr("y2", d => y(d.max))
  .attr("stroke", "black")
  .style("width", 40);

// rectangle for the main box
var boxWidth = 100;
svg.selectAll("boxes")
  .data(sumstat)
  .join("rect")
    .attr("x", d => x(d.key) - boxWidth / 2)
    .attr("y", d => y(d.q3))
    .attr("height", d => y(d.q1) - y(d.q3))
    .attr("width", boxWidth)
    .attr("stroke", "black")
    .attr("fill", "#69b3a2");

// Show the median
svg.selectAll("medianLines")
  .data(sumstat)
  .join("line")
    .attr("x1", d => x(d.key) - boxWidth / 2)
    .attr("x2", d => x(d.key) + boxWidth / 2)
    .attr("y1", d => y(d.median))
    .attr("y2", d => y(d.median))
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Add individual points with jitter
var jitterWidth = 50;
svg.selectAll("indPoints")
  .data(data)
  .join("circle")
    .attr("cx", d => x(d.Species) - jitterWidth / 2 + Math.random() * jitterWidth)
    .attr("cy", d => y(d.Sepal_Length))
    .attr("r", 4)
    .attr("fill", "white")
    .attr("stroke", "black");



});
}, []);

return <svg ref={svgRef}></svg>;
}


export default BoxPlotGraph;