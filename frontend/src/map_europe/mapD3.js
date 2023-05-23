import React, { useState, useRef, useEffect } from "react";
//import { useState } from 'react-usestateref'
import * as d3 from "d3";
import {landData} from './europe'
import data from '../europe_gov.csv';

import './mapD3.css'
import '../App.css'
import { defaultConfig } from "antd/es/theme/internal";
import responsivefy from "../utils/responsify";
import { Container } from "@mantine/core";

//import SVGDeselect from "../../public/deselect.png"

function MapD3({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {

    // Reference to resulting HTML div
    const resultDivRef = useRef(null);
    // State holding the initialised SVG
    const [svg, setSvg] = useState(null);
    const [svgLegend, setSvgLegend] = useState(null);
    // State holding a lock for graph updates
    const updateLockRef = useRef(false);
    // Which country is selected, updates faster then setSelectedCountry
    const selectedCountryRef = useRef([]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [countryData, setCountryData] = useState({});

    //const svgLegendRef = useRef(null);


    // Dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var legendWidth = 500; // Adjust the desired width of the legend SVG
        var barWidth = 400; // Adjust the desired width of the bar
        
        // Calculate the position of the bar and text elements
        var barX = (legendWidth - barWidth) / 2; // Calculate the x position of the bar
        var minValueTextX = barX - 35; // Adjust the x position of the minValue text
        var maxValueTextX = barX + barWidth + 10; // Adjust the x position of the maxValue text

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
                    cData[country] = cas;
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

        var svgMap = d3.select("#map")
                        .append("svg")

                        .attr('width', width)
                        .attr('height', height)
                        .call(responsivefy) // tada!



                        // .attr("preserveAspectRatio", "xMinYMin meet")
                        // .attr("viewBox", "0 0 " + " " + (width + margin.left + margin.right).toString() + " " + (height + margin.top + margin.bottom).toString())
                        // .classed("svg-content-responsive", true)

                        .append("g")
                        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        setSvg(
            svgMap
            )  

        var legendWidth = 500; // Adjust the desired width of the legend SVG
        var barWidth = 400; // Adjust the desired width of the bar

        var svgLegend_ = d3
            .select('#legend')
            .append('svg')
            .attr('width', legendWidth)
            .attr('height', 120)
            .call(responsivefy);
        setSvgLegend(svgLegend_)
        
        // Calculate the position of the bar and text elements
        var barX = (legendWidth - barWidth) / 2; // Calculate the x position of the bar
        var minValueTextX = barX - 35; // Adjust the x position of the minValue text
        var maxValueTextX = barX + barWidth + 10; // Adjust the x position of the maxValue text

            

        var grad = svgLegend_.append('defs')
            .append('linearGradient')
            .attr('id', 'mygrad')
            .attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%');

        const numColors = 20;

        const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, d3.max(Object.values(countryData))])

        var gradientColors = []
            for (let i = 0; i < numColors; i++) {
     
                const color = colorScale((i / (numColors - 1)) * colorScale.domain()[1]);
                gradientColors.push(color);
              }


            
        // for (let i = 0; i < numColors; i++) {
        //     //const hexColor = rgbToHexs(gradientColors[i]);
        //     grad.append("stop")
        //         .attr("offset", 100 * (i / (numColors - 1)) + "%")
        //         .attr("stop-color", gradientColors[i])
        //         .attr("stop-opacity", 1);
        //     console.log(gradientColors[i])
        //     console.log(100 * (i / (numColors - 1)) + "%")
        // }

        // Determine the lowest and highest values
        const values = Object.values(countryData);
        const minValue = d3.min(values);
        const maxValue = d3.max(values);

        var stops = grad.selectAll('stop')
            .data(gradientColors)
            .enter()
            .append('stop')
            .style('stop-color', function(d){ return d3.color(d).formatHex(); })
            .attr('offset', function(d,i){
                //return d.cas;
              return 100 * (i / (numColors - 1)) + '%';
            })
        
        svgLegend_.append('text')
        .attr('x', minValueTextX)
        .attr('y', 75)
        .text(Math.round(minValue * 100)/100);
        
        svgLegend_.append('text')
        .attr('x', maxValueTextX)
        .attr('y', 75)
        .text(Math.round(maxValue * 100)/100);

        
        svgLegend_.append('rect')
            .attr('x', barX)
            .attr('y', 50)
            .attr('width', barWidth)
            .attr('height', 50)
            //.classed('filled', true)
            .style('fill', 'url(#mygrad)')
            
        svgLegend_.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 30)
        .attr('x', barX + 25 +barWidth/ 2)
        .text('Road fatalities per 100,000 people');
        

        
        // console.log("MINVALUE IS " + minValue)
        // console.log("MAXVALUE IS " + maxValue)

        // Create scale for the axis
        const axisScale = d3
        .scaleLinear()
        .domain([minValue, maxValue])
        .range([barX, barX + barWidth]); // Adjust the range based on the desired width

        // Append a group element for the axis
        const axisGroup = svgLegend_.append("g")
        .attr("transform", "translate(0, 100)"); // Adjust the position as needed

        // Create the axis
        const axis = d3.axisBottom(axisScale);

        // Append the axis to the group
        axisGroup.call(axis);

        var countries = Object.keys(countryData);

        countries.forEach((country) => {
            svgLegend_
                .append("line")
                .attr("id", "legend_line_" + country)
                .style("visibility", "hidden")
                .attr("stroke-width", 4)   
        })
    }
        
    }, [countryData])


    function rgbToHexs(rgb) {
        const hex = rgb.match(/\d+/g)
                        .map(num => parseInt(num).toString(16).padStart(2, '0'));
        return `#${hex.join('')}`;
      }


     
    
    function clearMap() {// setting up all the hover effects
        var div = d3.select("body").append("div")
        .attr("class", "tooltip-map")
        .style("opacity", 0);
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
        svg.selectAll("path")
            .style("opacity", 1);
        const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, d3.max(Object.values(countryData))])
        selection
            .style("fill", function(c) {
                if (!colorScale(countryData[c.properties["NAME"]])) {
                   return "grey" 
                }
                return colorScale(countryData[c.properties["NAME"]]);
            })
            .style("stroke", "grey")
            .style("stroke-width", 1);

    }

    function hoverCountryByName(countryName) {
        countryName.filter((cn) => !selectedCountryRef.current.includes(cn)).forEach(cn => {
            hoverSelection(svg.select(("#" + cn).replace(/\s/g, '')))
        })

        var allCountries = Object.keys(countryData);
        allCountries.forEach((country) => {
            if (! selectedCountryRef.current.includes(country)) {
                console.log(selectedCountry)
                d3.select("#legend_line_" + country)
                    .style("visibility", "hidden")
            }
        })

        if ((countryName.length > 0)) {//&& (countryData[countryName[0].replace(/\s/g, '')])) {
          
            countryName.forEach((country) => {
                if (countryData[country]) {
                    const values = Object.values(countryData);
                    const minValue = d3.min(values);
                    const maxValue = d3.max(values);
                    d3.select("#legend_line_" + country)
                        .style("visibility", "visible")
                        .attr("stroke", "var(--color-hover)")
                        .attr("x1", d => (countryData[country]-minValue) / (maxValue-minValue) * barWidth + barX)
                        .attr("x2", d => (countryData[country]-minValue) / (maxValue-minValue) * barWidth + barX)
                        .attr("y1", d => (50))
                        .attr("y2", d => (100))
                }
            })  

        } 

    }

    // function hoverCountry(country) {
    //     hoverSelection(d3.select(country));     
    // }

    function hoverSelection(selection) {

        selection
            .style("opacity", 1)
            //.style("stroke", "blue")
            .style("fill","var(--color-hover)")
            //.style("stroke-width", 4);
    }

    function updateLegendSelected(countryName) {

        var allCountries = Object.keys(countryData);
        allCountries.forEach((country) => {
            if (! hoveredCountry.includes(country)) {
                d3.select("#legend_line_" + country)
                    .style("visibility", "hidden")
            }
        })

        if ((countryName.length > 0)) {

            const values = Object.values(countryData);
            const minValue = d3.min(values);
            const maxValue = d3.max(values);


            countryName.forEach((country) => {
                if (countryData[country]) {
                    d3.select("#legend_line_" + country)
                        .style("visibility", "visible")
                        .attr("stroke", "var(--color-selected)")
                        .attr("x1", d => (countryData[country]-minValue) / (maxValue-minValue) * barWidth + barX)
                        .attr("x2", d => (countryData[country]-minValue) / (maxValue-minValue) * barWidth + barX)
                        .attr("y1", d => (40))
                        .attr("y2", d => (110))
                }
            })
        }
    }

    function selectCountryByName(countryName) {
        countryName.forEach(cn => {
            selectSelection(svg.select(("#" + cn).replace(/\s/g, '')))
        })
        if (countryName.length != 0) {
            svg.select("#selection_label").style("visibility", "visible")
            svg.select("#selection_label_text").transition()
                    .text(countryName[0]);
        } else {
            svg.select("#selection_label").style("visibility", "hidden")
            svg.select("#selection_label_text").transition()
                    .text("");
        }

        updateLegendSelected(countryName)
        
    }

    // function selectCountry(country) {
    //     selectSelection(d3.select(country))
    // }

    function selectSelection(selection) {
        selection
            .style("opacity", 1)
            //.style("stroke", "black")
            .style("fill","var(--color-selected)")
            //.style("stroke-width", 3);
    }

    function initMap() {
        //clearMap();
        //hoverCountryByName(hoveredCountry);
        clearMap();
    }


    // setting up all the hover effects
    var div = d3.select("body").append("div")
    .attr("class", "tooltip-map")
    .style("opacity", 0);

    function onHover(event,d) {

        
        updateLockRef.current = true
        setHoveredCountry([d.properties["NAME"]])
        hoverCountryByName([d.properties["NAME"]]);
        // Set opacity of hovered country to 1

        //Makes the new div appear on hover:
        div.transition()
            .duration(50)
            .style("opacity", 1);
        div.html(`<strong><u>${d.properties["NAME"]}</u></strong><br/>${"Road fatalities"}: ${Math.round(countryData[d.properties["NAME"]] * 100)/100}<br/>`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 15) + "px");
    }
    
    function offHover(d) {
        setHoveredCountry([]);
        svg.selectAll("path")
            .style("opacity", 1);
        clearCountryByName([d.properties["NAME"]])
        if (selectedCountry.length == 0) {
            updateLockRef.current = false
        }
        div.transition()
            .duration('50')
            .style("opacity", 0);
    }

    function onClick(d) {
        var a = selectedCountryRef.current
        selectedCountryRef.current = []
        clearCountryByName(a)

        if (d!= null && a[0] != [d.properties["NAME"]]) {
            selectedCountryRef.current = [d.properties["NAME"]]
            setSelectedCountry([d.properties["NAME"]])
            selectCountryByName([d.properties["NAME"]])
        } else {
            setSelectedCountry([])
            updateLegendSelected([])
        }
    }


    

    useEffect(() => {
        if (svg && dataLoaded) {
            svg.append("g")
                .append("rect")
                .attr("x", margin.left)
                .attr("y", margin.top)
                .attr("width", width)
                .attr("height", height)
                // .attr("stroke", "black")
                // .attr("stroke-width", "2px")
                .attr("fill", "transparent")
                .on("click", function(event) {
                    onClick(null); // Pass null or any other value to indicate no country is clicked
                  });

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
                .attr("name", function(d) {return d.properties["NAME"]})
                .attr("id", function(d) {return d.properties["NAME"].replace(/\s/g, '')})
                //.style("opacity", .8)


                .on("mouseover", function(event, d) {
                    onHover(event,d)
                })
                .on("mouseleave", function(event, d) {
                    offHover(d)
                })
                .on("mousemove", function(event, d) {
                    div.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px");
                })
                .on("click", function(event, d) {
                    onClick(d)
                })


            // svg.append('g')
            //     .attr("id", "selection_label")
            //     .style("visibility", "hidden")
            // .append("svg:image")
            //     .attr('x', margin.left + 10)
            //     .attr('y', 30)
            //     .attr('width', 10)
            //     .attr('height', 10)
            //     .attr("xlink:href", "/deselect.png")
            // .append("text")
            //     .attr("id", "selection_label_text")
            //     .attr('x', margin.left + 20)
            //     .attr('y', 30)
            //     .text("")
     
            
       
            

            initMap();

        }

    }, [svg, dataLoaded, countryData])

    useEffect(() => {
        
        if (svg && (!updateLockRef.current)) {
            selectedCountryRef.current = selectedCountry
            //if (selectedCountry.length != 0 | hoveredCountry.length != 0) {
            clearMap();
            hoverCountryByName(hoveredCountry)
            selectCountryByName(selectedCountry)
                
                
            // } else {
            //     clearMap();
            //     //fillMap();
            // }
        }
    }, [svg, hoveredCountry, selectedCountry])





    return (
        <div>
            <div id="map"></div>
            <div id="legend"></div>
        </div>
        //<svg ref={svgLegendRef}/>
        // <div>
        //     <div ref={resultDivRef}></div>gen
        //     <div height="100"></div>
        //     <svg ref={svgLegendRef}/>
        //     {/* {dataLoaded && (
        //         <Legend colorScale={d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(Object.values(countryData))])} />
        //     )} */}
        // </div>
        );

}


export default MapD3;