import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import data2 from "../europe_gov.csv";
import _uniqueId from 'lodash/uniqueId';
import responsivefy from "../utils/responsify";

import './StackedBarChart.css'

function StackedBarChart({cat, setHoveredCountry, hoveredCountry}) {

  const id = useRef(_uniqueId('stacked-bar-'))

  // Reference to the SVG
  const svgRef = useRef(null);
  // State holding the initialised SVG
  const [svg, setSvg] = useState(null);

  // State holding a lock for graph updates
  const [updateLock, setUpdateLock] = useState(false);


  const promilleColor = new Map();
    promilleColor.set("0.0", "var(--color-0-promille)")
    promilleColor.set("0.2", "var(--color-2-promille)")
    promilleColor.set("0.4", "var(--color-4-promille)")
    promilleColor.set("0.5", "var(--color-5-promille)")
    promilleColor.set("0.8", "var(--color-8-promille)")




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
    setSvg(d3.select("#" + id.current)
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)

              .call(responsivefy)

              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            );
  }, [])


  function selectLabels(labels) {
    svg.selectAll('.rect-stacked').filter(function(rs) {return labels.includes(rs.label) & rs.label != ""}).style('opacity', '1');
    svg.selectAll('.rect-stacked').filter(function(rs) {return !labels.includes(rs.label) & rs.label != ""}).style('opacity', '.5');
  }

  function selectCountries(countries, data) {
    // var labels = svg.selectAll('.rect-stacked').filter(function(rs) {return rs.countries.some(c => countries.includes(c))}) //.map(function(d) {return d.label})
    // console.log(labels)
    var labels = data.filter(function(d) {return countries.includes(d["Country"])}).map(function(d) {return d[cat]});
    selectLabels(labels)
  }

  function colorAll() {
    svg.selectAll('.rect-stacked').style('opacity', '1');
  }


  useEffect(() => {
    if (svg) {

    const colors = ["#724d3d ", "#916e54", "#b0886b", "#d0a281", "#e9b897", "#fdc4ac"];
    
    d3.csv(data2).then(data => { 
      
        const rollupData = d3.rollups(data, v => v.length, d => d[cat])
        .map(([label, value]) => ({ label, value}))
        .filter(({ label }) => label !== "");

        const total = d3.sum(rollupData, d => d.value);
 
        function groupDataFunc(data_) {
            // use a scale to get percentage values
            const percent = d3.scaleLinear()
              .domain([0, total])
              .range([0, 100])
            // filter out data that has zero values
            // also get mapping for next placement
            // (save having to format data for d3 stack)
            let cumulative = 0
            const _data = data_.map(d => {
              cumulative += d.value
              var countries = data.filter(function(d_) {return d_[cat] == d.label}).map(d => d["Country"])
              return {
                value: d.value,
                // want the cumulative to prior value (start of rect)
                cumulative: cumulative - d.value,
                label: d.label,
                percent: percent(d.value),
                countries: countries
              }
            }).filter(d => d.value > 0)
            return _data
          };


        const groupData = groupDataFunc(rollupData);


        const xScale = d3.scaleLinear()
      .domain([0, total])
      .range([0, width]);

      var div = d3.select("body").append("div")
                .attr("class", "tooltip-hover")
                .style("opacity", 0)
                .style("position", "absolute");

    const join = svg.selectAll('g')
      .data(groupData)
      .join('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      .on('mouseover', function(event, d) {
        div.transition()
        .duration(50)
        .style("opacity", 1);

        div.html(`${d.label} promille<br>${d.percent.toFixed(2)}%`)     
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 15) + "px");

        setUpdateLock(true);

        selectLabels([d.label]);        
        
        setHoveredCountry(d.countries)
        
      })

      .on('mouseout', function(event, d) {
        div.transition()
                .duration('50')
                .style("opacity", 0);

        colorAll();

        setHoveredCountry([])

        setUpdateLock(false);
      })

    var delay = 500

    join.append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(0))
      .attr('y', height / 2 - halfBarHeight)
      .attr('height', barHeight)
      .attr('width', 0)
      .style('fill', (d, i) => promilleColor.get(d.label))

      .transition()
      .duration(delay)
      .attr('x', d => xScale(d.cumulative))
      .attr('width', d => xScale(d.value))

      

    join.append('text')
      .attr('class', 'text-value')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(0))
      .attr('y', (height / 2) + 5)
      .text(d => d.value)

      .transition()
      .duration(delay)
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
    });
  }
  }, [cat, svg]);


  /* * * * * * * * * *
     * Update on hover *
     * * * * * * * * * */
  const [data, setData] = useState(null);

  d3.csv(data2).then(d => { 
    setData(d);
  })
  useEffect(() => {
    if (svg && (!updateLock)) {
  
        if (hoveredCountry.length > 0) {
     
            selectCountries(hoveredCountry, data);
        
        } else {
          colorAll();
        }
    }
  }, [svg, hoveredCountry, updateLock, data])



  return (
    <div id={id.current}/>
  );
}

export default StackedBarChart;
