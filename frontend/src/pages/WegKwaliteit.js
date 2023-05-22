import React, { Component, useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import Scatter2 from "../plotFunctions/scatter2";
import BoxPlotGraph from "../plotFunctions/BoxPlotGraph";
import Map from "../map_europe/map"
import { Card, Layout, Space } from 'antd';
import D3Card from "../plotFunctions/D3Card";
import ChartCard from "../plotFunctions/ChartCard";
import TabHeader from "../plotFunctions/TabHeader";

import { Grid } from '@mantine/core';

import { useViewportSize } from '@mantine/hooks';


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

      render() {
        

        var width= 550, height = 350
        var scale = this.props.scale
        console.log("scale")
        console.log(scale)

        return (
          <div>
            <TabHeader ></TabHeader>

            <Grid>

              <Grid.Col span={6}>
                <ChartCard title="Information" > 
                  <D3Card
                    hoveredCountry={this.props.hoveredCountry}
                  />  
                </ChartCard> 
              </Grid.Col>

              <Grid.Col span={6}>
                <ChartCard title="Road quality Europe" >  
                  <Scatter2 cat1="RoadQuality" cat2="cas" varXAxis='Road quality (score on 7)' varYaxis='Road fatalities (per 100000 inhabitants)' title='Road quality Europe' setHoveredCountry={this.props.setHoveredCountry} hoveredCountry={this.props.hoveredCountry} selectedCountry={this.props.selectedCountry} setSelectedCountry={this.props.setSelectedCountry}/>
                </ChartCard>
              </Grid.Col>

              <Grid.Col span={6}>
                <ChartCard title="GDP Europe" > 
                  <Scatter2 cat1="RoadQuality" cat2="log(GDP(2019))" varXAxis='Road quality (score on 7)' varYaxis='log(GDP) (€)' title='GDP Europe' setHoveredCountry={this.props.setHoveredCountry} hoveredCountry={this.props.hoveredCountry} selectedCountry={this.props.selectedCountry} setSelectedCountry={this.props.setSelectedCountry}/>
                </ChartCard>
              </Grid.Col>

              <Grid.Col span={6}>
                <ChartCard title="Investments in roads Europe" > 
                  <Scatter2 cat1="Invest per capita" cat2="cas" varXAxis='Invested per capita (€ per resident)' varYaxis='Road fatalities (per 100000 residents)' title='Investments in roads Europe' setHoveredCountry={this.props.setHoveredCountry} hoveredCountry={this.props.hoveredCountry} selectedCountry={this.props.selectedCountry} setSelectedCountry={this.props.setSelectedCountry}/>
                </ChartCard>
              </Grid.Col>

            </Grid>
          </div>
        );
      }
}

export default Wegkwaliteit;
