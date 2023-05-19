import React, { useState, useRef, useEffect } from "react";

import {
  Image,
  Grid,
} from '@mantine/core';

import { useViewportSize } from '@mantine/hooks';

//import slipping_car from '../../public/car_slipping.png'




function Header({scale}) {

  function NavigationButtons() {
    return (
        <div class="buttonContainer" >
            <button id="button1" class="active" >Road Quality</button>
            <button id="button2" >Alcohol</button>
            <button id="button3" >Fines</button>
        </div>
    )
  }


  return (
    <div>
      <Grid grow>
        <Grid.Col span={1}>
          <Image width={80*scale} src="/car_slipping.png"></Image>
        </Grid.Col>
        <Grid.Col span={10}>
          <h1 style={{"font-size": (60*scale).toString()+"px"}}>Road accidents in Europe</h1>
        </Grid.Col>
        <Grid.Col span={1}>
          <Image height={90*scale} radius="md" src="/europe.jpg"></Image>
        </Grid.Col>


      </Grid>
      
    </div>
  )
}

export default Header