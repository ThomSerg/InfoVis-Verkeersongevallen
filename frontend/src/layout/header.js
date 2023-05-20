import React, { useState, useRef, useEffect } from "react";

import {
  Image,
  Grid,
  Button
} from '@mantine/core';

import { useViewportSize } from '@mantine/hooks';

//import slipping_car from '../../public/car_slipping.png'




function Header({scale, activeTab, setActiveTab}) {

  function NavigationButtons() {
    // return (
    //     <div class="buttonContainer" >
    //         <button id="button1" class="active" >Road Quality</button>
    //         <button id="button2" >Alcohol</button>
    //         <button id="button3" >Fines</button>
    //     </div>
    // )

    const refButtonRoad = useRef(null);
    const refButtonAlcohol = useRef(null);
    const refButtonFine = useRef(null);

    const refMap = new Map();
    refMap.set("road_quality", refButtonRoad)
    refMap.set("alcohol", refButtonAlcohol)
    refMap.set("fines", refButtonFine)
    

    useEffect(() => {
      Object.keys(refMap).filter((k) => k != activeTab).forEach((k) => {
        refMap.get(k).current.classList.remove("bg-purple-700")
        refMap.get(k).current.classList.add("bg-black")
      })
      refMap.get(activeTab).current.classList.add("bg-purple-700")
    }, [activeTab])

    return (
      
      <Grid grow>
        <Grid.Col span={4}>
          <Button 
            fullWidth 
            variant="filled" 
            color="blue" 
            className="bg-black hover:bg-purple-700" 
            ref={refButtonRoad}
            onClick={() => {
              setActiveTab("road_quality")
            }}
          >
            Road Quality
          </Button>
        </Grid.Col>

        <Grid.Col span={4}>
          <Button 
            fullWidth 
            variant="filled" 
            color="blue" 
            className="bg-black hover:bg-purple-700" 
            ref={refButtonAlcohol}
            onClick={() => setActiveTab("alcohol")}
          >
            Alcohol
          </Button>
        </Grid.Col>

        <Grid.Col span={4}>
          <Button 
            fullWidth
            variant="filled" 
            color="blue" 
            className="bg-black hover:bg-purple-700"  
            ref={refButtonFine}
            onClick={() => setActiveTab("fines")}
          >
            Fines
          </Button>
        </Grid.Col>
      </Grid>
    )
  }


  return (
    <div>
      <Grid grow>
        <Grid.Col span={1}>
          <Image width={80*scale} src="/car_slipping.png"></Image>
        </Grid.Col>
        <Grid.Col span={6}>
          <h1 style={{"font-size": (60*scale).toString()+"px"}}>Road accidents in Europe</h1>
        </Grid.Col>
        <Grid.Col span={4}>
          <NavigationButtons/>
        </Grid.Col>
        <Grid.Col span={1}>
          <Image height={90*scale} radius="md" src="/europe.jpg"></Image>
        </Grid.Col>


      </Grid>
      
    </div>
  )
}

export default Header