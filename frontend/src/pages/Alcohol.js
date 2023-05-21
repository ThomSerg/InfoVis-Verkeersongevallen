import React, { Component, useState, useRef, useEffect } from "react";
import {
  Grid,
  Button
} from '@mantine/core';

import D3Card from "../plotFunctions/D3Card";
import StackedBarChart from "../plotFunctions/StackedBarChart";
import ChartCard from "../plotFunctions/ChartCard";
import ViolinGraph from "../plotFunctions/violin";
import AgeButtons from "../AgeButtons";
import TabHeader from "../plotFunctions/TabHeader";

import Map from "../map_europe/map"
import MapD3 from "../map_europe/mapD3"
import EuropeMap from '../pages/EuropeMap';

function Alcohol({
    hoveredCountry,
    setHoveredCountry,
    selectedCountry,
    setSelectedCountry,
  }) {

  const [selectedNestedButton, setSelectedNestedButton] = useState("all_drivers");





  return (
    <div>
      <TabHeader title="Alcohol behind the wheel">
        <AgeButtons
          selectedNestedButton = {selectedNestedButton}
          setSelectedNestedButton = {setSelectedNestedButton}
        />

      </TabHeader>

      <Grid>


        <Grid.Col span={6}>       
          

          <ChartCard title="Information" > 
            <D3Card
              hoveredCountry={hoveredCountry}
            />  
          </ChartCard>

        </Grid.Col>

        <Grid.Col span={6}>
          <div>
          

          <ChartCard title="Allowed promille when driving" > 
            <StackedBarChart            
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              cat_selected={selectedNestedButton}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              cat={["standard_driver", "standard_minus_novice"]} 


            />
          </ChartCard>
          </div>
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

      </div>
  )
}

export default Alcohol;