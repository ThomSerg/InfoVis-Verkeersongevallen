import React, { useState, useRef, useEffect } from "react";

import {
  Image,
  Grid,
  Button,
  Container
} from '@mantine/core';

function TabHeader({title, children}) {

    return (
        <div style={{"height":"8vh"}}>
        <Grid>

            <Grid.Col span={6}>  
                {title}
            </Grid.Col>
            
            <Grid.Col span={6}>  
                {children}
            </Grid.Col>

      </Grid>
      </div>
    )
}

export default TabHeader;