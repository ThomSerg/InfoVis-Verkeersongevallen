import React, { Component, useState, useRef, useEffect } from "react";
import Scatter from "../plotFunctions/scatter";
import D3Card from "../components/D3Card";
import ChartCard from "../components/ChartCard";
import TabHeader from "../layout/TabHeader";

import { Grid } from '@mantine/core';

class Wegkwaliteit extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      hoveredCountry: ''
    };
  }

  componentDidMount() {}

  render() {
    
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
            <ChartCard title="GDP Europe" > 
              <Scatter 
                cat1="RoadQuality" 
                cat2="log(GDP(2019))" 
                varXAxis='Road quality (score on 7)' 
                varYaxis='log(GDP) (€)' 
                title='GDP Europe' 
                setHoveredCountry={this.props.setHoveredCountry} 
                hoveredCountry={this.props.hoveredCountry} 
                selectedCountry={this.props.selectedCountry} 
                setSelectedCountry={this.props.setSelectedCountry}/>
            </ChartCard>
          </Grid.Col>

          <Grid.Col span={6}>
            <ChartCard title="Investments in roads Europe" > 
              <Scatter
                cat1="Invest per capita" 
                cat2="cas" 
                varXAxis='Invested per capita (€ per resident)' 
                varYaxis='Road fatalities (per 100000 residents)' 
                title='Investments in roads Europe' 
                setHoveredCountry={this.props.setHoveredCountry} 
                hoveredCountry={this.props.hoveredCountry} 
                selectedCountry={this.props.selectedCountry} 
                setSelectedCountry={this.props.setSelectedCountry}
                yMax={11}/>
            </ChartCard>
          </Grid.Col>

          <Grid.Col span={6}>
            <ChartCard title="Road quality Europe" >  
              <Scatter
                cat1="RoadQuality" 
                cat2="cas" 
                varXAxis='Road quality (score on 7)' 
                varYaxis='Road fatalities (per 100000 inhabitants)' 
                title='Road quality Europe' 
                setHoveredCountry={this.props.setHoveredCountry} 
                hoveredCountry={this.props.hoveredCountry} 
                selectedCountry={this.props.selectedCountry} 
                setSelectedCountry={this.props.setSelectedCountry}
                yMax={11}/>
            </ChartCard>
          </Grid.Col>

        </Grid>
      </div>
    );
  }
}

export default Wegkwaliteit;
