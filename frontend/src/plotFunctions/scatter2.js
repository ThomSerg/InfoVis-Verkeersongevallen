import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import data from '../europe_gov.csv';
import { lab } from 'd3';

function Scatter2({cat1, cat2, setHoveredCountry, hoveredCountry}) {
  const svgRef = useRef(null);

  useEffect(() => {
    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Append the SVG object to the body of the page
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    

    // Read the data
    d3.csv(data).then(data => {
      console.log(data)

      // Filter data to exclude empty values
      const filteredData = data.filter(d => d[cat1] !== "" && d[cat2] !== "");


      // Add X axis
      const x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .text("test")
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height +40)
        .text("total amount of casualties");

    
      svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -40)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Road Quality");

      svg.append('g')
        .call(d3.axisLeft(y));

      // Add dots
      svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[cat1]))
        .attr('cy', d => y(d[cat2]))
        .attr('r', 4)
        .style('fill', '#9d7463')
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");
            
        });


      svg.selectAll('dot')
        .data(data)
        .enter()
        .filter((d) => {
          return d.Country == hoveredCountry})
        .append('circle')
        .attr('cx', d => x(d[cat1]))
        .attr('cy', d => y(d[cat2]))
        .attr('r', 4)
        .style('fill', '#FFFF00')
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");
            
        });

    });
  }, [cat1,cat2]);
  return (
    <svg ref={svgRef}></svg>
  );

}

export default Scatter2;