import React, { useState, useRef, useEffect } from "react";
import { Container, MantineProvider, Text } from '@mantine/core';

import Header from './layout/header'
import AppBody from './AppBody'

import './App.css';

function App() {

    const [hoveredCountry, setHoveredCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);

    console.log(selectedCountry)

    return (
        
   
        <Container fluid px={"xl"} py={"xl"}>
            {Header()}
            <AppBody 
                hoveredCountry={hoveredCountry}
                setHoveredCountry={setHoveredCountry}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
            />
        </Container>

    )

}

export default App;
