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
import D3Card from "./plotFunctions/D3Card";
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
                <button id="nestedButton1" onClick={(e) => handleNestedButtonClick(0)}>All Drivers</button>
                <button id="nestedButton2" onClick={(e) => handleNestedButtonClick(1)}>Young Drivers</button>
            </div>
            
            <div>
            <div style={{ flex: 1, height: "300px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <StackedBarChart 
              cat="standard_driver" 
              setHoveredCountry={setHoveredCountry} 
              hoveredCountry={hoveredCountry}
              title = "Allowed promille in blood"
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
          <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} id = "wegkwaliteit">
            <Fines />   
                
              <Card style={{ backgroundColor: "lightgray", marginBottom: "0px" }}> 
                <D3Card
                hoveredCountry={hoveredCountry}
                />             
              </Card>
          </div>

      )}
      </div>
    </div>


  );

}


export default App;
