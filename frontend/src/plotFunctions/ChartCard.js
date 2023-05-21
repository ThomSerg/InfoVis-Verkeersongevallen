import React from 'react';
import { Card, Layout, Space } from 'antd';

import { Grid, Container } from '@mantine/core';

import './ChartCard.css'

function ChartCard({children, title="Unknown title"}) {
    //style={{ width: width }}
    const width = 300

    return (

        <Card className="card"> 
            <div className="chartTitle">{title}</div> 
            <div >
                {children}
            </div>

        </Card>
   
      );
}

export default ChartCard;