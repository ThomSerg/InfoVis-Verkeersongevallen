import React, { useEffect, useRef } from 'react';

import './scatter2.css';
import * as d3 from 'd3';
import data from '../europe_gov.csv';
import * as ss from 'simple-statistics'



function Scatter2({cat1, cat2, width= 550, height = 350, varXAxis = "Unknown variable", varYaxis = "Unknown variable", title = "Unknown title", setHoveredCountry, hoveredCountry}) {
  const svgRef = useRef(null);

  useEffect(() => {
    // Set the dimensions and margins of the graph
    //const margin = { top: 10, right: 30, bottom: 60, left: 60 };
    //const width = 800 - margin.left - margin.right;
    //const height = 600 - margin.top - margin.bottom;

        // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 60, left: 60 };
    const widthPlot = width - margin.left - margin.right;
    const heightPlot = height - margin.top - margin.bottom;


    // Append the SVG object to the body of the pageheight: "550px"
    const svg = d3.select(svgRef.current)
      .attr('width', widthPlot + margin.left + margin.right)
      .attr('height', heightPlot + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    

    // Read the data
    d3.csv(data).then(data => {
      //console.log(data)

    // Filter data to exclude empty values
    data = data.filter(d => d[cat1] !== "" && d[cat2] !== "");

    console.log("Filtered data is ");
    console.log(data);

    const xname = varXAxis.split(" (")[0];
    const yname = varYaxis.split(" (")[0];


    // x values never on the axis itself
    const xDiff = d3.max(data, d => parseFloat(d[cat1])) - d3.min(data, d => d[cat1]);
    const xMin = d3.min(data, d => parseFloat(d[cat1])) - 0.05 * xDiff;
    const xMax = d3.max(data, d => parseFloat(d[cat1])) + 0.05 * xDiff;

    console.log("xmin and xmax values are:");
    console.log(xMin, xMax);


    // Compute the domain dynamically based on the data
    const x = d3.scaleLinear()
      //.domain(d3.extent(data, d => d[cat1]))
      .domain([xMin, xMax])
      .range([0, widthPlot]);

    // y values never on the axis itself
    const yDiff = d3.max(data, d => parseFloat(d[cat2])) - d3.min(data, d => d[cat2]);
    const yMin = d3.min(data, d => parseFloat(d[cat2])) - 0.05 * yDiff;
    const yMax = d3.max(data, d => parseFloat(d[cat2])) + 0.05 * yDiff;
    console.log("Ymin and Ymax values are:");
    console.log(yMin, yMax);

    const y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([heightPlot , 0]);

      const dataArray = data.map(d => [Number(d[cat1]), Number(d[cat2])]);
      console.log(dataArray);

      const regression = ss.linearRegression(dataArray);
      console.log(regression);
    // Get slope and intercept values
    const slope = regression.m;
    const intercept = regression.b;

    // Calculate predicted y values for each x value in dataset
    const yPredicted = dataArray.map(d => slope * d[0] + intercept);

      svg.append('g')
        .attr('transform', `translate(0, ${heightPlot})`)
        .text("test")
        .call(d3.axisBottom(x));


      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", widthPlot)
        .attr("y", heightPlot +40)
        .text(varXAxis);

    
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50) // decrease y position to move the label upwards
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text(varYaxis);
      

      svg.append('g')
        .call(d3.axisLeft(y));


      // setting up all the hover effects
      var div = d3.select("body").append("div")
        .attr("class", "tooltip-scatter")
        .style("opacity", 0);

      function mouseover( d) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '.5');

        div.transition()
          .duration(50)
          .style("opacity", 1);
      }

      function mouseout(d) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1');

        div.transition()
          .duration('50')
          .style("opacity", 0);
      }




      // Add dots
      svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[cat1]))
        .attr('cy', d => y(d[cat2]))
        .attr('r', 4)
        .style('fill', '#9d7463')
        //Our new hover effects
        .on('mouseover', function (event, d) {
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '.5');
            //Makes the new div appear on hover:
            div.transition()
                .duration(50)
                .style("opacity", 1);
            div.html(`<strong><u>${d.Country}</u></strong><br/>${xname}: ${Math.round(d[cat1] * 100)/100}<br/>${yname}: ${Math.round(d[cat2] * 100)/100}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 15) + "px");
            
        })
        .on('mouseout', function (event, d) {
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '1');
            //Makes the new div disappear:
            div.transition()
                .duration('50')
                .style("opacity", 0);
        })
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");
        });
      
      svg.append("path")
      .datum(dataArray)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
      .x(d => x(d[0]))
      .y((d, i) => y(yPredicted[i]))
      );


    });
  }, [cat1,cat2]);

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 60, left: 60 };
    const widthPlot = width - margin.left - margin.right;
    const heightPlot = height - margin.top - margin.bottom;


    // Append the SVG object to the body of the pageheight: "550px"
    const svg = d3.select(svgRef.current)
      .attr('width', widthPlot + margin.left + margin.right)
      .attr('height', heightPlot + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    d3.csv(data).then(data => {

    data = data.filter(d => d[cat1] !== "" && d[cat2] !== "");

    const xname = varXAxis.split(" (")[0];
    const yname = varYaxis.split(" (")[0];


    // x values never on the axis itself
    const xDiff = d3.max(data, d => parseFloat(d[cat1])) - d3.min(data, d => d[cat1]);
    const xMin = d3.min(data, d => parseFloat(d[cat1])) - 0.05 * xDiff;
    const xMax = d3.max(data, d => parseFloat(d[cat1])) + 0.05 * xDiff;


    // Compute the domain dynamically based on the data
    const x = d3.scaleLinear()
      //.domain(d3.extent(data, d => d[cat1]))
      .domain([xMin, xMax])
      .range([0, widthPlot]);

    // y values never on the axis itself
    const yDiff = d3.max(data, d => parseFloat(d[cat2])) - d3.min(data, d => d[cat2]);
    const yMin = d3.min(data, d => parseFloat(d[cat2])) - 0.05 * yDiff;
    const yMax = d3.max(data, d => parseFloat(d[cat2])) + 0.05 * yDiff;

    const y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([heightPlot , 0]);
    
    svg.selectAll('circle')
    .data(data)
    .enter()
    .filter((d) => {
      return d.Country == hoveredCountry})
    
    .join(
      function(enter) {
        return enter.append('circle')
        .attr('cx', d => x(d[cat1]))
        .attr('cy', d => y(d[cat2]))
        .attr('r', 4)
        .style('fill', '#FFFF00')
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");  
        })
      },
      function(update) {
        
        return update.append('circle')
        .attr('cx', d => x(d[cat1]))
        .attr('cy', d => y(d[cat2]))
        .attr('r', 4)
        .style('fill', '#FFFF00')
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");  
        
        })
      },
      function(exit) {
        console.log("exit");
        // return exit.append('circle').remove();
        // // .style('opacity', 0)
        // return exit.append('circle').remove()
        // .append('circle')
        // .attr('cx', d => x(d[cat1]))
        // .attr('cy', d => y(d[cat2]))
        // .attr('r', 4)
        // .style('fill', '#9d7463')
        // .on("click", function (event, d){
        //     d3.select(this).transition().duration(200).style("stroke", "red");  
        
        // })
      });
    })
    },
    [hoveredCountry]);


  return (
    <>
    <div style={{ width: width }} className="scatterTitle">{title}</div>
    <svg ref={svgRef}></svg>
    </>
  );

  
}

export default Scatter2;