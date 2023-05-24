import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import data2 from "../europe_gov.csv";
import responsivefy from '../utils/responsify'
import _uniqueId from 'lodash/uniqueId';

import './violin.css'

function ViolinGraph({cat1, cat2, xLabel, yLabel, setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry, cat2_upper, cat2_selected, title="Unknown title", xLabelElement = xLabel, yLabelElement = yLabel}) {
    
    const [data, setData] = useState(null);
    const [sumstat, setSumstat] = useState(null);

    const id = useRef(_uniqueId('violin-'))
    
    let cat_index= 0 ;
    if(cat2_selected === "all_drivers") {
        //console.log("nestedButton1")
        cat_index = 0;
    } else if(cat2_selected === "young_drivers") {
        //console.log("nestedButton2")
        cat_index = 1;
    }
    // Reference to the SVG
    const svgRef = useRef(null);
    // State holding the initialised SVG
    const [svg, setSvg] = useState(null);
    // State holding a lock for graph updates
    const [updateLock, setUpdateLock] = useState(false);

    const transitionDuration = 1000;
    const histogramTicks = 30;

    // Dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 50},
    width = 500 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    // Upper value for cat2 range
    //const cat2_upper = 0.5;
    // The space between 2 groups. 0 means no padding. 1 is the maximum.
    const xLabelPadding = 0.05;
    // Amount of jitter within the scatterplot
    var jitterWidth = 15

    // Color scale for the scatter plot
    var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([0,cat2_upper[cat_index]])
    

    const promilleColor = new Map();
    promilleColor.set("", "var(--color-0-promille)")
    promilleColor.set("0.0", "var(--color-0-promille)")
    promilleColor.set("0", "var(--color-0-promille)")
    promilleColor.set("0.2", "var(--color-2-promille)")
    promilleColor.set("0.3", "var(--color-2-promille)")
    promilleColor.set("0.4", "var(--color-4-promille)")
    promilleColor.set("0.5", "var(--color-5-promille)")
    promilleColor.set("0.8", "var(--color-8-promille)")





    

 
    const datapointTooltipRef = useRef(null);
    const xTickTooltipRef = useRef(null);

    function positionTooltip(tooltip, event, offsetX=10, offsetY=10) {
        tooltip
            // Put tooltip in place (at mouse position)
            .style("left", function() {
                var clientrect = d3.select(this).node().getBoundingClientRect()
                return event.pageX > (window.innerWidth - clientrect.width)*0.95  ? ((event.pageX - clientrect.width - offsetX) + "px") : ((event.pageX + offsetX) + "px")
            })
            .style("top", function() {
                var clientrect = d3.select(this).node().getBoundingClientRect()
                return event.pageY > (window.innerHeight - clientrect.height)*0.95  ? ((event.pageY - clientrect.height - offsetY) + "px") : ((event.pageY + offsetY) + "px")
            })
    }


    /**
     * Tooltip when hovering over a point in the scatter plot
     */
    function createDatapointTooltip(div, d, event) {
        // Get names of labels to show in tooltip
        const xname = xLabelElement[cat_index].split(" (")[0];
        const yname = yLabelElement[cat_index].split(" (")[0];
        // Create tooltip HTML markup
        div.html(`<strong><u> ${d.Country}</u></strong><br/>${xname}: ${Math.round(d[cat1[cat_index]] * 100)/100}<br/>${yname}: ${Math.round(d[cat2[cat_index]]* 100)/100}`);
        // Put tooltip in place (at mouse position)
        positionTooltip(div, event);
    }

    /**
     * Tooltip when hovering over a x-label (giving aggregated info of all countries with that x value)
     */
    function createXTickTooltip(div, d, event, sumstat2) {

        var a = sumstat2.filter((e) => {
            
            // console.log("THE MAGICAL VALUE OF E IS " + e);
            // console.log("THE MAGICAL VALUE OF E.KEY IS " + e.key);
            return e.key == d;})
        // Create tooltip HTML markup
        div.html(`<strong><u> ${d}‰</u></strong><br/>median: ${Math.round(a[0].median* 100)/100}<br/># countries: ${a[0].values.filter((d) => (d[cat2[cat_index]] !== "")).length}`)
        // Put tooltip in place (at mouse position)
        positionTooltip(div, event);
    }

    function countriesWithXLabel(data, cat1value) {
        // Filter data on cat1
        var a = data.filter( function(d) { return d[cat1[cat_index]] == cat1value } )
        // Get "Country" column in dataset
        var b = d3.map(a, function(d) { return(d["Country"]) } )
        // Format country string (remove space)
        // var c = d3.map(b, function(d) { return(d.replace(/\s/g, '')) } ) 
        return b
    }

    /**
     * Hover all countries with the same x-label (cat1)
     */
    function hoverColumn(data, cat1value) {
        // Hover countries
        setHoveredCountry(countriesWithXLabel(data, cat1value));
    }

    function unHoverColumn() {
        setHoveredCountry([]);
    }

    function selectColumn(data, cat1value) {
        // Select countries
        setSelectedCountry(countriesWithXLabel(data, cat1value));
    }

    function unSelectColumn() {
        setSelectedCountry([]);
    }

    /**
     * Load data in state variable (prevent constant reloading of data)
     */
    useEffect(() => { 
        d3.csv(data2).then(d => { 
            setData(d);
        })
    })


    /* * * * * * * * * * 
     * Create the SVG  *
     * * * * * * * * * */
    useEffect(() => {
        // Append the svg object to the body of the page
        setSvg(d3.select("#" + id.current)
                    // Create SVG element
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

                    // Make responsive
                    .call(responsivefy)

                    // Translate into place
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                );
    }, [])

   
    /**
     * Configures / positions scatter plot contents
     *      also to use when upadting data / switching age
     */
    function createScatterPlot(circles, x, y, sumstat2) {

        // Position scatter plot data points
        // circles
        //     .attr("cx", function(d) {
        //         return ( x(d[cat1[cat_index]]) + x.bandwidth()/2 - 0.2*jitterWidth - Math.random()*jitterWidth )
        //     })
        //     .attr("cy", function(d) {
        //         return y(d[cat2[cat_index]])
        //     });



        circles
            .attr("cx", function(d){ 
                return(
                    d[cat1[cat_index]] != "" ? (
                    x(d[cat1[cat_index]]) + x.bandwidth()/2 - 0.2*jitterWidth - Math.random()*jitterWidth 
                    ) :  (
                    d[cat1[1-cat_index]] != "" ? x(d[cat1[1-cat_index]]) + x.bandwidth()/2 - 0.2*jitterWidth : 0)

                )


            })
            .attr("cy", function(d){
                return (
                    d[cat1[cat_index]] != "" ? (
                        d[cat2[cat_index]] != "" ?
                        (y(d[cat2[cat_index]])) : 
                        y(d3.index(sumstat2, d => d.key).get(d[cat1[cat_index]]).median) 
                    ) : (
                        d[cat1[1-cat_index]] != "" ? y(d3.index(sumstat2, d => d.key).get(d[cat1[1-cat_index]]).median) : 0
                    )
                    
                )
            })
            
            .attr("stroke", "white")
            .style("visibility", function(d) {
                return ((d[cat1[cat_index]] != "") && (d[cat2[cat_index]])) != "" ? "visible" : "hidden";
            })

        // Set circle styling
        svg.selectAll(".data-point")
            .attr("r", 5)
            .style("fill", function(d) { return (promilleColor.get(d[cat1[cat_index]])) } );
                    
        // Add hover and click effects to data points
        svg.selectAll(".data-point")
        .on('mouseover', function(event, d) {
            // Put tooltip into place and update its information
            const div = datapointTooltipRef.current
            div.transition().duration('50').style('opacity', 1);
            createDatapointTooltip(div, d, event)
            
            // Signal hovered countries
            setHoveredCountry([d["Country"]])
        })
        .on('mouseout', function(d,i) {
            const div = datapointTooltipRef.current
            div.transition().duration('50').style('opacity', 0)
            setHoveredCountry([])
            setUpdateLock(false);
        })
        .on('click', function(event, d) {
            // Signal selected country
            setSelectedCountry([d["Country"]])
        })

        // // Add hover effect to x labels
        // svg.selectAll(".x-axis .tick").each(function(d, i) {      
        //     d3.select(this).on("mouseover", function(event, d_) {

        //         // Put tooltip into place and update its information
        //         xTickTooltipRef.current.transition().duration('50').style('opacity', 1);
        //         createXTickTooltip(xTickTooltipRef.current, d_, event, sumstat2)

        //         // Signal hovered countries
        //         SelectColumn(data, d);
        //     })
        //     d3.select(this).on("mouseout", function() {
        //         xTickTooltipRef.current.transition().duration('50').style('opacity', 0)
        //         UnSelectColumn(d);
        //     })
        // })   

        // Allow hovering over x-label
        var xAxisTicks = svg.selectAll(".x-axis .tick")

        xTickTooltipRef.current = d3.select("body").append("div")
            .attr("class", "tooltip-hover")
            .style("opacity", 0)
            .style("position", "absolute");

        xAxisTicks.each(function(d, i) {      
            d3.select(this).on("mouseover", function(event, d_) {
                // Position tooltip and update information
                xTickTooltipRef.current.transition().duration('50').style('opacity', 1);
                createXTickTooltip(xTickTooltipRef.current, d_, event, sumstat2)
                // Signal hovered countries
                hoverColumn(data, d);
            })
            d3.select(this).on("mouseout", function() {
                xTickTooltipRef.current.transition().duration('50').style('opacity', 0);
                unHoverColumn(d);
            })
            // d3.select(this).on("click", function() {
            //     selectColumn(data, d)
            // })
        })          
    }

    /**
     * Creates histogram bins for violin
     */
    function createHistogram(y) {
        return d3.bin()
                .domain(y.domain())
                .thresholds(y.ticks(histogramTicks))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
                .value(d => d)
    }

    /**
     * Computes statistics for each histogram bin
     */
    function createSumstat(data, histogram) {
        return d3.rollup(data, 
            function(d) {   // For each key..
                var input = d.filter((g) => g[cat2[cat_index]] !== "").map(function(g) { return g[cat2[cat_index]] })    // Keep the variable called Sepal_Length
                var bins = histogram(input)   // And compute the binning on it.
                return(bins)
            },
            d => d[cat1[cat_index]])  // nest function allows to group the calculation per level of a factor
    }

    function createSumstat2(data) {
        return (
            Array.from(d3.group(data, d => d[cat1[cat_index]]), ([key, values]) => {
                const q1 = d3.quantile(values.filter((d) => (d[cat2[cat_index]] !== "")).map(d => d[cat2[cat_index]]).sort(d3.ascending), 0.25);
                const median = d3.quantile(values.filter((d) => (d[cat2[cat_index]] !== "")).map(d => d[cat2[cat_index]]).sort(d3.ascending), 0.5);
                const q3 = d3.quantile(values.filter((d) => (d[cat2[cat_index]] !== "")).map(d => d[cat2[cat_index]]).sort(d3.ascending), 0.75);
                const interQuantileRange = q3 - q1;
                const min = q1 - 1.5 * interQuantileRange;
                const max = q3 + 1.5 * interQuantileRange;
                return { key, values, q1, median, q3, interQuantileRange, min, max };
            }).filter(({ key }) => key !== "")
        )
    }

    /**
     * Creates the violin visualisation
     */
    function createViolin(data, violin,x, y) {
        
        // Features of the histogram
        var histogram = createHistogram(y)

        // Compute the binning for each group of the dataset
        var sumstat = createSumstat(data, histogram);

        // Highest number of items in a bin (for scaling of plot)
        var maxNum = 0;
        for (const [key, value] of sumstat.entries()) {
            var allBins = value
            var lengths = allBins.map(function(a){return a.length;})
            var longuest = d3.max(lengths)
            if (longuest > maxNum) { maxNum = longuest }
        }

        // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
        var xNum = d3.scaleLinear()
                    .range([0, x.bandwidth()])
                    .domain([-maxNum,maxNum])

        // Create violin plot
        violin
            .attr("d", d3.area()
                .x0( xNum(0) )
                .x1(function(d){ return(xNum(0)) } )
                .y(function(d){ return(y(d.x0)) } )
                .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
            )
            .transition()
            .on('start', function(e) {
                d3.select(this)
                    .transition()
                    .duration(transitionDuration/2)
                    // Create violin shape based on number of countries in each bin
                    .attr("d", d3.area()
                            .x0( xNum(0) )
                            .x1( function(d) { return(xNum(d.length)) } )
                            .y( function(d) { return(y(d.x0)) } )
                            .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                        )
            })
            .transition()
            .on('end', function(e) {
                d3.select(this)
                    .transition()
                    .duration(transitionDuration/2)
                    // Make plot disappear (flatten)
                    .attr("d", d3.area()
                            .x0( xNum(0) )
                            .x1(function(d){ return(xNum(0)) } )
                            .y(function(d){ return(y(d.x0)) } )
                            .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                        )
            })
    }

    /**
     * Update violin plot when switching age
     */
    function updateViolinPlot(x, y) {
        d3.csv(data2).then(data => {  
            
            if(svg){
                   
                

                // // Filter data to exclude empty values
                // data = data.filter(d => d[cat1[0]] !== "" && d[cat2[0]] !== ""); // TODO: filteren op beide, waarom niet enkel huidige cat_index?
                // data = data.filter(d => d[cat1[1]] !== "" && d[cat2[1]] !== "");
        
                

                // Data statistics
                var histogram = createHistogram(y)
                var sumstat = createSumstat(data, histogram);

                var violin = svg.selectAll(".data-path").transition().duration(transitionDuration/2)
        
                violin
                .attr("d", d3.area()
                        .x0( 0 )
                        .x1(function(d){ return(0) } )
                        .y(function(d){ return(y(d.x0)) } )
                        .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                    )

                violin
                .remove()

                violin = svg.selectAll(".myViolin")
                .data(sumstat)
                    .enter()        // So now we are working group per group
                    .filter(d => d[0] !== "")
                    .append("g")
                        .attr("transform", function(d){ return("translate(" + x(d[0]) +" ,0)") } ) // Translation on the right to be at the group position
                    .append("path")
                        .datum(function(d){ return(d[1])})     // So now we are working bin per bin
                        .style("stroke", "none")
                        .style("fill","grey")

                        .attr("class", "data-path")
                        .transition().delay(transitionDuration/2).duration(0)
                
                createViolin(data, violin, x, y)
            }

        });

    }

    /**
     * Update entire plot when category changes
     */
    useEffect(() => {
        //updateViolin( transitionDuration)
    }, [cat_index])


    /* * * * * * * * *
     * Populate SVG  *
     * * * * * * * * */
    useEffect(() => {
        
        if (svg) {

            // Transparant rectangle in background to detect clicks for deselection
            svg.append('rect')
                .attr('width', '100%')
                .attr('height', '100%')
                .style('fill', 'transparent').on('click', function(event, d) {
                    setSelectedCountry([])
            })

        
            d3.csv(data2).then(data => {  

                // Filter data to exclude empty values
                data = data.filter(d => d[cat1[cat_index]] !== "" && d[cat2[cat_index]] !== ""); // TODO: ?
                //data = data.filter(d => d[cat1[1]] !== "" && d[cat2[1]] !== "");

                
                    
                // Build and Show the Y scale
                var y = yScale();
                svg.append("g").call( d3.axisLeft(y) )
                svg.append("text")
                    .attr("class", "y-label")
                    .attr("id", id.current + "-y-label")
                    .attr("text-anchor", "end")
                    .attr("y", -45)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .text(yLabel[cat_index]);

                // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
                var x_values = xValues(data) // Get x-axis labels, sorted
                var x = xScale(x_values)  
                svg.append("g")
                    .attr("class", "x-axis")
                    .attr("id", "my-x-axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                svg.append("text")
                    .attr("class", "x-label")
                    .attr("id", id.current + "-x-label")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height + 30)
                    .text(xLabel[cat_index]);

                var histogram = createHistogram(y)
                var sumstat = createSumstat(data, histogram);
                

        
                // Create violin shape
                const violin = svg
                    .selectAll("myViolin")
                    .data(sumstat)
                    .enter()        // So now we are working group per group
                    .filter(d => d[0] !== "")
                    .append("g")
                        .attr("transform", function(d){ return("translate(" + x(d[0]) +" ,0)") } ) // Translation on the right to be at the group position
                    .append("path")
                        .datum(function(d) { return(d[1]) })     // So now we are working bin per bin
                        .style("stroke", "none")
                        .style("fill","grey")
                        .attr("class", "data-path")
                        //.attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

                // Configure violin shape based on data                        
                createViolin(data, violin.transition().duration(transitionDuration) ,x, y)

                // Data statistics per cat1
                var sumstat2 = createSumstat2(data)
                setSumstat(sumstat2);
                    
                // Create hover tooltip
                var div = d3.select("body").append("div")
                    .attr("class", "tooltip-hover")
                    .style("opacity", 0)
                    .style("position", "absolute");
                datapointTooltipRef.current = div

                // Create data points
                const circles = svg
                    .selectAll("indPoints")
                    .data(data)
                    .enter()
                    .filter(d => d[cat1[cat_index]] !== "")
                    //.filter(d => d[cat2[cat2_selected]] !== "")
                    .append("circle")

                    .attr("class", "data-point")
                    .attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

                // Configure data points
                createScatterPlot(circles, x, y, sumstat2)
                  
            

                // Show the median
                svg.selectAll("medianLines")
                    .data(sumstat2)
                    .join("line")

                    .attr("class", "data-median-line")
                    //.attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

                    .attr("x1", d => x(d.key) + x.bandwidth()/2 - x.bandwidth() / 3)
                    .attr("x2", d => x(d.key) + x.bandwidth()/2)
                    .attr("y1", d => y(d.median))
                    .attr("y2", d => y(d.median))
                    .attr("stroke", "black")
                    .attr("stroke-width", 2);

                
                // Allow hovering over x-label
                var xAxisTicks = svg.selectAll(".x-axis .tick")

                xTickTooltipRef.current = d3.select("body").append("div")
                    .attr("class", "tooltip-hover")
                    .style("opacity", 0)
                    .style("position", "absolute");

                xAxisTicks.each(function(d, i) {      
                    d3.select(this).on("mouseover", function(event, d_) {
                        // Position tooltip and update information
                        xTickTooltipRef.current.transition().duration('50').style('opacity', 1);
                        createXTickTooltip(xTickTooltipRef.current, d_, event, sumstat2)
                        // Signal hovered countries
                        hoverColumn(data, d);
                    })
                    d3.select(this).on("mouseout", function() {
                        xTickTooltipRef.current.transition().duration('50').style('opacity', 0);
                        unHoverColumn(d);
                    })
                    // d3.select(this).on("click", function() {
                    //     selectColumn(data, d)
                    // })
                })
        

            

        });
    }

        }, [svg]);
    
    function grayout(svg) {
        svg.selectAll(".data-point")
                .style("fill", "#ABACAD")
                .attr("r", 5);
    }

    function selectSingle(hc) {
        svg
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", "red");
    }

    function selectMulti(hcs) {
        hcs.forEach(hc => {
            svg
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", function(d){ return(promilleColor.get(d[cat1[cat_index]])) });
        })
    }

    function colorMulti(hcs) {
        hcs.forEach(hc => {
            svg
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", function(d){ return(promilleColor.get(d[cat1[cat_index]])) });
        })
    }

    function colorAll(svg) {
        svg.selectAll(".data-point")
                    .style("fill", function(d){ return(promilleColor.get(d[cat1[cat_index]])) })
                    .attr("r", 5);
    }

    function yScale() {
        return d3.scaleLinear()
                    .domain([ 0,cat2_upper[cat_index] ])
                    .range([height, 0]);
    }

    function xValues(data) {
        return data.filter(function(d) {return d[cat2[cat_index]] != ""}).reduce((acc, cur) => {
                    if (!acc.includes(cur[cat1[cat_index]])) {
                        acc.push(cur[cat1[cat_index]]);
                    }
                    return acc;
                }, []).sort(d3.ascending).filter(d => d !== "");
    }

    function xScale(x_values) {
        return d3.scaleBand()
                    .range([ 0, width ])
                    .domain(x_values)
                    .padding(xLabelPadding);
    }

    

    function updateScatterplot(x, y, sumstat2) {
        // Create transition
        const circles = svg.selectAll(".data-point").transition().duration(transitionDuration);

        //circles

        // Update scatterplot
        createScatterPlot(circles, x, y, sumstat2)

        // Update axis labels
        d3.select("#" + id.current + "-y-label").transition().text(yLabel[cat_index]);
        d3.select("#" + id.current + "-x-label").transition().text(xLabel[cat_index]);


    }

    function updateMedianLines(x, y, sumstat2) {

        // svg.selectAll(".data-median-line")
        //     .transition()
        //     .duration(transitionDuration/2)
        //     .style("opacity", 0) 
        
        // Remove old median lines
        svg.selectAll(".data-median-line")
            .remove();
        
        // Create new median lines
        svg.selectAll(".medianLines")
            .data(sumstat2)
            .enter()
            .append("g")
            .append("line")
            .attr("class", "data-median-line")
            .transition().delay(transitionDuration/2).duration(0)
            .attr("x1", d => x(d.key) + x.bandwidth() / 2 - x.bandwidth() / 3)
            .attr("x2", d => x(d.key) + x.bandwidth() / 2)
            .attr("y1", d => y(d.median))
            .attr("y2", d => y(d.median))
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .style("opacity", 0) // Set initial opacity to 0
        
        // // Transition and update median lines
        svg.selectAll(".data-median-line")
            .transition()
            .delay(transitionDuration/2)
            .duration(transitionDuration/2)
            .attr("x1", d => x(d.key) + x.bandwidth() / 2 - x.bandwidth() / 3)
            .attr("x2", d => x(d.key) + x.bandwidth() / 2)
            .attr("y1", d => y(d.median))
            .attr("y2", d => y(d.median))
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .style("opacity", 1); // Set final opacity to 1
    }

    function updateAxis(x, y) {
        // console.log("update axis, y is: " + y)
        // console.log("update axis, x is: " + x)
        // Get axis
        var xAxisGroup = svg.select(".x-axis");
        var yAxisGroup = svg.select(".y-axis");

        // Update the x-axis
        xAxisGroup
            .transition()
            .duration(transitionDuration)
            .call(d3.axisBottom(x));

        // Update the y-axis
        yAxisGroup
            .transition()
            .duration(transitionDuration)
            .call(d3.axisLeft(y));
    }

    /**
     * Update plots when making age change
     */
    useEffect(() => {
        
        if (data) {
            const data_filtered = data.filter(d => (d[cat1[cat_index]] !== "") && (d[cat2[cat_index]] !== "")); 

            // Get new axis ranges
            var x_values = xValues(data_filtered)
            let x = xScale(x_values)  
            //var y_values = yValues(data_filtered)
            //let y = yScale(y_values)
            let y = yScale()

            // Get statistics per cat1
            var sumstat2 = createSumstat2(data_filtered)
            setSumstat(sumstat2)

            updateAxis(x, y);
            updateMedianLines(x, y, sumstat2);
            updateViolinPlot(x, y)
            updateScatterplot(x, y, sumstat2);

            selectCountry(selectedCountry)
            hoverCountry(hoveredCountry)
            
        }
        
    }, [cat_index])


    function hoverCountry(country) {
        country.filter((c) => !selectedCountry.includes(c))
        .forEach(c => {
            svg
            .select(("#" + c).replace(/\s/g, ''))
            .style("fill", function(d){ return('var(--color-hover)') })
            .attr("r", country.length == 1 ? 10 : 5);
        })
    }

    function selectCountry(country) {
        country.forEach(c => {
            svg
            .select(("#" + c).replace(/\s/g, ''))
            .style("fill", function(d){ return('var(--color-selected)') })
            .attr("r", country.length == 1 ? 10 : 5);;
        })
    }

    function setCountry(country) {
        if (country.length == 1) {
            grayout(svg);
            selectMulti(country)
        } else if (country.length > 1) {
            grayout(svg);
            selectMulti(country)
        } else {
            colorAll(svg);
        }
    }

    /* * * * * * * * * *
     * Update on hover *
     * * * * * * * * * */
    useEffect(() => {
        if (svg && (!updateLock)) {
            if (selectedCountry.length != 0 | hoveredCountry.length != 0) {
                grayout(svg)
                selectCountry(selectedCountry)
                hoverCountry(hoveredCountry)
            } else {
                colorAll(svg);
            }
        }
    }, [svg, hoveredCountry, selectedCountry, updateLock])

return (
    <div id={id.current}/>
    );
}

export default ViolinGraph;