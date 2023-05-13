import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data2 from "../europe_gov.csv";


function PieChart({cat}) {

  const svgRef = useRef();



  useEffect(() => {
    var margin = {top: 10, right: 30, bottom: 30, left: 40};
    const width = 300 - margin.left - margin.right;
    const height = 300- margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);



    d3.csv(data2).then(data => { 
      
    const sumstat = d3.rollup(data, v => v.length, d => d[cat]);
    const pieData = Array.from(sumstat, ([label, value]) => ({ label, value }))
    .filter(({ label }) => label !== "");

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const slices = svg.selectAll("arc")
      .data(pie(pieData))
      .enter()
      .append("g")
      .attr("class", "arc");

      slices.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .on("mouseover", (event, d) => {
        tooltip.text(d.data.label)
          .style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

      const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("");    

    /*slices.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .text(d => d.data.label);*/

    });
  }, [cat]);

  return (
    <svg ref={svgRef} />
  );
};

export default PieChart;