import { useEffect, useRef } from 'react';
import * as d3 from 'd3-geo';
import { select } from 'd3-selection';
import { landData } from './europe';
import data from '../europe_gov.csv';
import {MapContainer, Polygon, TileLayer} from 'react-leaflet'


/*
function Map({ setHoveredCountry, hoveredCountry }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const svg = select(mapRef.current);

    const width = 500; // Example width value
    const height = 400; // Example height value

    const projection = d3.geoMercator()
      .fitSize([width, height], landData);

    const onHover=(country)=> {
      setHoveredCountry([country]);
    }

    function offHover() {
      setHoveredCountry("");
    }
    

    const path = d3.geoPath().projection(projection);

    svg.selectAll("path")
      .data(landData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", d => {
        const country = d.properties.NAME;
        let color;
        if (country.startsWith("S")) {
          color = "green";
        } else {
          color = hoveredCountry.includes(country) ? "#b5c2c7" : "#9d7463";
        }
        return color;
      })
      .style("fill-opacity", 0.7)
      .style("stroke", "white")
      .style("stroke-width", 1)
      //.style("stroke-dasharray", 3)
      .on("mouseover", (e, d) => {
        const country = d.properties.NAME;
        onHover(country);
        select(e.target)
          .style("fill", "#b5c2c7")
          //.style("stroke-dasharray", "")
          //.style("stroke-width", 2);
      })
      .on("mouseout", (e, d) => {
        offHover();
        select(e.target)
          .style("fill-opacity", 0.7)
          //.style("stroke-dasharray", "3")
          .style("stroke-width", 1)
          .style("fill", d => {
            const country = d.properties.NAME;
            return hoveredCountry.includes(country) ? "#b5c2c7" : "#9d7463";
          });
      });

  }, [hoveredCountry]);

  return (
    <svg
      ref={mapRef}
      style={{
        width: '30%',
        height: '65vh',
        background: 'lightgray',
        border: '1px solid #F0F0F0',
        borderRadius: '8px'
      }}
    />
  );
}
*/

//export default Map;


function Map({setHoveredCountry, hoveredCountry}) {

  const countryNames = landData.features.map(land => land.properties.NAME);
  console.log("Country names are: " + countryNames);

  const onHover=(country)=> {
    setHoveredCountry([country]);
  }
    return (<MapContainer 
        center={[55.287175894140645, 14.90326637107352]}
        dragging={false}
        zoom={3.2}
        maxZoom={3.2}
        minZoom={3.2}
        zoomControl={false}
        style={{ width: '30%', height: '65vh', background: 'lightgray', border: '1px solid #F0F0F0', borderRadius: '8px' }}>
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

function offHover() {
  setHoveredCountry("");
}

function drawPolygon(coordinates, country) {
  let color;
  if (country.startsWith("S")) {
    color = "green"; // Set green color for countries starting with "S"
  } else {
    color = hoveredCountry.includes(country) ? "#b5c2c7" : "#9d7463";
  }

  return (
    <Polygon
      pathOptions={{
        fillColor: color,
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        dashArray: 3,
        color: "white",
      }}
      country={country}
      positions={coordinates}
      eventHandlers={{
        mouseover: (e) => {
          onHover(e.target.options.country);
          const layer = e.target;
          layer.setStyle({
            dashArray: "",
            fillColor: "#b5c2c7",
            fillOpacity: 0.7,
            weight: 2,
            opacity: 1,
            color: "white",
          });
        },
        mouseout: (e) => {
          offHover();
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 2,
            dashArray: "3",
            color: "white",
            fillColor: "#9d7463",
          });
        },
        click: (e) => {},
      }}
    />
  );
}

}


export default Map;