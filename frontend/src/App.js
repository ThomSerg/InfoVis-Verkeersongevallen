
import React, { useState, useRef, useEffect } from "react";
import * as d3 from 'd3'
import './App.css';
import { Card, Layout, Space } from 'antd';
import BarChart from './plotFunctions/barchart';
import 'leaflet/dist/leaflet.css'
import LineChart from "./plotFunctions/linechart";
import Scatter2 from "./plotFunctions/scatter2";
import Map from "./map_europe/map"


function App() {

  const { Header, Footer, Sider, Content } = Layout;
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };


  // const landData = fetchJSON('./europe')

  // const data = JSON.parse(require('./geo_europe'));



  // flex duidt de relatieve grootte aan van de elementen, de container gaat proberen de elementen even groot te maken
  // Een hogere flex waarde tegenover de andere gaat dus meer ruimte innemen

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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }} >
      
        <Map />

        <div class="scatterplot">
          <Scatter2 class="scatterplot" />
        </div>
      </div>
      <div style={{ flex: 1, height: "230px", display: "flex", justifyContent: "space-between", width: "100%" }}>
          <LineChart />
      </div>
    </div>

  );

}


export default App;
