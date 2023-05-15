import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import data2 from "../europe_gov.csv";

function StackedBarChart({cat}) {

  // Reference to the SVG
  const svgRef = useRef(null);
  // State holding the initialised SVG
  const [svg, setSvg] = useState(null);

  // State holding a lock for graph updates
  const [updateLock, setUpdateLock] = useState(false);




  var margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const barHeight = 100;
  var halfBarHeight = barHeight / 2;
  var width = 600 - margin.left - margin.right;
  var height = 300 - margin.top - margin.bottom;



  /* * * * * * * * * * 
   * Create the SVG  *
   * * * * * * * * * */
  useEffect(() => {
    // append the svg object to the body of the page
    setSvg(d3.select(svgRef.current)
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            );
  }, [])


  useEffect(() => {
    
    if (svg) {

    const colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"];
    
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
      .range([0, width]);

    const join = svg.selectAll('g')
      .data(groupData)
      .join('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    join.append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', height / 2 - halfBarHeight)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', (d, i) => colors[i])

      .on('mouseover', function(event, d) {
        setUpdateLock(true);


        svg.selectAll('.rect-stacked').filter(function(rs) {return rs.label != d.label}).style('opacity', '.5');
        
        // .each(function(rs,i) {
        //   if (rs.label != d.label) {
        //     console.log(rs);
        //     rs.style('opacity', '.5');
        //   }
        // })
      })

      .on('mouseout', function(event, d) {
        svg.selectAll('.rect-stacked').filter(function(rs) {return rs.label != d.label}).style('opacity', '1');

        setUpdateLock(false);
      })

    join.append('text')
      .attr('class', 'text-value')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (height / 2) + 5)
      .text(d => d.value);

    join.append('text')
      .attr('class', 'text-percent')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (height / 2) - (halfBarHeight * 1.1))
      .text(d => d3.format('.1f')(d.percent) + ' %');

    join.append('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (height / 2) + (halfBarHeight * 1.1) + 20)
      .style('fill', (d, i) => colors[i])
      .text(d => d.label);

      

    });
  }
  }, [cat, svg]);

  return (
    <svg ref={svgRef} width="600" height="500"/>
  );
}

export default StackedBarChart;
