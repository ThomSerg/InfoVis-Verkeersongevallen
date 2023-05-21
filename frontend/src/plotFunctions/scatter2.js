import React, { useEffect, useRef, useState } from 'react';

import './scatter2.css';
import * as d3 from 'd3';
import data2 from '../europe_gov.csv';
import * as ss from 'simple-statistics'
import _uniqueId from 'lodash/uniqueId';

import responsivefy from "../utils/responsify";



function Scatter2({cat1, cat2, width= 550, height = 350, varXAxis = "Unknown variable", varYaxis = "Unknown variable", title = "Unknown title", setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry,}) {

  const id = useRef(_uniqueId('scatter-'))
  const svgRef = useRef(null);
  // State holding the initialised SVG
  const [svg, setSvg] = useState(null);
  // State holding a lock for graph updates
  const [updateLock, setUpdateLock] = useState(false);

  const margin = { top: 10, right: 30, bottom: 60, left: 60 };
  const widthPlot = width - margin.left - margin.right;
  const heightPlot = height - margin.top - margin.bottom;


    // Append the SVG object to the body of the pageheight: "550px"

  //create svg
  useEffect(() => {
    setSvg(d3.select("#" + id.current)
      .append("svg")
      .attr('width', widthPlot + margin.left + margin.right)
      .attr('height', heightPlot + margin.top + margin.bottom)
      .call(responsivefy) // tada!


      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`));

  },[]);

  const [data, setData] = useState(null);

  useEffect(() => { 
    d3.csv(data2).then(d => { 
        setData(d);
    })
})

  

  console.log("test")

  useEffect(() => {
    if (svg) {

      svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'transparent').on('click', function(event, d) {
          setSelectedCountry([])
          
      })
    

    // Read the data
    d3.csv(data2).then(data => {

    // Filter data to exclude empty values
    data = data.filter(d => d[cat1] !== "" && d[cat2] !== "");

   // console.log("Filtered data is ");
   // console.log(data);

    const xname = varXAxis.split(" (")[0];
    const yname = varYaxis.split(" (")[0];

    const circles = svg
        .selectAll("indPoints")
        .data(data)
        .enter()
        .append("circle")

        .attr("class", "data-point")
        .attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

    circles.on('mouseover', function(event, d) {

      div.transition().duration('50').style('opacity', 1);
      setHoveredCountry([d["Country"]])

    })
    .on('mouseout', function(d,i) {
        // d3.select(this).transition().duration('50').attr('opacity', '1')
        div.transition().duration('50').style('opacity', 0)

        setHoveredCountry([])

        setUpdateLock(false);
    })

    .on('click', function(event, d) {
        console.log(d)
        setSelectedCountry([d["Country"]])
        console.log(selectedCountry)
    })

      

    // x values never on the axis itself
    const xDiff = d3.max(data, d => parseFloat(d[cat1])) - d3.min(data, d => d[cat1]);
    const xMin = 0;//d3.min(data, d => parseFloat(d[cat1])) - 0.05 * xDiff;
    const xMax = d3.max(data, d => parseFloat(d[cat1])) + 0.05 * xDiff;

    //console.log("xmin and xmax values are:");
   // console.log(xMin, xMax);


    // Compute the domain dynamically based on the data
    let x = d3.scaleLinear()
      //.domain(d3.extent(data, d => d[cat1]))
      .domain([xMin, xMax])
      .range([0, widthPlot]);

    // y values never on the axis itself
    const yDiff = d3.max(data, d => parseFloat(d[cat2])) - d3.min(data, d => d[cat2]);
    const yMin = 0;//d3.min(data, d => parseFloat(d[cat2])) - 0.05 * yDiff;
    const yMax = d3.max(data, d => parseFloat(d[cat2])) + 0.05 * yDiff;
    //console.log("Ymin and Ymax values are:");
   //console.log(yMin, yMax);

    let y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([heightPlot , 0]);

      
    // Create the x-axis and y-axis groups
    let xAxisGroup = svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${heightPlot})`)
    .call(d3.axisBottom(x));

    let yAxisGroup = svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(y));;


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


      // setting up all the hover effects
      var div = d3.select("body").append("div")
        .attr("class", "tooltip-scatter")
        .style("opacity", 0);






      // Add dots
      svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[cat1]))
        .attr('cy', d => y(d[cat2]))
        .attr('r', 4)
        .attr("class", "data-point")
        .attr("id", function(d) {return d["Country"].replace(/\s/g, '')})
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

                setHoveredCountry([d["Country"]])
            
        })
        .on('mouseout', function (event, d) {
            d3.select(this).transition()
                .duration(50)
                .attr('opacity', '1');
            //Makes the new div disappear:
            div.transition()
                .duration('50')
                .style("opacity", 0);
            
            setHoveredCountry([])
            

        })
        .on("click", function (event, d){
            d3.select(this).transition().duration(200).style("stroke", "red");
        });



        // Define the line endpoints based on the calculated values
        const lineData = getTrendLinedata(x,y, data);
  
        let trendline = svg.append("path")
          .datum(lineData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 2)
          .attr("d", d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]))
        );
      



    // Append the zoom button
     // Append a group element to hold the scatterplot and zoom button
    const plotGroup = svg.append('g');


    const zoomInButton = plotGroup.append('g')
      .attr('class', 'zoom-button')
      .attr('transform', `translate(${widthPlot - 10}, ${0})`);

    zoomInButton.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .on('click', handleZoomInClick);

    zoomInButton.append('text')
    .attr('x', 10)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text('+');


    const zoomOutButton = plotGroup.append('g')
    .attr('class', 'zoom-button')
    .attr('transform', `translate(${widthPlot - 10}, ${20})`);

    zoomOutButton.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .on('click', handleZoomOutClick);

    zoomOutButton.append('text')
    .attr('x', 10)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text('-');
    



    function handleZoomInClick() {
      // Calculate the new domain values based on the desired zoom level
      const xminD = d3.min(data, d => parseFloat(d[cat1])) - 0.05 * xDiff;
      const yminD = d3.min(data, d => parseFloat(d[cat2])) - 0.05 * yDiff;
    
      // Compute the new scales with the updated domain
      let newXScale = d3.scaleLinear()
        .domain([xminD, xMax])
        .range([0, widthPlot]);
    
      let newYScale = d3.scaleLinear()
        .domain([yminD, yMax])
        .range([heightPlot, 0]);
    
      // Update the scatterplot elements with the new scales
      svg.selectAll('circle')
        .transition()
        .duration(1000) // Set the duration of the transition (in milliseconds)
        .attr('cx', d => newXScale(d[cat1]))
        .attr('cy', d => newYScale(d[cat2]));
    
      /*svg.selectAll('path')
        .transition()
        .duration(1000)
        .attr('d', d3.line()
          .x(d => newXScale(d[0]))
          .y(d => newYScale(d[1]))
        );*/

      // Update the x-axis
      xAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisBottom(newXScale));

    // Update the y-axis
      yAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisLeft(newYScale));

      // Update the line based on the new scales
      const newLineData = getTrendLinedata(newXScale, newYScale, data);

      trendline
        .datum(newLineData)
        .transition()
        .duration(1000)
        .attr('d', d3.line()
          .x(d => newXScale(d[0]))
          .y(d => newYScale(d[1]))
        );

      
    }
    


    function handleZoomOutClick() {
      // Calculate the new domain values based on the desired zoom level
      const xminD = 0;
      const yminD = 0;
    
      // Compute the new scales with the updated domain
      const newXScale = d3.scaleLinear()
        .domain([xminD, xMax])
        .range([0, widthPlot]);
    
      const newYScale = d3.scaleLinear()
        .domain([yminD, yMax])
        .range([heightPlot, 0]);
    
      // Update the scatterplot elements with the new scales
      svg.selectAll('circle')
        .transition()
        .duration(1000) // Set the duration of the transition (in milliseconds)
        .attr('cx', d => newXScale(d[cat1]))
        .attr('cy', d => newYScale(d[cat2]));
    
      /*svg.selectAll('path')
        .transition()
        .duration(1000)
        .attr('d', d3.line()
          .x(d => newXScale(d[0]))
          .y(d => newYScale(d[1]))
        );*/

      // Update the x-axis
      xAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisBottom(newXScale));

    // Update the y-axis
      yAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisLeft(newYScale));

      // Update the line based on the new scales
      const newLineData = getTrendLinedata(newXScale, newYScale, data);

      trendline
        .datum(newLineData)
        .transition()
        .duration(1000)
        .attr('d', d3.line()
          .x(d => newXScale(d[0]))
          .y(d => newYScale(d[1]))
        );

      
    }

    });
    }
  }, [svg]);

  function getTrendLinedata(x, yDomain, data) {
    const dataArray = data.map(d => [Number(d[cat1]), Number(d[cat2])]);
    console.log(dataArray);
    
    const regression = ss.linearRegression(dataArray);
    console.log(regression);
    // Get slope and intercept values
    const slope = regression.m;
    const intercept = regression.b;
    // Calculate the minimum and maximum x-values from your data
    let minXValue = d3.min(dataArray, d => d[0]);
    let maxXValue = d3.max(dataArray, d => d[0]);
  
    // Calculate the corresponding y-values on the line for the x-axis endpoints
    let minYValue = slope * minXValue + intercept;
    let maxYValue = slope * maxXValue + intercept;
  
    // calculates the min and max xvalues so that line stays within domain
    const xMinDomain = Math.min((yDomain.domain()[0] / slope - intercept / slope), (yDomain.domain()[1] / slope - intercept / slope));
    const xMaxDomain = Math.max((yDomain.domain()[0] / slope - intercept / slope), (yDomain.domain()[1] / slope - intercept / slope));
  
    // now replace the min and max x values if needed
    if (xMinDomain > minXValue) {
      minXValue = xMinDomain;
      minYValue = slope * minXValue + intercept;
    }
  
    if (xMaxDomain < maxXValue) {
      maxXValue = xMaxDomain;
      maxYValue = slope * maxXValue + intercept;
    }
  
    console.log("minXDomain is " + xMinDomain);
    console.log("maxXDomain is " + xMaxDomain);
  
    // Define the line endpoints based on the calculated values
    const lineData = [
      [minXValue, minYValue],
      [maxXValue, maxYValue]
    ];
    console.log("Line data is" + lineData);
  
    return lineData;
  }

  function hoverCountry(country) {
    country.filter((c) => !selectedCountry.includes(c))
    .forEach(c => {
        svg
        .select(("#" + c).replace(/\s/g, ''))
        .style("fill", function(d){ return('var(--color-hover)') })
        .attr("r", country.length == 1 ? 10 : 5);
    })
  }

  function selectCountry(country) {
      country.forEach(c => {
          svg
          .select(("#" + c).replace(/\s/g, ''))
          .style("fill", function(d){ return('var(--color-selected)') })
          .attr("r", country.length == 1 ? 10 : 5);;
      })
  }

  function selectMulti(hcs) {
    hcs.forEach(hc => {
        svg
        .select(("#" + hc).replace(/\s/g, ''))
        .style("fill", "#9d7463");
    })
  }

  function colorAll(svg) {
    svg.selectAll(".data-point")
                .style("fill", "#9d7463")
  }

  function grayout(svg) {
    svg.selectAll(".data-point")
            .style("fill", "#ABACAD")
  }

  useEffect(() => {
    if (svg && (!updateLock)) {
      // if (selectedCountry.length != 0 | hoveredCountry.length != 0) {
          grayout(svg)
          // selectCountry(selectedCountry)
          // hoverCountry(hoveredCountry)
      // } else {
          colorAll(svg);
      // }
  }
  }, [svg, hoveredCountry])


  return (
    <>
    {/* <div style={{ width: width }} className="scatterTitle">{title}</div> */}
    <div id={id.current}></div>
    </>
  );

  
}

export default Scatter2;