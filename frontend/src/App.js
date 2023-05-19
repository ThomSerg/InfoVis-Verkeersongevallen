import React, { useState, useRef, useEffect } from "react";
import { Container, MantineProvider, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import Header from './layout/header'
import AppBody from './AppBody'

import './App.css';

function App() {

    const [hoveredCountry, setHoveredCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);

    console.log(selectedCountry)

    const { height, width } = useViewportSize();
    const targetHeight = 1080,
            targetWidth = 1920;
    console.log("WH")
    console.log(width)
    console.log(height)
    const scale = Math.min(height/targetHeight, width/targetWidth)

    return (
     
        <div style={{ "padding": "2% 2% 2% 2%"}}>
            <Header
                scale={scale}
            />
            <AppBody 
                hoveredCountry={hoveredCountry}
                setHoveredCountry={setHoveredCountry}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
            />
        </div>


    )

}

export default App;
