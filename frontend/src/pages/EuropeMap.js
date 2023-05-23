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
  Grid,
  Card
} from '@mantine/core';

//import { Card, Layout, Space } from 'antd';
import ChartCard from "../plotFunctions/ChartCard";

import Map from "../map_europe/map"
import MapD3 from "../map_europe/mapD3"
import TabHeader from "../plotFunctions/TabHeader";

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










