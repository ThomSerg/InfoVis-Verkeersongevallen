import React, { Component, useState, useRef, useEffect } from "react";
import {
  Grid
} from '@mantine/core';

import ChartCard from "../components/ChartCard";

import MapD3 from "../plotFunctions/map_europe/mapD3"
import TabHeader from "../layout/TabHeader";

function EuropeMap({
    hoveredCountry,
    setHoveredCountry,
    selectedCountry,
    setSelectedCountry,
  }) {


    return (
      <div>
        <TabHeader></TabHeader>
        <Grid>
            <Grid.Col span={12}>
              <ChartCard title="">
                <MapD3 
                  setHoveredCountry={setHoveredCountry} 
                  hoveredCountry={hoveredCountry}
                  setSelectedCountry={setSelectedCountry} 
                  selectedCountry={selectedCountry}
                />
              </ChartCard>
            </Grid.Col>
          </Grid>
      </div>
    )
  }

export default EuropeMap;










