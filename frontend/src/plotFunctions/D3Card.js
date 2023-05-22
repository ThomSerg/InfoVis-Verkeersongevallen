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

          const oppData = `Surface of the country: ${formattedArea} km2`;
          const bewData = `Citizens: ${formattedPopulation}`;
          const gdpData = `GDP: ${hoveredData["speed_city"]}`;
          const highwayData = `Speed limit highway: ${hoveredData["speed_highway"]} km/h`;
          const ruralData = `Speed limit rural: ${hoveredData["speed_rural"]} km/h`;
          const cityData = `Speed limit city: ${hoveredData["speed_city"]} km/h`;

          
          
          setCountryText(
            <>
              <span>{hoveredCountry[0]}</span>
              <br />
              <span>{oppData}</span>
              <br />
              <span>{bewData}</span>
              <br />
              <span>{highwayData}</span>
              <br />
              <span>{ruralData}</span>
              <br />
              <span>{cityData}</span>
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