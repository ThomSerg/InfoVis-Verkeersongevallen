import React, { Component } from 'react';
import * as d3 from 'd3';
import Scatter2 from "../plotFunctions/scatter2";
import BoxPlotGraph from "../plotFunctions/BoxPlotGraph";


class Wegkwaliteit extends Component {

    constructor(props) {
        super(props);
    
        // Define the column names for each scatterplot
        this.scatterplots = [
          { x: 'column1', y: 'column2', title: 'Scatterplot 1' },
          { x: 'column3', y: 'column4', title: 'Scatterplot 2' },
          { x: 'column5', y: 'column6', title: 'Scatterplot 3' },
        ];
      }

      componentDidMount() {
        // Load the CSV data
        /*
        d3.csv('/frontend/src/europe_gov.csv').then(data => {
          // Loop through each scatterplot definition
          this.scatterplots.forEach(plot => {
            // Filter the data for this scatterplot
            const plotData = data.filter(d => d[plot.x] !== '' && d[plot.y] !== '');
    
          });
        });*/
      }



  render() {
    //<Scatter2 cat1="RoadQuality" cat2="cas" varXAxis='Geinvesteerd per capita (€)' varYaxis='Verkeersdoden (per 100000 inwoners)' title='Investering in wegen Europa'/>
    return (
      <div>
        
        <Scatter2 cat1="RoadQuality" cat2="cas" varXAxis='Wegkwaliteit (score op 7)' varYaxis='Verkeersdoden (per 100000 inwoners)' title='Wegkwaliteit Europa'/>
        
      </div>
    );
  }
}

export default Wegkwaliteit;
