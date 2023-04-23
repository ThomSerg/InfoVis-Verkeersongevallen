import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function Scatter({data}) {
    
   // const [data] = useState([[90,20], [20,100], [66,44],[53,80],[24,182],[80,72],[10,76],[33,150],[100,15]]);
    const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 300;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style('margin-top', '100px');


    //d3.csv("data_road_users_and_death.csv").then(data =>{
       // console.log(data); // log the data variable to the console




    const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0,w]);

    const yScale = d3.scaleLinear().domain([0, 200]).range([h, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);

    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${h})`);

    svg.append("g").call(yAxis);

    svg.append('text')
    .attr('x',w/2)
    .attr('y', h + 50)
    .text('x');

    svg.append('text')
    .attr('y',h/2)
    .attr('x', -50)
    .text('y');
        
    svg
      .selectAll()
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      //.attr("cx", d => xScale(d["Estimated road traffic death rate per 100 000 population"]))
      //.attr("cy", d => yScale(d["Estimated road traffic death rate per 100 000 population"]))
      .attr("r", 2)
 // }).catch(error => console.log(error));
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default Scatter;
