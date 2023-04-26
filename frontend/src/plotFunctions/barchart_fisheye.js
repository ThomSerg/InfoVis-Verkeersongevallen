import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { fisheye } from "d3-fisheye";

function BarChartFisheye() {
  const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 300;

    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible");

    const fisheyeEff = fisheye.circular().radius(120).distortion(4);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, w])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).range([h, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const bars = svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => h - yScale(d.value))
      .on("mousemove", (event, d) => {
        fisheyeEff.focus(d.label);
        bars.attr("x", (d) => fisheyeEff(xScale(d.label)));
        xAxis.tickFormat((d) => fisheyeEff(d));
        svg.select(".x-axis").call(xAxis);
      })
      .on("mouseleave", () => {
        fisheyeEff.focus();
        bars.attr("x", (d) => xScale(d.label));
        xAxis.tickFormat((d) => d);
        svg.select(".x-axis").call(xAxis);
      });

    svg
      .append("g")
      .call(xAxis)
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${h})`);

    svg.append("g").call(yAxis);
  }, );

  return <svg ref={svgRef}></svg>;
}

export default BarChartFisheye;
