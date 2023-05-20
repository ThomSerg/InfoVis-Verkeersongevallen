import * as d3geo from 'd3-geo';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import data from '../europe_gov.csv';
import React, { useState, useRef, useEffect } from "react";
import {MapContainer, Polygon, TileLayer, useMapEvents} from 'react-leaflet'
import {landData} from './europe'
import './map.css';



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

  function Legend({ colorScale }) {
  const gradientColors = [];
  const numColors = 20;

  const xMin = 0;
  const xMax = d3.max(Object.values(countryData));

  const x = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([0, 200]); // Adjust the range as per your needs

  const xAxis = d3.axisBottom(x); // Create the x-axis

  for (let i = 0; i < numColors; i++) {
    const color = colorScale((i / (numColors - 1)) * colorScale.domain()[1]);
    gradientColors.push(color);
  }

  return (
    <div className="legend" style={{ width: '100%', height: '200px' }}>
      <div className="legend-title" style={{ marginTop: '20px', marginBottom: '10px' }}>
        Legend
      </div>
      <div className="legend-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="100%" height="50">
          <g transform="translate(0,30)" ref={node => d3.select(node).call(xAxis)} /> {/* Render the x-axis */}
        </svg>
      </div>
      <div
        className="legend-gradient"
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColors.join(',')})`,
          width: '80%',
          height: '20px',
        }}
      />
    </div>
  );
}
  

  const onHover=(country) => {
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
            console.log("hover")
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
    <div style={{ height: '100vh', width: '100vh' }}>
      <div style={{ width: '70%', height: '65vh' }}>
        <MapContainer
          center={[55.287175894140645, 14.90326637107352]}
          dragging={false}
          zoom={3.2}
          maxZoom={3.2}
          minZoom={3.2}
          zoomControl={false}
          style={{ width: '100%', height: '100%', background: 'lightgray', border: '1px solid #F0F0F0', borderRadius: '8px' }}
        >
          {landData.features.map((land) => {
            const coordinates = land.geometry.coordinates[0].map((item) => [item[1], item[0]]);
            if (land.geometry.type === 'MultiPolygon') {
              for (let i = 0; i < land.geometry.coordinates.length; i++) {
                for (let j = 0; j < land.geometry.coordinates[i].length; j++) {
                  coordinates.push(land.geometry.coordinates[i][j].map((item) => [item[1], item[0]]));
                }
              }
            }
            let country = land.properties.NAME;
            return drawPolygon(coordinates, country);
          })}
  
          {dataLoaded && (
            <Legend colorScale={d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(Object.values(countryData))])} />
          )}
        </MapContainer>
      </div>
    </div>
  );
  
  
}

export default Map;
