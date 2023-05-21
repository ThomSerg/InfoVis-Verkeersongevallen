import React, { useState, useRef, useEffect } from "react";

import {
  Image,
  Grid,
  Button
} from '@mantine/core';


function AgeButtons({selectedNestedButton, setSelectedNestedButton}) {

    const refButtonAll = useRef(null);
    const refButtonYoung = useRef(null);

    // if(cat2_selected === "nestedButton1") {

    return (

        <div>

            <div style={{"float": "left"}}>
                <Button
                    fullWidth 
                    variant="filled" 
                    color="blue" 
                    className="bg-black hover:bg-purple-700" 
                    ref={refButtonAll}
                    onClick={() => {
                        setSelectedNestedButton("all_drivers")
                    }}
                >
                    All Drivers
                </Button>
            </div>

            <div style={{"float": "left"}}>
                <Button
                    fullWidth 
                    variant="filled" 
                    color="blue" 
                    className="bg-black hover:bg-purple-700" 
                    ref={refButtonYoung}
                    onClick={() => {
                        setSelectedNestedButton("young_drivers")
                    }}
                >
                    Young Drivers
                </Button>
            </div>

        </div>

    )
}

export default AgeButtons;