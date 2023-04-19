
import React, { useState, useRef, useEffect } from "react";
import * as d3 from 'd3'
import './App.css';
import { Card, Layout, Space } from 'antd';
import BarChart from './plotFunctions/barchart';
import belgie from './images/belgium.png'
import {MapContainer, Polygon, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {landData} from './europe'
import LineChart from "./plotFunctions/linechart";
import Scatter2 from "./plotFunctions/scatter2";
import { Canvas, canvas } from "leaflet";


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
      <MapContainer 
          center={[51.91803195062262, 14.706545280906075]}
          dragging={false}
          zoom={3.5}
          maxZoom={3.5}
          minZoom={3.5}
          zoomControl={false}
          style={{ width: '50%', height: '65vh'}}>
        <TileLayer 
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=eSTvidUJfgEQsuinQFfC"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {
          
          landData.features.map((land) => {

            
            const coordinates = land.geometry.coordinates[0].map((item) => [item[1], item[0]]);
            if (land.geometry.type == 'MultiPolygon') {
              console.log(land.properties.NAME)
            } 

            return(<Polygon
              pathOptions={{
                fillColor: '#FD8D3C',
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: 'white'
              }}
              positions={coordinates}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    dashArray: "",
                    fillColor: "#BD0026",
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    color: "white",
                  })
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 2,
                    dashArray: "3",
                    color: 'white',
                    fillColor: '#FD8D3C'
                  });
                },
                click: (e) => {
  
                }
              }}
            />)
          })
        }
        </MapContainer>

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
