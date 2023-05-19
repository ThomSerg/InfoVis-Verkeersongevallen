import React, { useState, useRef, useEffect } from "react";
//import { useState } from 'react-usestateref'
import * as d3 from "d3";
import {landData} from './europe'

import './mapD3.css'

function MapD3({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {

    // Reference to the SVG
    const svgRef = useRef(null);
    // State holding the initialised SVG
    const [svg, setSvg] = useState(null);
    // State holding a lock for graph updates
    const [updateLock, setUpdateLock] = useState(false);
    const updateLockRef = useRef(false);

    const [result, setResult] = useState(null);

    // Dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const selectedCountryRef = useRef([]);



    useEffect(() => {

        var scalingDiv = d3.select("div#chartId")
            .append("div")
            // Container class to make it responsive.
            .classed("svg-container", true); 

            setSvg(scalingDiv.append("svg")
                //.classed("svg-container", true)

                // .attr("width", width + margin.left + margin.right)
                // .attr("height", height + margin.top + margin.bottom)

                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + " " + width.toString() + " " + height.toString())

                .classed("svg-content-responsive", true)

                // .append("rect")
                // .classed("rect", true)
                // .attr("width", 600)
                // .attr("height", 400));
                .append("g")
                .attr("transform", "translate(" + 0 + "," + 0 + ")")
            )
        

        // append the svg object to the body of the page
        // setSvg(d3.select(svgRef.current)
        //             // .append("div")
        //             // .classed("svg-container", true)

        //             .append("svg")
        //             //.classed("svg-container", true)

        //             // .attr("width", width + margin.left + margin.right)
        //             // .attr("height", height + margin.top + margin.bottom)

        //             .attr("preserveAspectRatio", "xMinYMin meet")
        //             .attr("viewBox", "0 0 " + " " + width.toString() + " " + height.toString())

        //             .classed("svg-content-responsive", true)

        //             .append("rect")
        //             .classed("rect", true)
        //             .attr("width", 600)
        //             .attr("height", 400)

                    // .append("g")
                    // .attr("transform", "translate(" + 0 + "," + 0 + ")")
                //);

        // setResult(a);
        // setSvg(a.select("svg"))
    }, [])

    const mapWidth = 200
    const mapHeight = 200

    const scaleX = width / mapWidth;
    const scaleY = height / mapHeight;

    //const scale = Math.min(scaleX, scaleY)*2;

    //var path = d3.geoPath();
    var projection = d3.geoMercator()
                        .scale(1)
                        .translate([0,0]);

    var path = d3.geoPath()
            .projection(projection);

            var b = path.bounds(landData.features),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    projection = projection
            .scale(s)
            .translate(t);

    var scale = 3.5

    var projection = d3.geoMercator()//.fitSize([width, height], landData.features).center([55.287175894140645, 14.90326637107352]);
                        
                        .center([55.287175894140645, 14.90326637107352])
                        
                        .translate([0, 0])
                        .scale(scale*100)
                        .translate([width*scale/3.4, height*scale/3])//height*scale/2.3])
    //var projection = d3.geoEquirectangular().center([55.287175894140645, 14.90326637107352]).fitSize([width, height], landData.features);
    // var projection = d3.geoMercator().fitSize([width, height], landData.features).center([0,20]).translate([width / 2, height / 2]);


    function clearMap() {
        clearSelection(d3.selectAll(".Country"));
    }

    function clearCountryByName(countryName) {
        console.log("hhhhhhh")
        console.log(countryName)
        console.log(selectedCountry)
        countryName.filter((cn) => !selectedCountryRef.current.includes(cn)).forEach(cn => {
            clearSelection(svg.select(("#" + cn).replace(/\s/g, '')))
        })
    }

    // function clearCountry(country) {
    //     clearSelection(d3.select(country));
    // }

    function clearSelection(selection) {
        console.log("clear selection")
        selection
            .style("opacity", .5)
            .style("fill","grey")
            .style("stroke", "white")
            .style("stroke-width", 1);
    }

    function hoverCountryByName(countryName) {
        console.log("selected")
        console.log(selectedCountry)
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
            .style("stroke", "black")
            .style("fill","blue")
            .style("stroke-width", 3);
    }

    function selectCountryByName(countryName) {
        console.log("heyyyy")
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
            .style("stroke", "black")
            .style("fill","red")
            .style("stroke-width", 3);
    }

    function initMap() {
        clearMap();
        hoverCountryByName(hoveredCountry);
    }


    function onHover(d) {
        updateLockRef.current = true
        setHoveredCountry([this.id])//.properties["NAME"].replace(/\s/g, '')]);
        hoverCountryByName([this.id]);
    }
    
    function offHover(d) {
        setHoveredCountry([]);
        clearCountryByName([this.id])
        if (selectedCountry.length == 0) {
            updateLockRef.current = false
        }
    }

    function onClick(d) {
        //setUpdateLock(true)
        console.log("click")
        console.log(d)
        var a = selectedCountryRef.current
        selectedCountryRef.current = []
        clearCountryByName(a)
        selectedCountryRef.current = [d.properties["NAME"]]
        setSelectedCountry([d.properties["NAME"]])
        selectCountryByName([d.properties["NAME"]])
    }
    

    useEffect(() => {
        if (svg) {
            svg.append("g")
                .append("rect")
                .attr("x", 0)//margin.left)
                .attr("y", 0)//margin.top)
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom)
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
                .on("mouseleave", offHover )
                .on("click", function(event, d) {
                    onClick(d)
                })

            initMap();

            



        }

    }, [svg])

    useEffect(() => {
        
        if (svg && (!updateLockRef.current)) {
            //selectedCountryRef.current = selectedCountry
            if (selectedCountry.length != 0 | hoveredCountry.length != 0) {
                console.log("fail")
                clearMap();
                selectCountryByName(selectedCountry)
                hoverCountryByName(hoveredCountry)
            } else {
                clearMap();
            }
        }
    }, [svg, hoveredCountry, selectedCountry])


    return (
        // <div class="svg-container">
        // <svg ref={svgRef} />
        // </div>
        
<div id="chartId"></div>
        );

}


export default MapD3;