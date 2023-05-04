
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
import { select } from "d3";


function App() {

  const [selectedButton, setSelectedButton] = useState('button1');

  function handleClick(id) {
    setSelectedButton(id);
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
          <button id="button1" onClick={(e) => handleClick(e.target.id)}>Inzicht 1</button>
          <button id="button2" onClick={(e) => handleClick(e.target.id)}>Inzicht 2</button>
          <button id="button3" onClick={(e) => handleClick(e.target.id)}>Inzicht 3</button>
        </div>

      <div style={{ display: "flex", marginBottom: "20px" }} >
        <Map />
      {selectedButton === 'button1' && (
        <div class="scatterplot">
        <Scatter2 class="scatterplot" />
      </div>
      )
      
      }
      {selectedButton === 'button2' && (
        <div>
        <div style={{ flex: 1, height: "400px", display: "flex", justifyContent: "space-between", width: "100%" }}>
          <BarChartHorz />
          <PieChart />
          <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150}/>
        </div>
      </div>
      )}
      </div>

    </div>

  );

}


export default App;
