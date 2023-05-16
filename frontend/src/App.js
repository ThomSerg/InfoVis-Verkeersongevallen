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
import ViolinGraph from "./plotFunctions/violin";
import { select } from "d3";
import Wegkwaliteit from './Wegkwaliteit/WegKwaliteit';

import StackedBarChart from "./plotFunctions/StackedBarChart";


function App() {

  const [selectedButton, setSelectedButton] = useState('button1');
  const [hoveredCountry, setHoveredCountry] = useState([]);
  const [selectedNestedButton, setSelectedNestedButton] = useState(0);

  function handleOuterButtonClick(id) {
    if(id =="button2"){
      setSelectedButton(id);
      //setSelectedNestedButton("nestedButton1");
    }
    else{
      setSelectedButton(id);
      //setSelectedNestedButton(null); 
    }
    
  }

  function handleNestedButtonClick(id) {
    setSelectedNestedButton(id);
  }
/*


/*

No idea why this doesn't work, but it doesn't.

<Card style={{  display: "flex", marginBottom: "20px",width: "100%", backgroundColor: "lightgray" }}> 
             <Map setHoveredCountry={setHoveredCountry} hoveredCountry={hoveredCountry}/>
          </Card>
*/


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
        <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} id = "wegkwaliteit">
          <Wegkwaliteit />
          
        </div>
      ) }

      {selectedButton === 'button2' && (
          <div>
            <div className="buttonContainer">
                <button id="nestedButton1" onClick={(e) => handleNestedButtonClick(0)}>Alle bestuurders</button>
                <button id="nestedButton2" onClick={(e) => handleNestedButtonClick(1)}>Jonge bestuurders</button>
            </div>
            
            <div>
            <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <StackedBarChart 
              cat="standard_driver" 
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
            />
            </div>
            <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <ViolinGraph 
              cat1="standard_driver" 
              cat2={["beh_alchohol", "standard_minus_novice"]} 
              xLabel="standard driver"
              yLabel={["beh alchohol", "standard minus novice"]}
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              cat2_upper={[0.5, 0.5]}
              cat2_selected={selectedNestedButton}
            />
            <ViolinGraph 
              cat1="standard_driver" 
              cat2={["cas", "cas_young"]} 
              xLabel="standard driver"
              yLabel={["casualties", "casualties young"]}
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              cat2_upper={[10, 10]}
              cat2_selected={selectedNestedButton}
            />
            </div>
            </div> 
           
            
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
