import React, { useState, useRef, useEffect, useMemo } from "react";
import { Container, MantineProvider, Text, AspectRatio } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import Header from './layout/header'
import AppBody from './AppBody'

import {FitToViewport} from "react-fit-to-viewport"

import './App.css';

function App() {

    const [hoveredCountry, setHoveredCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);

    const [activeTab, setActiveTab] = useState('road_quality');

    const { height, width } = useViewportSize();
    const targetHeight = 1080,
            targetWidth = 1920;
    const scale = Math.min(height/targetHeight, width/targetWidth)

    // Memoize the Header component to prevent unnecessary re-renders
    const MemoizedHeader = useMemo(
        () => (
        <Header
            scale={scale}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
        ),
        [scale, activeTab]
    );

    // Rest of the code

    return (
        <div>
        {MemoizedHeader}
        {<div>

       <div class="viewp" style={{"height": "90vh"}}>
           <FitToViewport width={targetWidth} height={targetHeight} minZoom={0} maxZoom={10} style={{ overflow: 'hidden' }}>
           
               <AppBody 
                   hoveredCountry={hoveredCountry}
                   setHoveredCountry={setHoveredCountry}
                   selectedCountry={selectedCountry}
                   setSelectedCountry={setSelectedCountry}
                   activeTab={activeTab}
                   setActiveTab={setActiveTab}

               />

               
           </FitToViewport>
       </div>

   </div>}
        </div>
    );

    return (
        
        <div>
       
            <Header
                scale={scale}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div class="viewp" style={{"height": "90vh"}}>
                <FitToViewport width={targetWidth} height={targetHeight} minZoom={0} maxZoom={10} style={{ overflow: 'hidden' }}>
                
                    <AppBody 
                        hoveredCountry={hoveredCountry}
                        setHoveredCountry={setHoveredCountry}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}

                    />

                    
                </FitToViewport>
            </div>

        </div>


    )

}

export default App;
