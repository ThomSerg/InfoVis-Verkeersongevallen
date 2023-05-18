import * as d3geo from 'd3-geo';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import data from '../europe_gov.csv';
import React, { useState, useRef, useEffect } from "react";
import {MapContainer, Polygon, TileLayer, useMapEvents} from 'react-leaflet'
import {landData} from './europe'



function Legend({ colorScale }) {
  const legendValues = colorScale.ticks(5);

  return (
    <div className="legend">
      <div className="legend-title">Legend</div>
      {legendValues.map((value, index) => (
        <div className="legend-item" key={index}>
          <div className="legend-color" style={{ backgroundColor: colorScale(value) }}></div>
          <div className="legend-label">{value}</div>
        </div>
      ))}
    </div>
  );
}
  
  
  function Map({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {
  
    const [hoverLock, setHoverLock] = useState(false);
  
    const [dataLoaded, setDataLoaded] = useState(false);
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
      // Read the CSV file
      d3.csv(data).then((data) => {
        const countryData = {};
        data.forEach((d) => {
          const country = d.Country;
          const cas = parseFloat(d.cas);
          if (!isNaN(cas)) {
            countryData[country] = cas;
          }
        });
        setCountryData(countryData);
        setDataLoaded(true);
      });
    }, []);


  
    const onHover=(country)=> {
      setHoveredCountry([country]);
    }
  
    function offHover() {
      setHoveredCountry([]);
    }
  
    const onClick=(country) => {
      setSelectedCountry([country])
    }
  
  
    function drawPolygon(coordinates, country) {
      let path_options;

      // Read the data
    //d3.csv(data).then(data => {
      //console.log(data)
    //const dataset = "cas"

    // Filter data to exclude empty values
    //data = data.filter(d => d[dataset] !== "");
    
      
      
      if(selectedCountry.includes(country) || hoveredCountry.includes(country)){
        path_options = {
          fillColor: selectedCountry.includes(country) ? '#bf584d' :  '#b5c2c7',
          fillOpacity: 0.7,
          weight: 2,
          opacity: 1,
          dashArray: 3,
          color: 'white',
        };
      }
      else {
        const cas = countryData[country];
        const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(Object.values(countryData))]);
        path_options = {
          fillColor: colorScale(cas),
          fillOpacity: 0.7,
          weight: 2,
          opacity: 1,
          dashArray: 3,
          color: 'white',
        };
      }
  
        
  
      return(
        <Polygon
          pathOptions={path_options}
          country={country}
          positions={coordinates}
          eventHandlers={{
            mouseover: (e) => {
              onHover(e.target.options.country);
            },
            mouseout: (e) => {
              offHover();
            },
            click: (e) => {
              onClick(e.target.options.country)
            }
          }}
        />
      )
    
  };
  
  
    const ClickLayer = () => {
      const map = useMapEvents({
        click(e) {
          if (hoveredCountry.length == 0) {
            console.log("blabla")
            setSelectedCountry([])
          }
          
        }
      })
      return <div></div>
    }
  
  
  
    return (
      <MapContainer 
        center={[55.287175894140645, 14.90326637107352]}
        dragging={false}
        zoom={3.2}
        maxZoom={3.2}
        minZoom={3.2}
        zoomControl={false}
        style={{ width: '30%', height: '65vh', background: 'lightgray', border: '1px solid #F0F0F0', borderRadius: '8px' }}
      >
        
      <ClickLayer></ClickLayer>
  
      {/* <TileLayer 
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=eSTvidUJfgEQsuinQFfC"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      /> */}
      {
        
        landData.features.map((land) => {
        
          const coordinates = land.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          if (land.geometry.type == 'MultiPolygon') {
  
            for (let i = 0; i < land.geometry.coordinates.length; i++) {
              for(let j = 0; j < land.geometry.coordinates[i].length; j++) {
                coordinates.push(land.geometry.coordinates[i][j].map((item) => [item[1], item[0]]));
              }
            }
  
          }
          let country = land.properties.NAME;
          return drawPolygon(coordinates, country)
        })
      }
      </MapContainer>
  )
    }
  
  
  
  
  
  
export default Map;


  
  






