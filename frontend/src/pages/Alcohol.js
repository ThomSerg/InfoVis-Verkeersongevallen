import React, { Component, useState, useRef, useEffect } from "react";
import {
  Grid,
} from '@mantine/core';

import D3Card from "../components/D3Card";
import StackedBarChart from "../plotFunctions/StackedBarChart";
import ChartCard from "../components/ChartCard";
import ViolinGraph from "../plotFunctions/violin";
import AgeButtons from "../components/AgeButtons";
import TabHeader from "../layout/TabHeader";

function Alcohol({
    hoveredCountry,
    setHoveredCountry,
    selectedCountry,
    setSelectedCountry,
  }) {

  const [selectedNestedButton, setSelectedNestedButton] = useState("all_drivers");

  return (
    <div>
      <TabHeader >
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
            <ChartCard title={selectedNestedButton === "all_drivers" ? "Allowed promille when driving" : "Allowed promille, when driving, of a normal driver minus a novice driver"}>
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
          <ChartCard title="Drunk driving acceptance">
              <ViolinGraph 
                cat1={["standard_driver", "standard_minus_novice"]} 
                cat2={["beh_alchohol", "beh_alchohol"]} 
                xLabel={["Allowed promille (normal driver)", "Difference allowed promille (normal driver - novice driver)"]}
                yLabel={["People that drive above the limit (% in last 30 days)", "People that drive above the limit (% in last 30 days)"]}
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
                cat2_upper={[0.5, 0.5]}
                cat2_selected={selectedNestedButton}
              />
            </ChartCard>
        </Grid.Col>

        <Grid.Col span={6}>
          <ChartCard title="Casualities with respect to drink driving limits">
            <ViolinGraph 
              cat1={["standard_driver", "standard_minus_novice"]}  
              cat2={["cas", "cas_young"]} 
              xLabel={["Allowed promille (normal driver)", "Difference allowed promille (normal driver - novice driver)"]}
              yLabel={["Road fatalities (per 100000 inhabitants)", "Road fatalities (age 15-24, per 100000 inhabitants)"]}
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              setSelectedCountry={setSelectedCountry} 
              selectedCountry={selectedCountry}
              cat2_upper={[11, 11]}
              cat2_selected={selectedNestedButton}
            />
          </ChartCard>
        </Grid.Col>

      </Grid>
    </div>
  )
}

export default Alcohol;