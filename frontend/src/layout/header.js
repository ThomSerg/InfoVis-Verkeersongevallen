import React, { useState, useRef, useEffect } from "react";

import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Grid
} from '@mantine/core';





function Header() {

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
        <Grid.Col span={4} lg={4}>
          <h1 class="font-mono">Road accidents in Europe</h1>
        </Grid.Col>
        <Grid.Col span={4} offset={2}>
        </Grid.Col>

      </Grid>
      
    </div>
  )
}

export default Header