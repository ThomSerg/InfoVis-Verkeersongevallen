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
import ChartCard from "./plotFunctions/ChartCard";


function App() {

  const [selectedButton, setSelectedButton] = useState('button1');
  const [hoveredCountry, setHoveredCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedNestedButton, setSelectedNestedButton] = useState("nestedButton1");

  function handleOuterButtonClick(event, id) {

    // Get the button container of the clicked button
    const buttonContainer = event.target.parentNode;

    // Remove the 'active' class from all buttons within the container
    const buttons = buttonContainer.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the clicked button
    const clickedButton = document.getElementById(id);
    clickedButton.classList.add('active');

    console.log("Clicked button is " + clickedButton.id);

    if(id =="button2"){
      setSelectedButton(id);
      //setSelectedNestedButton("nestedButton1");
    }
    else{
      setSelectedButton(id);
      //setSelectedNestedButton(null); 
    }
    
  }

  function handleNestedButtonClick(event,id) {

    // Get the button container of the clicked button
    const buttonContainer = event.target.parentNode;

    // Remove the 'active' class from all buttons within the container
    const buttons = buttonContainer.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the clicked button
    const clickedButton = document.getElementById(id);
    clickedButton.classList.add('active');

    console.log("Clicked button is " + clickedButton.id);

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
        <button id="button1" class="active" onClick={(e) => handleOuterButtonClick(e, e.target.id)}>Road Quality</button>
        <button id="button2" onClick={(e) => handleOuterButtonClick(e, e.target.id)}>Alcohol</button>
        <button id="button3" onClick={(e) => handleOuterButtonClick(e, e.target.id)}>Fines</button>
    </div>


      <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} >
        <Map 
          setHoveredCountry={setHoveredCountry} 
          hoveredCountry={hoveredCountry}
          setSelectedCountry={setSelectedCountry} 
          selectedCountry={selectedCountry}
        />

        
      {selectedButton === 'button1' && (
        <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} id = "wegkwaliteit">
          <Wegkwaliteit />
          
        </div>
      ) }

      {selectedButton === 'button2' && (
          <div>
            <div className="buttonContainer">
                <button id="nestedButton1" class="active" onClick={(e) => handleNestedButtonClick(e,e.target.id)}>All Drivers</button>
                <button id="nestedButton2" onClick={(e) => handleNestedButtonClick(e,e.target.id)}>Young Drivers</button>
            </div>
            
            <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginLeft: "10px", marginRight: "0px" }}>            
            <ChartCard title="Allowed promille when driving" > 
              <D3Card
                hoveredCountry={hoveredCountry}
              />  
            </ChartCard>
            <ChartCard title="Allowed promille when driving" > 
              <StackedBarChart 
                cat="standard_driver" 
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                title = "Allowed promille in blood"
              />
            </ChartCard>
            <ChartCard title="Drink driving acceptance">
              <ViolinGraph 
                cat1="standard_driver" 
                cat2={["beh_alchohol", "standard_minus_novice"]} 
                xLabel="standard driver"
                yLabel={["beh alchohol", "standard minus novice"]}
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
                cat2_upper={[0.5, 0.5]}
                cat2_selected={selectedNestedButton}
                xLabelElement={"Max promille"}
                yLabelElement={"Acceptance of drunk driving"}
              />
            </ChartCard>
            <ChartCard title="Casualities with respect to drink driving limits">
              <ViolinGraph 
                cat1="standard_driver" 
                cat2={["cas", "cas_young"]} 
                xLabel="standard driver"
                yLabel={["casualties", "casualties young"]}
                setHoveredCountry={setHoveredCountry} 
                hoveredCountry={hoveredCountry}
                setSelectedCountry={setSelectedCountry} 
                selectedCountry={selectedCountry}
                cat2_upper={[10, 10]}
                cat2_selected={selectedNestedButton}
                xLabelElement={"Max promille"}
                yLabelElement={"Casualties young drivers"}
              />
            </ChartCard>
            </div>
            </div> 
           
            
            </div>
            )}
            
              

      {selectedButton === 'button3' && (
          <div style={{ display: "flex", marginBottom: "20px",width: "100%" }} id = "wegkwaliteit">
            <Fines />      
            <ChartCard title="Information" > 
              <D3Card
                hoveredCountry={hoveredCountry}
              />  
            </ChartCard> 
          </div>

      )}
      </div>
    </div>


  );

}


export default App;
