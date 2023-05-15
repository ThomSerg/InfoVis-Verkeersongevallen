import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data2 from "../europe_gov.csv";

function StackedBarChart({cat}) {

  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const height =200;
    const barHeight = 100;
    const halfBarHeight = barHeight / 2;
    const w = 600 - margin.left - margin.right;
    const h = 300 - margin.top - margin.bottom;

    const colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"];
    
    const svg = d3.select(svgRef.current);

    d3.csv(data2).then(data => { 
      
        const rollupData = d3.rollups(data, v => v.length, d => d[cat])
        .map(([label, value]) => ({ label, value }))
        .filter(({ label }) => label !== "");

        console.log(rollupData);

        const total = d3.sum(rollupData, d => d.value);
        console.log(total);

        function groupDataFunc(data) {
            // use a scale to get percentage values
            const percent = d3.scaleLinear()
              .domain([0, total])
              .range([0, 100])
            // filter out data that has zero values
            // also get mapping for next placement
            // (save having to format data for d3 stack)
            let cumulative = 0
            const _data = data.map(d => {
              cumulative += d.value
              return {
                value: d.value,
                // want the cumulative to prior value (start of rect)
                cumulative: cumulative - d.value,
                label: d.label,
                percent: percent(d.value)
              }
            }).filter(d => d.value > 0)
            return _data
          };


        const groupData = groupDataFunc(rollupData);
        console.log(groupData);


        const xScale = d3.scaleLinear()
      .domain([0, total])
      .range([0, w]);

    const join = svg.selectAll('g')
      .data(groupData)
      .join('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    join.append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', h / 2 - halfBarHeight)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', (d, i) => colors[i]);

    join.append('text')
      .attr('class', 'text-value')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (h / 2) + 5)
      .text(d => d.value);

    join.append('text')
      .attr('class', 'text-percent')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (h / 2) - (halfBarHeight * 1.1))
      .text(d => d3.format('.1f')(d.percent) + ' %');

    join.append('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (h / 2) + (halfBarHeight * 1.1) + 20)
      .style('fill', (d, i) => colors[i])
      .text(d => d.label);

    });
  }, [cat]);

  return (
    <svg ref={svgRef} width="600" height="500"/>
  );
}

export default StackedBarChart;
