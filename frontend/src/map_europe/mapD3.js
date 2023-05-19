import React, { useState, useRef, useEffect } from "react";
//import { useState } from 'react-usestateref'
import * as d3 from "d3";
import {landData} from './europe'
import data from '../europe_gov.csv';

import './mapD3.css'
import '../App.css'
import { defaultConfig } from "antd/es/theme/internal";

function MapD3({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {

    // Reference to resulting HTML div
    const resultDivRef = useRef(null);
    // State holding the initialised SVG
    const [svg, setSvg] = useState(null);
    // State holding a lock for graph updates
    const updateLockRef = useRef(false);
    // Which country is selected, updates faster then setSelectedCountry
    const selectedCountryRef = useRef([]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [countryData, setCountryData] = useState({});

    const svgLegendRef = useRef(null);


    // Dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var scale = 3.5

    var projection = d3.geoMercator()
                        .center([55.287175894140645, 14.90326637107352])
                        .translate([0, 0])
                        .scale(scale*100)
                        .translate([margin.left + width*scale/3.4, margin.top + height*scale/3])

    const countryDataRef = useRef(null);

    useEffect(() => {
        d3.csv(data).then((data) => {
            const cData = {};
            data.forEach((d) => {
                const country = d.Country;
                const cas = parseFloat(d.cas);
                if (!isNaN(cas)) {
                    cData[country.replace(/\s/g, '')] = cas;
                }
                });
            setCountryData(cData);
            setDataLoaded(true);
            countryDataRef.current = cData
        });

    }, [])

    


    
                        

    // useEffect(() => {
    //     // Read the CSV file
    //     d3.csv(data).then((data) => {
    //         const countryData = {};
    //         data.forEach((d) => {
    //         const country = d.Country;
    //         const cas = parseFloat(d.cas);
    //         if (!isNaN(cas)) {
    //             countryData[country] = cas;
    //         }
    //         });
    //         setCountryData(countryData);
    //         setDataLoaded(true);
    //     });
    //     }, []);

    

    useEffect(() => {
        if (Object.keys(countryData).length != 0) {
        d3.select(resultDivRef.current)
            .append("div")
            .classed("svg-container", true); 

        setSvg(
            d3.select(resultDivRef.current)
                .append("svg")

                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + " " + (width + margin.left + margin.right).toString() + " " + (height + margin.top + margin.bottom).toString())
                .classed("svg-content-responsive", true)

                .append("g")
                .attr("transform", "translate(" + 0 + "," + 0 + ")")
            )  

        var svg = d3.select(svgLegendRef.current)
            .append("svg")
            .attr('width', 500)
            .attr('height', 100);
            

        var grad = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'mygrad')
            .attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%');

        const numColors = 20;

        const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(Object.values(countryData))])

        var gradientColors = []
            for (let i = 0; i < numColors; i++) {
                console.log((i / (numColors - 1)) * colorScale.domain()[1])
                const color = colorScale((i / (numColors - 1)) * colorScale.domain()[1]);
                gradientColors.push(color);
              }

        console.log(gradientColors)
        console.log(gradientColors[0])
            
        // for (let i = 0; i < numColors; i++) {
        //     //const hexColor = rgbToHexs(gradientColors[i]);
        //     grad.append("stop")
        //         .attr("offset", 100 * (i / (numColors - 1)) + "%")
        //         .attr("stop-color", gradientColors[i])
        //         .attr("stop-opacity", 1);
        //     console.log(gradientColors[i])
        //     console.log(100 * (i / (numColors - 1)) + "%")
        // }

        grad.selectAll('stop')
            .data(gradientColors)
            .enter()
            .append('stop')
            .style('stop-color', function(d){ return d3.color(d).formatHex(); })
            .attr('offset', function(d,i){
              return 100 * (i / (numColors - 1)) + '%';
            })

        // grad.append("stop")
        // .attr("offset", "0%")
        // .attr("stop-color", d3.color(gradientColors[0]).formatHex());

        // grad.append("stop")
        // .attr("offset", "100%")
        // .attr("stop-color", "blue");

        svg.append('rect')
            .attr('x', 10)
            .attr('y', 50)
            .attr('width', 500)
            .attr('height', 50)
            //.classed('filled', true)
            .style('fill', 'url(#mygrad)')
            
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("y", 20)
            .attr("x", 100)
            
            .text("Legend");

   
        }
    }, [countryData])


    function rgbToHexs(rgb) {
        const hex = rgb.match(/\d+/g)
                        .map(num => parseInt(num).toString(16).padStart(2, '0'));
        return `#${hex.join('')}`;
      }

    
    function clearMap() {
        clearSelection(d3.selectAll(".Country"));
    }

    function clearCountryByName(countryName) {
        countryName.filter((cn) => !selectedCountryRef.current.includes(cn)).forEach(cn => {
            clearSelection(svg.select(("#" + cn).replace(/\s/g, '')))
        })
    }

    // function clearCountry(country) {
    //     clearSelection(d3.select(country));
    // }

    function clearSelection(selection) {
        const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(Object.values(countryData))])
        selection
            .style("fill", function(c) {
                if (!colorScale(countryData[c.properties["NAME"].replace(/\s/g, '')])) {
                   return "grey" 
                }
                return colorScale(countryData[c.properties["NAME"].replace(/\s/g, '')])
            })
            .style("stroke", "white")
            .style("stroke-width", 1);
            // .style("opacity", .5)
            // .style("fill","grey")
            // .style("stroke", "white")
            // .style("stroke-width", 1);
    }

    function hoverCountryByName(countryName) {
        countryName.filter((cn) => !selectedCountryRef.current.includes(cn)).forEach(cn => {
            hoverSelection(svg.select(("#" + cn).replace(/\s/g, '')))
        })
    }

    // function hoverCountry(country) {
    //     hoverSelection(d3.select(country));     
    // }

    function hoverSelection(selection) {
        selection
            .style("opacity", 1)
            //.style("stroke", "black")
            .style("fill","blue")
            //.style("stroke-width", 2);
    }

    function selectCountryByName(countryName) {
        countryName.forEach(cn => {
            selectSelection(svg.select(("#" + cn).replace(/\s/g, '')))
        })
    }

    // function selectCountry(country) {
    //     selectSelection(d3.select(country))
    // }

    function selectSelection(selection) {
        selection
            .style("opacity", 1)
            //.style("stroke", "black")
            .style("fill","red")
            //.style("stroke-width", 3);
    }

    function initMap() {
        //clearMap();
        //hoverCountryByName(hoveredCountry);
        clearMap();
    }


    function onHover(d) {
        updateLockRef.current = true
        setHoveredCountry([this.id])
        hoverCountryByName([this.id]);
    }
    
    function offHover(d) {
        setHoveredCountry([]);
        clearCountryByName([d.properties["NAME"]])
        if (selectedCountry.length == 0) {
            updateLockRef.current = false
        }
    }

    function onClick(d) {
        var a = selectedCountryRef.current
        selectedCountryRef.current = []
        clearCountryByName(a)
        selectedCountryRef.current = [d.properties["NAME"]]
        setSelectedCountry([d.properties["NAME"]])
        selectCountryByName([d.properties["NAME"]])
    }

    function Legend({ colorScale }) {

        const gradientColors = [];
        const numColors = 20;
    
    
        const xMin = 0;
        const xMax = [0, d3.max(Object.values(countryData))];
    
        let x = d3.scaleLinear()
          //.domain(d3.extent(data, d => d[cat1]))
          .domain([xMin, xMax])
          //.range([0, 10]);
    
        // Create the x-axis and y-axis groups
    
      
        for (let i = 0; i < numColors; i++) {
          const color = colorScale((i / (numColors - 1)) * colorScale.domain()[1]);
          gradientColors.push(color);
        }
      
        return (
            <div className="legend" style={{ width: '100%', height: '200px' }}>
                <div className="legend-title" style={{ marginTop:"20px", marginBottom: '10px' }}>
                    Legend
                </div>
                <svg ref={svgLegendRef} width="500" height="100"/>
                <div className="legend-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>   
                    <div className="legend-gradient" style={{ backgroundImage: `linear-gradient(to right, ${gradientColors.join(',')})`, width: '80%', height: '20px' }}/>
                    <div class="verticalLine">|</div>
                </div>
            </div>
        );
      }

    
    

    useEffect(() => {
        if (svg && dataLoaded) {
            svg.append("g")
                .append("rect")
                .attr("x", margin.left)
                .attr("y", margin.top)
                .attr("width", width)
                .attr("height", height)
                .attr("stroke", "black")
                .attr("stroke-width", "2px")
                .attr("fill", "transparent")

            svg.append("g")
                .selectAll("path")
                .data(landData.features)
                .enter()
                .append("path")
                    // draw each country
                    .attr("d", d3.geoPath()
                        .projection(projection)
                    )
                    
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .attr("id", function(d) {return d.properties["NAME"].replace(/\s/g, '')})
                //.style("opacity", .8)


                .on("mouseover", onHover )
                .on("mouseleave", function(event, d) {
                    offHover(d)
                })
                .on("click", function(event, d) {
                    onClick(d)
                })

            initMap();

        }

    }, [svg, dataLoaded, countryData])

    useEffect(() => {
        
        if (svg && (!updateLockRef.current)) {
            //selectedCountryRef.current = selectedCountry
            if (selectedCountry.length != 0 | hoveredCountry.length != 0) {
                console.log("fail")
                clearMap();
                hoverCountryByName(hoveredCountry)
                selectCountryByName(selectedCountry)
                
            } else {
                clearMap();
                //fillMap();
            }
        }
    }, [svg, hoveredCountry, selectedCountry])


    return (
        <div>
            <div ref={resultDivRef}></div>
            <div height="100"></div>
            <svg ref={svgLegendRef} width="500" height="200"/>
            {/* {dataLoaded && (
                <Legend colorScale={d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(Object.values(countryData))])} />
            )} */}
        </div>
        );

}


export default MapD3;