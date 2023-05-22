import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data2 from "../europe_gov.csv";

function D3Card({ hoveredCountry }) {
  const [countryText, setCountryText] = useState('No country hovered');


  const [data, setData] = useState(null);

  d3.csv(data2).then(d => { 
    setData(d);
  })

  useEffect(() => {
    if (hoveredCountry.length == 1) {
        const hoveredData = data.find(d => d.Country === hoveredCountry[0]);
        if (hoveredData) {
         console.log(hoveredData)
         const population = parseInt(hoveredData["pop"]);
         const formattedPopulation = population.toLocaleString();

         const area = parseInt(hoveredData["area_km2"]);
         const formattedArea = area.toLocaleString();

         const oppData = <span><strong>Surface of the country:</strong> {formattedArea} km2</span>;
         const bewData = <span><strong>Citizens:</strong> {formattedPopulation}</span>;
         const highwayData = <span><strong>Speed limit highway:</strong> {hoveredData["speed_highway"]} km/h</span>;
         const ruralData = <span><strong>Speed limit rural:</strong> {hoveredData["speed_rural"]} km/h</span>;
         const cityData = <span><strong>Speed limit city:</strong> {hoveredData["speed_city"]} km/h</span>;

          
          
          setCountryText(
            <>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{hoveredCountry[0]}</span>
            <br />
            <br /> {/* Empty line */}
            <span style={{fontSize: '14px' }}>{oppData}</span>
            <br />
            <span style={{fontSize: '14px' }}>{bewData}</span>
            <br />
            <span style={{fontSize: '14px' }}>{highwayData}</span>
            <br />
            <span style={{fontSize: '14px' }}>{ruralData}</span>
            <br />
            <span style={{fontSize: '14px' }}>{cityData}</span>
            <br />
          </>
          );
        } 
          else {
          setCountryText(hoveredCountry[0]);
        }
    } else {
      setCountryText('Hover over a country to highlight their respective points on the graphs. You can also select a country by clicking and then compare with another country by hovering.');
    }
  }, [hoveredCountry]);

  return (
    <div>
      <p>{countryText}</p>
    </div>
  );
}

export default D3Card;