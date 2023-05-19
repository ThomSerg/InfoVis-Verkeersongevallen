import React, { useState, useRef, useEffect } from "react";
//import { useState } from 'react-usestateref'
import * as d3 from "d3";
import {landData} from './europe'

import './mapD3.css'

function MapD3({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {

    // Reference to resulting HTML div
    const resultDivRef = useRef(null);
    // State holding the initialised SVG
    const [svg, setSvg] = useState(null);
    // State holding a lock for graph updates
    const updateLockRef = useRef(false);
    // Which country is selected, updates faster then setSelectedCountry
    const selectedCountryRef = useRef([]);


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

    useEffect(() => {

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

    }, [])

    
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
        selection
            .style("opacity", .5)
            .style("fill","grey")
            .style("stroke", "white")
            .style("stroke-width", 1);
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
            .style("stroke", "black")
            .style("fill","blue")
            .style("stroke-width", 3);
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
        setHoveredCountry([this.id])
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
        <div ref={resultDivRef}></div>
        );

}


export default MapD3;