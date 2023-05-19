import React, { useState, useRef, useEffect } from "react";
import {MapContainer, Polygon, TileLayer, useMapEvents} from 'react-leaflet'
import {landData} from './europe'


function Map({setHoveredCountry, hoveredCountry, setSelectedCountry, selectedCountry}) {

  const [hoverLock, setHoverLock] = useState(false);


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
    selectedCountry.includes(country) ? 
      path_options = {
        fillColor: '#bf584d',
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white',
      } :
    hoveredCountry.includes(country) ? 
      path_options = {
        fillColor: '#b5c2c7',
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white',
      } :
      path_options = {
        fillColor: '#9d7463',
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: 'white',
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
  }

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
      style={{ width: '100%', height: '65vh', background: 'lightgray', border: '1px solid #F0F0F0', borderRadius: '8px' }}
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