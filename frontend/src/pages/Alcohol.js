import React, { Component, useState, useRef, useEffect } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Grid
} from '@mantine/core';

import D3Card from "../plotFunctions/D3Card";
import StackedBarChart from "../plotFunctions/StackedBarChart";
import ChartCard from "../plotFunctions/ChartCard";
import ViolinGraph from "../plotFunctions/violin";

import Map from "../map_europe/map"
import MapD3 from "../map_europe/mapD3"
import EuropeMap from '../pages/EuropeMap';

function Alcohol({
    hoveredCountry,
    setHoveredCountry,
    selectedCountry,
    setSelectedCountry,
  }) {

  const [selectedNestedButton, setSelectedNestedButton] = useState("nestedButton1");


  return (

      <Grid>


        <Grid.Col span={6}>
          <ChartCard title="Allowed promille when driving" > 
            <D3Card
              hoveredCountry={hoveredCountry}
            />  
          </ChartCard>
        </Grid.Col>

        <Grid.Col span={6}>
          <ChartCard title="Allowed promille when driving" > 
            <StackedBarChart 
              cat="standard_driver" 
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              title = "Allowed promille in blood"
            />
          </ChartCard>
        </Grid.Col>

        <Grid.Col span={6}>
          <ChartCard title="Drink driving acceptance">
              <ViolinGraph 
                cat1="standard_driver" 
                cat2={["beh_alchohol", "standard_minus_novice"]} 
                xLabel="standard driver"
                yLabel={["beh alchohol", "standard minus novice"]}
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
                cat2_upper={[0.5, 0.5]}
                cat2_selected={selectedNestedButton}
                xLabelElement={"Max promille"}
                yLabelElement={"Acceptance of drunk driving"}
              />
            </ChartCard>
        </Grid.Col>

        <Grid.Col span={6}>
          <ChartCard title="Casualities with respect to drink driving limits">
            <ViolinGraph 
              cat1="standard_driver" 
              cat2={["cas", "cas_young"]} 
              xLabel="standard driver"
              yLabel={["casualties", "casualties young"]}
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              setSelectedCountry={setSelectedCountry} 
              selectedCountry={selectedCountry}
              cat2_upper={[10, 10]}
              cat2_selected={selectedNestedButton}
              xLabelElement={"Max promille"}
              yLabelElement={"Casualties young drivers"}
            />
          </ChartCard>
        </Grid.Col>

      </Grid>
  )
}

export default Alcohol;