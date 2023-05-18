import React, { Component, useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import Scatter2 from "../plotFunctions/scatter2";
import BoxPlotGraph from "../plotFunctions/BoxPlotGraph";
import Map from "../map_europe/map"
import { Card, Layout, Space } from 'antd';


class Wegkwaliteit extends Component {
    

    constructor(props) {
        super(props);
        
        this.state = {
          hoveredCountry: ''
        };
      }

      componentDidMount() {
        // Load the CSV data
        /*
        d3.csv('/frontend/src/europe_gov.csv').then(data => {
          // Loop through each scatterplot definition
          this.scatterplots.forEach(plot => {
            // Filter the data for this scatterplot
            const plotData = data.filter(d => d[plot.x] !== '' && d[plot.y] !== '');
    
          });
        });*/
      }

      setHoveredCountry = (country) => {
        this.setState({hoveredCountry: country});
      }


//<Map setHoveredCountry={this.setHoveredCountry} hoveredCountry={this.state.hoveredCountry}/>
      render() {
        return (
          <div >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginLeft: "10px", marginRight: "0px" }}>
            <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
              <Scatter2 cat1="RoadQuality" cat2="cas" varXAxis='Road quality (score on 7)' varYaxis='Road fatalities (per 100000 inhabitants)' title='Road quality Europe'/>
            </Card>
            <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
              <Scatter2 cat1="RoadQuality" cat2="log(GDP(2019))" varXAxis='Road quality (score on 7)' varYaxis='log(GDP) (€)' title='GDP Europe'/>
            </Card>
            <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
              <Scatter2 cat1="Invest per capita" cat2="cas" varXAxis='Invested per capita (€ per resident)' varYaxis='Road fatalities (per 100000 residents)' title='Investments in roads Europe'/>
            </Card>
            </div>
          </div>
        );
      }
}

export default Wegkwaliteit;
