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

import ChartCard from "../plotFunctions/ChartCard";

import Map from "../map_europe/map"
import MapD3 from "../map_europe/mapD3"

function EuropeMap({
    hoveredCountry,
    setHoveredCountry,
    selectedCountry,
    setSelectedCountry,
  }) {


    return (

      <ChartCard title="">
        <MapD3 
          setHoveredCountry={setHoveredCountry} 
          hoveredCountry={hoveredCountry}
          setSelectedCountry={setSelectedCountry} 
          selectedCountry={selectedCountry}
        />
      </ChartCard>

    )
  }

export default EuropeMap;










