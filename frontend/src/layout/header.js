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
        <Grid.Col span={4} lg={4}>1</Grid.Col>
        <Grid.Col span={4} offset={2}>
          <NavigationButtons/>
        </Grid.Col>

      </Grid>
      
      {/* <Container>
          <Tabs
            defaultValue="Home"
            variant="pills">
            
            <Tabs.List>
              <Tabs.Tab value="a">a</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="a">
              a
            </Tabs.Panel>
          </Tabs>
          
      </Container> */}
    </div>
  )
}

export default Header