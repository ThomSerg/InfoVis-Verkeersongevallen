import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import data2 from "../europe_gov.csv";

import './violin.css'

function ViolinGraph({cat1, cat2, xLabel, yLabel, setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry, cat2_upper, cat2_selected, title="Unknown title", xLabelElement = xLabel, yLabelElement = yLabel}) {
    let cat2_index= 0 ;
    if(cat2_selected === "nestedButton1") {
        //console.log("nestedButton1")
        cat2_index = 0;
    } else if(cat2_selected === "nestedButton2") {
        //console.log("nestedButton2")
        cat2_index = 1;
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
    height = 400 - margin.top - margin.bottom;

    // Upper value for cat2 range
    //const cat2_upper = 0.5;
    // The space between 2 groups. 0 means no padding. 1 is the maximum.
    const xLabelPadding = 0.05;
    // Amount of jitter within the scatterplot
    var jitterWidth = 15

    // Color scale for the scatter plot
    var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([0,cat2_upper[cat2_index]])

    const [data, setData] = useState(null);

    useEffect(() => { 
        d3.csv(data2).then(d => { 
            setData(d);
        })
    })

    //const [sumstat, setSumstat] = useState(null);

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
    

    function createScatterPlot(circles, x, y, sumstat2) {
        var mapp = d3.map(sumstat2, function(d) { return d.key; });

        console.log(mapp)

        var a = circles.attr("cx", function(d){return(x(d[cat1]) + x.bandwidth()/2 - 0.2*jitterWidth - Math.random()*jitterWidth )})
                .attr("cy", function(d){
                    return d[cat2[cat2_index]] != "" ?
                    
                    (y(d[cat2[cat2_index]])) : 
                    y(d3.index(sumstat2, d => d.key).get(d[cat1]).median)
                    //sumstat2[0].median
                })
                
                .attr("stroke", "white")
                .style("visibility", function(d) {
                    return d[cat2[cat2_index]] != "" ? "visible" : "hidden";})

        if (selectedCountry.length == 0) {
            a.attr("r", 5)
            .style("fill", function(d){ return(myColor(d[cat2[cat2_index]]))})
        }

                

                
    }

    function createHistogram(y) {
        return d3.bin()
        .domain(y.domain())
        .thresholds(y.ticks(histogramTicks))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
        .value(d => d)
    }

    function createSumstat(data, histogram) {
        return d3.rollup(data, 
            function(d) {   // For each key..
                var input = d.filter((g) => g[cat2[cat2_index]] !== "").map(function(g) { return g[cat2[cat2_index]] })    // Keep the variable called Sepal_Length
                var bins = histogram(input)   // And compute the binning on it.
                return(bins)
            },
            d => d[cat1])  // nest function allows to group the calculation per level of a factor
    }

    function createViolin(data, violin,x, y) {
        // Features of the histogram
        var histogram = createHistogram(y)

        // Compute the binning for each group of the dataset
        var sumstat = createSumstat(data, histogram);

        

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

        violin
        .transition()
        .on('start', function(e) {
            //d3.select(this).select("#d").attr("x1", function(d){ return(xNum(d.length)) } )
            console.log(d3.select(this))
            d3.select(this)
            .transition()
            .duration(transitionDuration/2)
            .attr("d", d3.area()
                    .x0( xNum(0) )
                    .x1(function(d){ return(xNum(d.length)) } )
                    .y(function(d){ return(y(d.x0)) } )
                    .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                )
        })


        .transition()
        .on('end', function(e) {
            //d3.select(this).select("#d").attr("x1", function(d){ return(xNum(d.length)) } )
            console.log(d3.select(this))
            d3.select(this)
            .transition()
            .duration(transitionDuration/2)
            .attr("d", d3.area()
                    .x0( xNum(0) )
                    .x1(function(d){ return(xNum(0)) } )
                    .y(function(d){ return(y(d.x0)) } )
                    .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                )
        })
        
    }

    /* * * * * * * * *
     * Populate SVG  *
     * * * * * * * * */
    useEffect(() => {
        
        if (svg) {

            svg.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .style('fill', 'transparent').on('click', function(event, d) {
                setSelectedCountry([])
                
            })

        // Read the data and compute summary statistics for each specie
        d3.csv(data2).then(data => {  

            // Get x-axis labels, sorted
            const x_values = xValues(data)
                
            // Build and Show the Y scale
            var y = yScale();
            svg.append("g").call( d3.axisLeft(y) )
            svg.append("text")
                .attr("class", "y-label")
                //.style("font", legend_font_size+"px times")
                .attr("text-anchor", "end")
                .attr("y", -45)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text(yLabel);

            // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
            var x = xScale(x_values)  
            svg.append("g")
                .attr("class", "x-axis")
                .attr("id", "my-x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
            svg.append("text")
                .attr("class", "x-label")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + 30)
                .text(xLabel);

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
                .datum(function(d){ return(d[1])})     // So now we are working bin per bin
                .style("stroke", "none")
                .style("fill","grey")

                .attr("class", "data-path")
                //.attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

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

            violin.attr("d", d3.area()
                .x0( xNum(0) )
                .x1(function(d){ return(xNum(0)) } )
                .y(function(d){ return(y(d.x0)) } )
                .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
            )
                       
            createViolin(data, violin.transition().duration(transitionDuration) ,x, y)



            // Data statistics
            var sumstat2 = Array.from(d3.group(data, d => d[cat1]), ([key, values]) => {
                const q1 = d3.quantile(values.map(d => d[cat2[cat2_index]]).sort(d3.ascending), 0.25);
                const median = d3.quantile(values.map(d => d[cat2[cat2_index]]).sort(d3.ascending), 0.5);
                const q3 = d3.quantile(values.map(d => d[cat2[cat2_index]]).sort(d3.ascending), 0.75);
                const interQuantileRange = q3 - q1;
                const min = q1 - 1.5 * interQuantileRange;
                const max = q3 + 1.5 * interQuantileRange;
                return { key, values, q1, median, q3, interQuantileRange, min, max };
            }).filter(({ key }) => key !== "")

                

            // Hover tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip-hover")
                .style("opacity", 0)
                .style("position", "absolute");

            console.log("selected")
            console.log(cat2_index);

            // Add individual points with jitter
            const circles = svg
                .selectAll("indPoints")
                .data(data)
                .enter()
                .filter(d => d[cat1] !== "")
                //.filter(d => d[cat2[cat2_selected]] !== "")
                .append("circle")

                .attr("class", "data-point")
                .attr("id", function(d) {return d["Country"].replace(/\s/g, '')})


            createScatterPlot(circles, x, y, sumstat2)

            circles.on('mouseover', function(event, d) {
                if (selectCountry.length == 0) {
                //setUpdateLock(true);
                }

                // d3.select(this).transition().duration('50').attr('opacity', '.85');
                // div.transition().duration('50').style('opacity', 1);

                div.html(`<strong><u> ${d.Country}</u></strong><br/>${xLabelElement}: ${Math.round(d[cat1] * 100)/100}<br/>${yLabelElement}: ${Math.round(d[cat2[cat2_index]]* 100)/100}`) //+ " : " + d[cat2[cat2_selected]])
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px");

                setHoveredCountry([d["Country"]])

            })
            .on('mouseout', function(d,i) {
                // d3.select(this).transition().duration('50').attr('opacity', '1')
                // div.transition().duration('50').style('opacity', 0)

                setHoveredCountry([])

                setUpdateLock(false);
            })

            .on('click', function(event, d) {
                console.log(d)
                setSelectedCountry([d["Country"]])
                console.log(selectedCountry)
            })

                

            
            const dataArray = sumstat2.map(d => [Number(d.key), Number(d.median)]).sort(function(x,y){return d3.ascending(x[0], y[0]);});
            console.log(dataArray);
                
            
            var x_data = sumstat2.map(function(d) { return d.key; })
            var y_data = sumstat2.map(function(d) { return d.median; })


            var meanLine = d3.line()
                .x(function(d) {
                    console.log(d[0]);
                    return x(d[0]) + x.bandwidth()/2
                })
                .y(function(d) {
                    console.log(d[1]);
                    return y(d[1])
                });

            // console.log(sumstat2.sort(function(x,y){return d3.ascending(x.key, y.key);}))
            // console.log(meanLine(sumstat2.sort(function(x,y){return d3.ascending(x.key, y.key);})))
            console.log(sumstat2)
            svg
            .selectAll("meanLine")
            .datum(dataArray)
            .join("path")
            //.sort(function(x,y){return d3.ascending(x.key, y.key);}))
            //.join("path")
                //.attr("class", "line")
                //.attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("d", meanLine);
                
                // .attr("d", d => d3.line()
                //                     .x(function(s) {return s.map(function(g) { return g.key; })})
                //                     .y(function(s) {return s.map(function(g) { return g.median; })})
                // )


            // Show the median
            svg.selectAll("medianLines")
                .data(sumstat2)
                .join("line")

                .attr("class", "data-median-line")
                //.attr("id", function(d) {return d["Country"].replace(/\s/g, '')})

                .attr("x1", d => x(d.key) + x.bandwidth()/2 - x.bandwidth() / 4)
                .attr("x2", d => x(d.key) + x.bandwidth()/2 + x.bandwidth() / 4)
                .attr("y1", d => y(d.median))
                .attr("y2", d => y(d.median))
                .attr("stroke", "black")
                .attr("stroke-width", 2);

            
            // Allow hovering over x-label
            var xAxisTicks = svg.selectAll(".x-axis .tick")

            function SelectColumn(cat1value) {
                //setUpdateLock(true);

                var a = data.filter(function(d){return d[cat1] == cat1value})
                var b = d3.map(a, function(d){return(d["Country"])})
                var c = d3.map(b, function(d){return(d.replace(/\s/g, ''))})

                console.log(c)

                // grayout(svg);
                // colorMulti(c);                

                setHoveredCountry(b);
            }

            function UnSelectColumn() {
                setHoveredCountry([]);

                //colorAll(svg);

                //setUpdateLock(false);
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
            .style("fill", function(d){ return(myColor(d[cat2[cat2_index]])) });
        })
    }

    function colorMulti(hcs) {
        hcs.forEach(hc => {
            svg
            .select(("#" + hc).replace(/\s/g, ''))
            .style("fill", function(d){ return(myColor(d[cat2[cat2_index]])) });
        })
    }

    function colorAll(svg) {
        console.log("color all")
        svg.selectAll(".data-point")
                    .style("fill", function(d){ return(myColor(d[cat2[cat2_index]])) })
                    .attr("r", 5);
    }

    function yScale() {
        return d3.scaleLinear()
                    .domain([ 0,cat2_upper[cat2_index] ])
                    .range([height, 0]);
    }

    function xValues(data) {
        return data.filter(function(d) {return d[cat2[cat2_index]] != ""}).reduce((acc, cur) => {
                    if (!acc.includes(cur[cat1])) {
                        acc.push(cur[cat1]);
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

    useEffect(() => {
        

        if (data) {
            console.log("switch")
            console.log(cat2_index)
        // Build and Show the Y scale
        var y = yScale();

        // Get x-axis labels, sorted
        const x_values = xValues(data)
        // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
        var x = xScale(x_values)
                
        const circles = svg.selectAll(".data-point").transition().duration(transitionDuration);

        var sumstat2 = Array.from(d3.group(data, d => d[cat1]), ([key, values]) => {
            const q1 = d3.quantile(values.map(d => d[cat2[cat2_index]]).sort(d3.ascending), 0.25);
            const median = d3.quantile(values.map(d => d[cat2[cat2_index]]).sort(d3.ascending), 0.5);
            const q3 = d3.quantile(values.map(d => d[cat2[cat2_index]]).sort(d3.ascending), 0.75);
            const interQuantileRange = q3 - q1;
            const min = q1 - 1.5 * interQuantileRange;
            const max = q3 + 1.5 * interQuantileRange;
            return { key, values, q1, median, q3, interQuantileRange, min, max };
        }).filter(({ key }) => key !== "")
        
        createScatterPlot(circles, x, y, sumstat2)





        var histogram = createHistogram(y)
        var sumstat = createSumstat(data, histogram);


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

        
        var violin = svg.selectAll(".data-path").transition().duration(transitionDuration/2)
        
        violin
        .attr("d", d3.area()
                .x0( xNum(0) )
                .x1(function(d){ return(xNum(0)) } )
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
        
        
        //.data(sumstat).transition().duration(transitionDuration)

        //const violin = svg.selectAll(".myViolin").datum(sumstat).transition().duration(transitionDuration)

        violin
        
        .attr("d", d3.area()
                .x0( xNum(0) )
                .x1(function(d){ return(xNum(0)) } )
                .y(function(d){ return(y(d.x0)) } )
                .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
            )
            .transition()
        .on('start', function(e) {
            //d3.select(this).select("#d").attr("x1", function(d){ return(xNum(d.length)) } )
            console.log(d3.select(this))
            d3.select(this)
            .transition()
            .duration(transitionDuration/2)
            .attr("d", d3.area()
                    .x0( xNum(0) )
                    .x1(function(d){ return(xNum(d.length)) } )
                    .y(function(d){ return(y(d.x0)) } )
                    .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                )
        })

        // svg.selectAll(".medianLines")
        //         .data(sumstat2)
        //         .transition()
        //         .delay(transitionDuration)
        //         .select("line")
        //         .attr("x1", d => x(d.key) + x.bandwidth()/2 - x.bandwidth() / 4)
        //         .attr("x2", d => x(d.key) + x.bandwidth()/2 + x.bandwidth() / 4)
        //         .attr("y1", d => y(d.median))
        //         .attr("y2", d => y(d.median))
        //         .attr("stroke", "black")
        //         .attr("stroke-width", 2);

        svg.selectAll(".data-median-line")
                .data(sumstat2)
                .transition()
                .duration(transitionDuration)
                // .select("line")
                .attr("x1", d => x(d.key) + x.bandwidth()/2 - x.bandwidth() / 4)
                .attr("x2", d => x(d.key) + x.bandwidth()/2 + x.bandwidth() / 4)
                .attr("y1", d => y(d.median))
                .attr("y2", d => y(d.median))
                .attr("stroke", "black")
                .attr("stroke-width", 2);


                

        //createViolin(data, violin, x, y)
    }
        
    }, [cat2_index])


    function hoverCountry(country) {
        country.filter((c) => !selectedCountry.includes(c))
        .forEach(c => {
            svg
            .select(("#" + c).replace(/\s/g, ''))
            .style("fill", function(d){ return('#4dbf7e') })
            .attr("r", country.length == 1 ? 10 : 5);
        })
    }

    function selectCountry(country) {
        country.forEach(c => {
            svg
            .select(("#" + c).replace(/\s/g, ''))
            .style("fill", function(d){ return('#bf584d') })
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
    // useEffect(() => {
    //     if (svg && (!updateLock) && (selectedCountry.length == 0)) {
    //         setCountry(hoveredCountry)
    //     }
    // }, [svg, hoveredCountry, updateLock])


    // useEffect(() => {
    //     if (svg && (!updateLock)) {
    //         setCountry(selectedCountry)
    //     }
    // }, [svg, selectedCountry, updateLock])

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
    <svg ref={svgRef} width="500" height="500"/>
    );
}

export default ViolinGraph;