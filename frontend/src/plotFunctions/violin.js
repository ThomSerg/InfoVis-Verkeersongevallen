import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import data2 from "../europe_gov.csv";

function ViolinGraph({cat1, cat2, xLabel, yLabel, setHoveredCountry, hoveredCountry}) {
    
    // Reference to the SVG
    const svgRef = useRef(null);
    // State holding the initialised SVG
    const [svg, setSvg] = useState(null);

    // State holding a lock for graph updates
    const [updateLock, setUpdateLock] = useState(false);

    // Dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // Upper value for cat2 range
    const cat2_upper = 0.5;
    // The space between 2 groups. 0 means no padding. 1 is the maximum.
    const xLabelPadding = 0.05;
    // Amount of jitter within the scatterplot
    var jitterWidth = 15

    // Color scale for the scatter plot
    var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([0,cat2_upper])

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
    

    /* * * * * * * * *
     * Populate SVG  *
     * * * * * * * * */
    useEffect(() => {
        
        if (svg) {

        // Read the data and compute summary statistics for each specie
        d3.csv(data2).then(data => {     

            // Get x-axis labels, sorted
            const xValues = data.filter(function(d) {return d[cat2] != ""}).reduce((acc, cur) => {
                if (!acc.includes(cur[cat1])) {
                acc.push(cur[cat1]);
                }
                return acc;
            }, []).sort(d3.ascending).filter(d => d !== "");
                

            // Build and Show the Y scale
            var y = d3.scaleLinear()
                        .domain([ 0,cat2_upper ])
                        .range([height, 0])
            svg.append("g").call( d3.axisLeft(y) )
            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 6)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text(yLabel);

            // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
            var x = d3.scaleBand()
                        .range([ 0, width ])
                        .domain(xValues)
                        .padding(xLabelPadding)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
            svg.append("g")
                .attr("class", "x-axis")
                .attr("id", "my-x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height - 6)
                .text(xLabel);

            
            // Features of the histogram
            var histogram = d3.bin()
                                .domain(y.domain())
                                .thresholds(y.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
                                .value(d => d)

            // Compute the binning for each group of the dataset
            var sumstat = d3.rollup(data, 
                                    function(d) {   // For each key..
                                        var input = d.filter((g) => g[cat2] !== "").map(function(g) { return g[cat2] })    // Keep the variable called Sepal_Length
                                        var bins = histogram(input)   // And compute the binning on it.
                                        return(bins)
                                    },
                                    d => d[cat1])  // nest function allows to group the calculation per level of a factor

            // Data statistics
            var sumstat2 = Array.from(d3.group(data, d => d[cat1]), ([key, values]) => {
                                    const q1 = d3.quantile(values.map(d => d[cat2]).sort(d3.ascending), 0.25);
                                    const median = d3.quantile(values.map(d => d[cat2]).sort(d3.ascending), 0.5);
                                    const q3 = d3.quantile(values.map(d => d[cat2]).sort(d3.ascending), 0.75);
                                    const interQuantileRange = q3 - q1;
                                    const min = q1 - 1.5 * interQuantileRange;
                                    const max = q3 + 1.5 * interQuantileRange;
                                    return { key, values, q1, median, q3, interQuantileRange, min, max };
                                }).filter(({ key }) => key !== "")

            // Highest number of items in a bin
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

      
            // Create violin shape
            svg
            .selectAll("myViolin")
            .data(sumstat)
            .enter()        // So now we are working group per group
            .filter(d => d[0] !== "")
            .append("g")
                .attr("transform", function(d){ return("translate(" + x(d[0]) +" ,0)") } ) // Translation on the right to be at the group position
            .append("path")
                .datum(function(d){ return(d[1])})     // So now we are working bin per bin
                .style("stroke", "none")
                .style("fill","grey")
                .attr("d", d3.area()
                    .x0( xNum(0) )
                    .x1(function(d){ return(xNum(d.length)) } )
                    .y(function(d){ return(y(d.x0)) } )
                    .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                )

            // Hover tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip-hover")
                .style("opacity", 0)
                .style("position", "absolute");

            // Add individual points with jitter
            svg
                .selectAll("indPoints")
                .data(data)
                .enter()
                .filter(d => d[cat1] !== "")
                .filter(d => d[cat2] !== "")
                .append("circle")
                .attr("cx", function(d){return(x(d[cat1]) + x.bandwidth()/2 - Math.random()*jitterWidth )})
                .attr("cy", function(d){return(y(d[cat2]))})
                .attr("r", 5)
                .style("fill", function(d){ return(myColor(d[cat2]))})
                .attr("stroke", "white")

                .attr("class", "data-point")
                .attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

                .on('mouseover', function(event, d) {
                    setUpdateLock(true);

                    d3.select(this).transition().duration('50').attr('opacity', '.85');
                    div.transition().duration('50').style('opacity', 1);

                    div.html(d["Country"] + " : " + d[cat2])
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");

                    setHoveredCountry([d["Country"]])

                })
                .on('mouseout', function(d,i) {
                    d3.select(this).transition().duration('50').attr('opacity', '1')
                    div.transition().duration('50').style('opacity', 0)

                    setHoveredCountry([])

                    setUpdateLock(false);
                })


                
            
            // var x_data = sumstat2.map(function(d) { return d.key; })
            // var y_data = sumstat2.map(function(d) { return d.median; })


            // var meanLine = d3.line()
            //     .x(function(d) {
            //         return x(d.key) + x.bandwidth()/2;
            //     })
            //     .y(function(d) {
            //         return y(d.median);
            //     });

            // svg
            // .selectAll("meanLine")
            // .data([sumstat2.sort(function(x,y){return d3.ascending(x.key, y.key);})])
            // .join("path")
            //     //.attr("class", "line")
            //     .attr("d", meanLine);
            //     // .attr("d", d => d3.line()
            //     //                     .x(function(s) {return s.map(function(g) { return g.key; })})
            //     //                     .y(function(s) {return s.map(function(g) { return g.median; })})
            //     // )


            // Show the median
            svg.selectAll("medianLines")
                .data(sumstat2)
                .join("line")
                .attr("x1", d => x(d.key) + x.bandwidth()/2 - x.bandwidth() / 4)
                .attr("x2", d => x(d.key) + x.bandwidth()/2 + x.bandwidth() / 4)
                .attr("y1", d => y(d.median))
                .attr("y2", d => y(d.median))
                .attr("stroke", "black")
                .attr("stroke-width", 2);

            
            // Allow hovering over x-label
            var xAxisTicks = svg.selectAll(".x-axis .tick")

            function SelectColumn(cat1value) {
                setUpdateLock(true);

                var a = data.filter(function(d){return d[cat1] == cat1value})
                var b = d3.map(a, function(d){return(d["Country"])})
                var c = d3.map(b, function(d){return(d.replace(/\s/g, ''))})

                console.log(c)

                grayout(svg);
                colorMulti(c);                

                setHoveredCountry(b);
            }

            function UnSelectColumn() {
                setHoveredCountry([]);

                colorAll(svg);

                setUpdateLock(false);
            }

            xAxisTicks.each(function(d, i) {      
                d3.select(this).on("mouseover", function() {
                    SelectColumn(d);
                })
                d3.select(this).on("mouseout", function() {
                    UnSelectColumn(d);
                })
            })
        

        });
    }

        }, [svg,cat1,cat2]);
    
    function grayout(svg) {
        svg.selectAll(".data-point")
                .style("fill", "#ABACAD")
    }

    function selectSingle(hc) {
        d3
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", "red");
    }

    function selectMulti(hcs) {
        hcs.forEach(hc => {
            d3
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", function(d){ return(myColor(d[cat2])) });
        })
    }

    function colorMulti(hcs) {
        hcs.forEach(hc => {
            d3
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", function(d){ return(myColor(d[cat2])) });
        })
    }

    function colorAll(svg) {
        svg.selectAll(".data-point")
                    .style("fill", function(d){ return(myColor(d[cat2])) })
    }

    

    /* * * * * * * * * *
     * Update on hover *
     * * * * * * * * * */
    useEffect(() => {
        if (svg && (!updateLock)) {
      
            if (hoveredCountry.length == 1) {
                grayout(svg);
                selectSingle(hoveredCountry[0])
            } else if (hoveredCountry.length > 1) {
                grayout(svg);
                selectMulti(hoveredCountry)
            } else {
                colorAll(svg);
            }
        }
    }, [svg, hoveredCountry, updateLock])

return (
    <svg ref={svgRef} width="500" height="500"/>
    );
}

export default ViolinGraph;