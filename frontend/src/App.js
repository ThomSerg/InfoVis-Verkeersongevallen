
import React, {useState, useRef, useEffect} from "react";
import * as d3 from 'd3'
import './App.css';
import BarChart from './plotFunctions/barchart';

function App() {

  const [data] = useState([25, 50, 35, 15, 94, 10]);

  const charts = [];

  // Create an array of BarChart components with the same data
  for (let i = 0; i < 8; i++) {
    charts.push(<BarChart key={i} data={data} />);
  }

  return (
    <div className="App">
      <div className="row">{charts.slice(0, 4)}</div>
      <div className="row">{charts.slice(4, 8)}</div>
    </div>
  );
}

export default App;
