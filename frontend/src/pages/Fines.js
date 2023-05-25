import React, { Component, useState, useRef, useEffect } from "react";

import Scatter from "../plotFunctions/scatter";
import D3Card from "../components/D3Card";
import ChartCard from "../components/ChartCard";
import TabHeader from "../layout/TabHeader";

import { Grid } from '@mantine/core';


class Fines extends Component {
    
  constructor(props) {
      super(props);
      this.props = props
      this.state = {
        hoveredCountry: ''
      };
    }

  componentDidMount() {}

  setHoveredCountry = (country) => {
    this.setState({hoveredCountry: country});
  }

  render() {
    return (
      <div>
        <TabHeader></TabHeader>

        <Grid>
          
          <Grid.Col span={6}>
            <ChartCard title="Information" > 
              <D3Card
                hoveredCountry={this.props.hoveredCountry}
              />  
            </ChartCard> 
          </Grid.Col>

          <Grid.Col span={6}>
            <ChartCard title="Speed fines on city roads" > 
              <Scatter 
                cat1="fine_city" 
                cat2="cas" 
                varXAxis='Speed fine on city roads (21km/h too fast)' 
                varYaxis='Road fatalities (per 100000 inhabitants)' 
                title='Speed fines on city roads'
                setHoveredCountry={this.props.setHoveredCountry} 
                hoveredCountry={this.props.hoveredCountry} 
                selectedCountry={this.props.selectedCountry} 
                setSelectedCountry={this.props.setSelectedCountry}/>
            </ChartCard>
          </Grid.Col>

          <Grid.Col span={6}>
            <ChartCard title="Speed fines on rural roads" > 
              <Scatter
                cat1="fine_rural" 
                cat2="cas" 
                varXAxis='Speed fine on rural roads (21km/h too fast)' 
                varYaxis='Road fatalities (per 100000 residents)' 
                title='Speed fines on rural roads'
                setHoveredCountry={this.props.setHoveredCountry} 
                hoveredCountry={this.props.hoveredCountry} 
                selectedCountry={this.props.selectedCountry} 
                setSelectedCountry={this.props.setSelectedCountry}/>
            </ChartCard>
          </Grid.Col>

          <Grid.Col span={6}>
            <ChartCard title="Speed fines on highway roads" > 
              <Scatter
                cat1="fine_highway" 
                cat2="cas" 
                varXAxis='Speed fine on highway roads (21km/h too fast)' 
                varYaxis='Road fatalities (per 100000 residents)' 
                title='Speed fines on highway roads'
                setHoveredCountry={this.props.setHoveredCountry} 
                hoveredCountry={this.props.hoveredCountry} 
                selectedCountry={this.props.selectedCountry} 
                setSelectedCountry={this.props.setSelectedCountry}/>
            </ChartCard>
          </Grid.Col>

        </Grid>
      </div>
    );
  }
}

export default Fines;
