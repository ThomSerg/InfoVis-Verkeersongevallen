import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data2 from "../europe_gov.csv";

function D3Card({ hoveredCountry }) {
  const [countryText, setCountryText] = useState('No country hovered');

  useEffect(() => {
    if (hoveredCountry.length > 0) {
      d3.csv(data2).then(data => {
        const hoveredData = data.find(d => d.Country === hoveredCountry[0]);
        if (hoveredData) {
         console.log(hoveredData)

          const additionalData = `Speed limit highway: ${hoveredData["speed_highway"]}, Speed limit rural: ${hoveredData["speed_rural"]}, Speed limit city: ${hoveredData["speed_city"]}`;
          setCountryText(`${hoveredCountry[0]} (${additionalData})`);
        } else {
          setCountryText(hoveredCountry[0]);
        }
      });
    } else {
      setCountryText('Hover over a country to highlight their respective points on the graphs');
    }
  }, [hoveredCountry]);

  return (
    <div>
      <p>{countryText}</p>
    </div>
  );
}

export default D3Card;