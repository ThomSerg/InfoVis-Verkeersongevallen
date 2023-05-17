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
import Fines from "./Wegkwaliteit/Fines";

import StackedBarChart from "./plotFunctions/StackedBarChart";


function App() {

  const [selectedButton, setSelectedButton] = useState('button1');
  const [hoveredCountry, setHoveredCountry] = useState([]);
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

      <h1>Road accidents in Europe</h1>

      <div class="buttonContainer" >
          <button id="button1" onClick={(e) => handleOuterButtonClick(e.target.id)}>Road Quality</button>
          <button id="button2" onClick={(e) => handleOuterButtonClick(e.target.id)}>Alcohol</button>
          <button id="button3" onClick={(e) => handleOuterButtonClick(e.target.id)}>Fines</button>
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
                <button id="nestedButton1" onClick={(e) => handleNestedButtonClick(e.target.id)}>Alle bestuurders</button>
                <button id="nestedButton2" onClick={(e) => handleNestedButtonClick(e.target.id)}>Jonge bestuurders</button>
            </div>
            {selectedNestedButton === 'nestedButton1' && (  
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
                cat2="beh_alchohol" 
                xLabel="standard driver"
                yLabel="beh alchohol"
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
              />
              </div>
              </div> 
            )}
            {selectedNestedButton === 'nestedButton2' && (
              <div>
              <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
                
                <StackedBarChart 
                  cat="standard_minus_novice" 
                  setHoveredCountry={setHoveredCountry} 
                  hoveredCountry={hoveredCountry}
                />
              </div>
              <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
              <ViolinGraph 
                  cat1="standard_minus_novice" 
                  cat2="beh_alchohol" 
                  xLabel="standard minus novice" 
                  yLabel="beh alchohol" 
                  setHoveredCountry={setHoveredCountry} 
                  hoveredCountry={hoveredCountry}
                />
              </div>
              </div>           
            )}
            </div>
            )}
            
              

      {selectedButton === 'button3' && (
        <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} id = "wegkwaliteit">
        <Fines />
        
      </div>
      )}
      </div>
    </div>


  );

}


export default App;
