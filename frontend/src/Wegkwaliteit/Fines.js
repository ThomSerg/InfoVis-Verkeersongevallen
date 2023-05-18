import React, { Component, useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import Scatter2 from "../plotFunctions/scatter2";
import Map from "../map_europe/map"
import { Card, Layout, Space } from 'antd';
import D3Card from "../plotFunctions/D3Card";
import ChartCard from "../plotFunctions/ChartCard";


class Fines extends Component {
    

    constructor(props) {
        super(props);

        this.props = props

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
            <ChartCard title="Information" > 
              <D3Card
                hoveredCountry={this.props.hoveredCountry}
              />  
            </ChartCard> 
            <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
              <Scatter2 cat1="fine_city" cat2="cas" varXAxis='Speed fine on city roads' varYaxis='Road fatalities (per 100000 inhabitants)' title='Speed fines on city roads'/>
            </Card>
            <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
              <Scatter2 cat1="fine_rural" cat2="cas" varXAxis='Speed fine on rural roads' varYaxis='Road fatalities (per 100000 residents)' title='Speed fines on rural roads'/>
            </Card>
            <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
              <Scatter2 cat1="fine_highway" cat2="cas" varXAxis='Speed fine on highway roads' varYaxis='Road fatalities (per 100000 residents)' title='Speed fines on highway roads'/>
            </Card>
            </div>

          </div>
        );
      }
}

export default Fines;
