import React, { Component, useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import Scatter2 from "../plotFunctions/scatter2";
import BoxPlotGraph from "../plotFunctions/BoxPlotGraph";
import Map from "../map_europe/map"
import { Card, Layout, Space } from 'antd';


function Wegkwaliteit({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {
    

    return (
      <div >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginLeft: "10px", marginRight: "0px" }}>
        <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
          <Scatter2 cat1="RoadQuality" cat2="cas" varXAxis='Wegkwaliteit (score op 7)' varYaxis='Verkeersdoden (per 100000 inwoners)' title='Wegkwaliteit Europa' setHoveredCountry={setHoveredCountry} hoveredCountry={hoveredCountry} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
        </Card>
        <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
          <Scatter2 cat1="RoadQuality" cat2="log(GDP(2019))" varXAxis='Wegkwaliteit (score op 7)' varYaxis='log(GDP) (€)' title='GDP Europa' setHoveredCountry={setHoveredCountry} hoveredCountry={hoveredCountry} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
        </Card>
        <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
          <Scatter2 cat1="Invest per capita" cat2="cas" varXAxis='Geïnvesteerd per capita (€ per inwoner)' varYaxis='Verkeersdoden (per 100000 inwoners)' title='Investering in wegen Europa' setHoveredCountry={setHoveredCountry} hoveredCountry={hoveredCountry} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
        </Card>
        </div>

      </div>
    );
  }

export default Wegkwaliteit;
