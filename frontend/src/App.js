
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

function App() {

  /*const [data] = useState([25, 50, 35, 15, 94, 10]);

  const charts = [];

  // Create an array of BarChart components with the same data
  for (let i = 0; i < 8; i++) {
    charts.push(<BarChart key={i} data={data} />);
  }
  

  return (
    <div className="App">
      <div className="row">{charts.slice(0, 4)}</div>
      <div className="row">{charts.slice(4, 8)}</div>
    </div>
  );*/
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

  //TODO relatieve groottes   <Card style={{ flex: 1, height: "300px", backgroundColor: "lightgray", marginLeft: "10px", marginRight: "10px" }}> cool </Card>
  return (
    <div className="App">

      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      ></Space>

      <h1>Verkeersongevallen in België</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }} >
        {/* <div style={{ flex: 1.2, flexDirection: "column", height: "800px", marginLeft: "10px", marginRight: "10px", display: "flex", justifyContent: "space-between" }}>
          <Card style={{ flex: 2, height: "550px", backgroundColor: "lightgray", marginBottom: "20px" }}>
            <img src={belgie} alt="" style={{ height: "500px" }}></img>
          </Card>

          <div style={{ flex: 1, height: "230px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Card style={{ flex: 1, height: "230px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={400} height={175} />
            </Card>
            <Card style={{ flex: 1, height: "230px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={400} height={175} />
            </Card>
          </div>
        </div> */}
        {/*<div style={{ flex: 1.2, flexDirection: "column", height: "800px", marginLeft: "10px", marginRight: "10px", display: "flex", justifyContent: "space-between" }}>
          <Card style={{ flex: 2, height: "550px", backgroundColor: "lightgray", marginBottom: "20px" }}>
            <img src={belgie} alt="" style={{ height: "500px" }}></img>
          </Card>
        </div>
        <div style={{ flex: 1, flexDirection: "column", height: "800px", marginLeft: "10px", marginRight: "10px", display: "flex", justifyContent: "space-between" }}>
            <Card style={{ flex: 1, height: "550px", backgroundColor: "lightgray", marginBottom: "20px" }}>
              <Scatter2  />
            </Card>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }} >
      <div style={{ flex: 1, height: "230px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Card style={{ flex: 1, height: "550px", backgroundColor: "lightgray" }}>
              <LineChart />
            </Card>
          </div>
      </div>
    </div>
        */}

        
        <MapContainer
          center={[47.931044594186, 10.368814770567818]}
          zoom={5}
          style={{ width: '100vw', height: '100vh'}}>
        <TileLayer 
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=eSTvidUJfgEQsuinQFfC"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {
          landData.features.map((land) => {
            

            const coordinates = land.geometry.coordinates[0].map((item) => [item[1], item[0]]);

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

        

        {/* <div style={{ flex: 1, flexDirection: "column", height: "800px", marginLeft: "10px", marginRight: "10px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, height: "200px", display: "flex", justifyContent: "space-between" }}>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
          </div>
          <div style={{ flex: 1, height: "200px", display: "flex", justifyContent: "space-between" }}>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
          </div>
          <div style={{ flex: 1, height: "200px", display: "flex", justifyContent: "space-between" }}>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
          </div>
          <div style={{ flex: 1, height: "200px", display: "flex", justifyContent: "space-between" }}>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
            <Card style={{ flex: 1, height: "200px", backgroundColor: "lightgray" }}>
              <BarChart data={[25, 50, 35, 15, 94, 10]} width={300} height={150} />
            </Card>
          </div> */}
        {/* </div> */}

      </div>




    </div>
  );





}

function fetchJSON(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    });
}


export default App;
