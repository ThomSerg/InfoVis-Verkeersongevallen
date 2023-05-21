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

    useEffect(() => {
        if (selectedNestedButton == "all_drivers") {
            refButtonAll.current.classList.add("bg-purple-700")
            refButtonAll.current.classList.remove("bg-black")

            refButtonYoung.current.classList.remove("bg-purple-700")
            refButtonYoung.current.classList.add("bg-black")
        } else if (selectedNestedButton == "young_drivers") {
            refButtonAll.current.classList.remove("bg-purple-700")
            refButtonAll.current.classList.add("bg-black")

            refButtonYoung.current.classList.add("bg-purple-700")
            refButtonYoung.current.classList.remove("bg-black")
        }
    }, [selectedNestedButton])

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