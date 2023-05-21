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
  Grid,
  Button
} from '@mantine/core';
//import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';

import Header from './layout/header'

import Map from "./map_europe/map"
import MapD3 from "./map_europe/mapD3"
import Fines from "./pages/Fines";
import Wegkwaliteit from './pages/WegKwaliteit';
import Alcohol from './pages/Alcohol';
import EuropeMap from './pages/EuropeMap';
import TabHeader from "./plotFunctions/TabHeader";


function AppBody({
    hoveredCountry, 
    setHoveredCountry, 
    selectedCountry, 
    setSelectedCountry,
    activeTab,
    setActiveTab
    //scale  
  }
  ) {

  console.log(selectedCountry)

  const { height, width } = useViewportSize();
  const targetHeight = 1080,
        targetWidth = 1920;
  const scale = Math.min(height/targetHeight, width/targetWidth)

  
  return (
    <div style={{"height": "90vh !important"}}>
      <Grid>

        <Grid.Col span={4} height="10vh">
          <EuropeMap
            setHoveredCountry={setHoveredCountry} 
            hoveredCountry={hoveredCountry}
            setSelectedCountry={setSelectedCountry} 
            selectedCountry={selectedCountry}
            scale={scale}
          />
          
        </Grid.Col>

        <Grid.Col span={8}>
          <div>
          <Tabs variant="pills"  value={activeTab} onTabChange={setActiveTab}>

            {/* <Tabs.List>
              <Tabs.Tab value="road_quality">Road Quality</Tabs.Tab>
              <Tabs.Tab value="alcohol">Alcohol</Tabs.Tab>
              <Tabs.Tab value="fines">Fines</Tabs.Tab>
            </Tabs.List> */}

            <Tabs.Panel value="road_quality" pt="xs">
          
              <Wegkwaliteit 
                hoveredCountry={hoveredCountry}
                scale={scale}
              />
               
            </Tabs.Panel>

            <Tabs.Panel value="alcohol" pt="xs">

              
              <Alcohol
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
                scale={scale}
              />
            </Tabs.Panel>

            <Tabs.Panel value="fines" pt="xs">
              
              <Fines 
                hoveredCountry={hoveredCountry}
                scale={scale}
              /> 
            </Tabs.Panel>

          </Tabs>
          </div>
        </Grid.Col>

      </Grid>
      </div>

      
        
 
  )
    

}

export default AppBody;
