import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
  const svgRef = useRef(null);
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;
  const color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

  useEffect(() => {

    var data = [
        {label: "Apples", value: 10},
        {label: "Oranges", value: 20},
        {label: "Bananas", value: 30},
        {label: "Grapes", value: 15},
        {label: "Pineapples", value: 25}
      ];

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const slices = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    slices.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));

    slices.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .text(d => d.data.label);
  }, );

  return (
    <svg ref={svgRef} />
  );
};

export default PieChart;