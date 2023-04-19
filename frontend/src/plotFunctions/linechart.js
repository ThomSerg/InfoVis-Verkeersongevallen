import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart({ width, height }) {
  const svgRef = useRef(null);

  useEffect(() => {

    const margin = { top: 30, right: 10, bottom: 10, left: 0 };
    const width = 1800 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then(function (data) {

      // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
      const dimensions = ['Sepal_Length', 'Sepal_Width', 'Petal_Length', 'Petal_Width']
      

      // For each dimension, I build a linear scale. I store all in a y object
      const y = {}
      for (let i in dimensions) {
        const name = dimensions[i]
        y[name] = d3.scaleLinear()
          .domain(d3.extent(data, function (d) { return +d[name]; }))
          .range([height, 0])
      }

      // Build the X scale -> it find the best position for each Y axis
      const x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);

      // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
      function path(d) {
        return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
      }

      // Draw the lines
      svg
        .selectAll("myPath")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "#69b3a2")
        .style("opacity", 0.5)
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "black");
            
        });

      // Draw the axis:
      svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        // Add axis title
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function (d) { return d; })
        .style("fill", "black")

    })
  }, [])


  return (
    <div ref={svgRef}></div>
  );
}

export default LineChart;
