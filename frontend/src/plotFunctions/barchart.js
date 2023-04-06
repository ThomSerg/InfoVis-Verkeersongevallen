import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarChart({ data , width, height }) {
  const svgRef = useRef();

  useEffect(() => {
    const w = width || 400;
    const h = height || 300;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")

    const xScale = d3
      .scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, w])
      .padding(0.5);

    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([h, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${h})`);

    svg.append("g").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", (value, index) => xScale(index))
      .attr("y", (value) => yScale(value))
      .attr("width", xScale.bandwidth())
      .attr("height", (value) => h - yScale(value));
  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default BarChart;
