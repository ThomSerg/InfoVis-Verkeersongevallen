import React, { useState, useRef, useEffect } from "react";
import * as d3 from 'd3'
import './App.css';
import { Card, Layout, Space } from 'antd';
import BarChart from './plotFunctions/barchart';
import 'leaflet/dist/leaflet.css'
import Scatter2 from "./plotFunctions/scatter2";
import Map from "./map_europe/map"
import BarChartHorz from "./plotFunctions/barchart_horz";
import PieChart from "./plotFunctions/piechart";
import BoxPlotGraph from "./plotFunctions/BoxPlotGraph";
import { select } from "d3";


function App() {

  const [selectedButton, setSelectedButton] = useState('button1');
  const [hoveredCountry, setHoveredCountry] = useState('');
  const [selectedNestedButton, setSelectedNestedButton] = useState(null);

  function handleOuterButtonClick(id) {
    if(id =="button2"){
      setSelectedButton(id);
      setSelectedNestedButton("nestedButton1");
    }
    else{
      setSelectedButton(id);
      setSelectedNestedButton(null); 
    }
    
  }

  function handleNestedButtonClick(id) {
    setSelectedNestedButton(id);
  }

  return (
    <div className="App">

      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      ></Space>

      <h1>Verkeersongevallen in Europa</h1>

      <div class="buttonContainer" >
          <button id="button1" onClick={(e) => handleOuterButtonClick(e.target.id)}>Wegkwaliteit</button>
          <button id="button2" onClick={(e) => handleOuterButtonClick(e.target.id)}>Alchohol</button>
          <button id="button3" onClick={(e) => handleOuterButtonClick(e.target.id)}>Controles</button>
        </div>

      <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} >
        <Map setHoveredCountry={setHoveredCountry} hoveredCountry={hoveredCountry}/>
      {selectedButton === 'button1' && (
        <div class="scatterplot">
        <Scatter2 setHoveredCountry={setHoveredCountry} hoveredCountry={hoveredCountry} class="scatterplot" />
      </div>
      ) }

      {selectedButton === 'button2' && (
          <div>
            <div className="buttonContainer">
                <button id="nestedButton1" onClick={(e) => handleNestedButtonClick(e.target.id)}>Alle bestuurders</button>
                <button id="nestedButton2" onClick={(e) => handleNestedButtonClick(e.target.id)}>Jonge bestuurders</button>
            </div>
            {selectedNestedButton === 'nestedButton1' && (
              <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
                <PieChart cat="standard_driver" />
                <BoxPlotGraph cat1="standard_driver" cat2="beh_alchohol" />
                
              </div>
            )}
            {selectedNestedButton === 'nestedButton2' && (
              <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
                <PieChart cat="standard_minus_novice" />
                <BoxPlotGraph cat1="standard_minus_novice" cat2="beh_alchohol" />
              </div>
            )}
            </div>
            )}
            
              

      {selectedButton === 'button3' && (
        <div style={{ flex: 1, height: "400px", display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Scatter2 class="scatterplot" cat1="control_alchohol" cat2="beh_alchohol"/>
          <Scatter2 class="scatterplot" cat1="control_seatbelt" cat2="beh_seatbelt"/>
          <Scatter2 class="scatterplot" cat1="control_texting" cat2="beh_texting"/>
        </div>
      )}
      </div>
    </div>


  );

}


export default App;
