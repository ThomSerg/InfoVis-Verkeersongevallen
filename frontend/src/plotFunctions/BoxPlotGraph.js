import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import data2 from "../europe_gov.csv";


function BoxPlotGraph({cat1, cat2}) {
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
d3.csv(data2).then(data => { 



// Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
const sumstat = Array.from(d3.group(data, d => d[cat1]), ([key, values]) => {
  const q1 = d3.quantile(values.map(d => d[cat2]).sort(d3.ascending), 0.25);
  const median = d3.quantile(values.map(d => d[cat2]).sort(d3.ascending), 0.5);
  const q3 = d3.quantile(values.map(d => d[cat2]).sort(d3.ascending), 0.75);
  const interQuantileRange = q3 - q1;
  const min = q1 - 1.5 * interQuantileRange;
  const max = q3 + 1.5 * interQuantileRange;
  return { key, values, q1, median, q3, interQuantileRange, min, max };
}).filter(({ key }) => key !== "");

//console.log(sumstat);

const driverValues = data.reduce((acc, cur) => {
  if (!acc.includes(cur[cat1])) {
    acc.push(cur[cat1]);
  }
  return acc;
}, []).sort(d3.ascending).filter(d => d !== "");



// Show the X scale
var x = d3.scaleBand()
.range([ 0, width ])
.domain(driverValues)
.paddingInner(1)
.paddingOuter(.5);

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Show the Y scale
var y = d3.scaleLinear()
.domain([-0.1,0.5])
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
var boxWidth = 20;
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
var jitterWidth = 5;
svg.selectAll("indPoints")
  .data(data.filter(d => d[cat1] !== ""))
  .join("circle")
    .attr("cx", d => x(d[cat1]) - jitterWidth / 2 + Math.random() * jitterWidth)
    .attr("cy", d => y(d[cat2]))
    .attr("r", 3)
    .attr("fill", "white")
    .attr("stroke", "black");



});
}, [cat1,cat2]);

return (
  <svg ref={svgRef} width="500" height="500"/>
);
}


export default BoxPlotGraph;