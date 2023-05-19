import React, { useState, useRef, useEffect } from "react";
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
//import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

import Header from './layout/header'

import Map from "./map_europe/map"
import MapD3 from "./map_europe/mapD3"
import Fines from "./pages/Fines";
import Wegkwaliteit from './pages/WegKwaliteit';
import Alcohol from './pages/Alcohol';
import EuropeMap from './pages/EuropeMap';


function AppBody({
    hoveredCountry, 
    setHoveredCountry, 
    selectedCountry, 
    setSelectedCountry}
  ) {

  console.log(selectedCountry)

  
  return (
    <div>
      
      <Grid>

        <Grid.Col span={4} lg={4}>
          <EuropeMap
            setHoveredCountry={setHoveredCountry} 
            hoveredCountry={hoveredCountry}
            setSelectedCountry={setSelectedCountry} 
            selectedCountry={selectedCountry}
          />
        </Grid.Col>

        <Grid.Col span="auto">
          <Tabs variant="pills" defaultValue="road_quality">

            <Tabs.List>
              <Tabs.Tab value="road_quality">Road Quality</Tabs.Tab>
              <Tabs.Tab value="alcohol">Alcohol</Tabs.Tab>
              <Tabs.Tab value="fines">Fines</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="road_quality" pt="xs">
              <Wegkwaliteit hoveredCountry={hoveredCountry}/>
            </Tabs.Panel>

            <Tabs.Panel value="alcohol" pt="xs">
              <Alcohol
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
              />
            </Tabs.Panel>

            <Tabs.Panel value="fines" pt="xs">
              <Fines hoveredCountry={hoveredCountry}/> 
            </Tabs.Panel>

          </Tabs>
        </Grid.Col>

      </Grid>

      
        
    </div>
  )
    

}

export default AppBody;
