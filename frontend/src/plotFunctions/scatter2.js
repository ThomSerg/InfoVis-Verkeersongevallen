import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function Scatter2() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Append the SVG object to the body of the page
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv").then(data => {        
      console.log(data);

      // Add X axis
      const x = d3.scaleLinear()
        .domain([0, 4000])
        .range([0, width]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 500000])
        .range([height, 0]);

      svg.append('g')
        .call(d3.axisLeft(y));

      // Add dots
      svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.GrLivArea))
        .attr('cy', d => y(d.SalePrice))
        .attr('r', 1.5)
        .style('fill', '#69b3a2')
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");
            
        });

    });
  }, []);
  return (
    <svg ref={svgRef}></svg>
  );

}

export default Scatter2;