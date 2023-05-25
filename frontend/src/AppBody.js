import React, { useState, useRef, useEffect } from "react";
import {
  Tabs,
  Grid,
} from '@mantine/core';

import { useViewportSize } from '@mantine/hooks';

import Fines from "./pages/Fines";
import Wegkwaliteit from './pages/WegKwaliteit';
import Alcohol from './pages/Alcohol';
import EuropeMap from './pages/EuropeMap';


function AppBody({
    hoveredCountry, 
    setHoveredCountry, 
    selectedCountry, 
    setSelectedCountry,
    activeTab,
    setActiveTab
  }
  ) {

  const { height, width } = useViewportSize();
  const targetHeight = 1080,
        targetWidth = 1920;
  const scale = Math.min(height/targetHeight, width/targetWidth)

  
  return (
    <div style={{"height": "90vh !important"}}>
      <Grid>

        <Grid.Col span={4} height="10vh">
          <div style={{"height":"1.2vh"}}></div>
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

            <Tabs.Panel value="road_quality" pt="xs">
              <Wegkwaliteit 
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
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
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
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
