import React from 'react';
import { Card, Layout, Space } from 'antd';

import './ChartCard.css'

function ChartCard({children, title="Unknown title"}) {
    //style={{ width: width }}
    const width = 300

    return (
        <div>
        <Card className="card"> 
          
            <div className="chartTitle">{title}</div> 
            <div ></div>
            {children}

        </Card>
        </div>
      );
}

export default ChartCard;