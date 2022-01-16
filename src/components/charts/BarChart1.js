import React from 'react';
// import * as d3 from 'd3';
import { max, scaleBand, scaleLinear, select } from 'd3';


function BarChart({ data }) {
    const width = 1000
    const height = 500
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right 

    // const svg = select('svg')

    // create scales
    const xScale = scaleBand() 
    .range([0, innerWidth])
    .domain(data.map((d) => d.name))
    .padding(0.1)

    const yScale = scaleLinear()
    .domain([0, max(data, (d)=>d.value)])
    .range([innerHeight, 0])

    return(
        <svg height={height+10} width={width+10} >
            <g transform={`translate( ${margin.left}, ${margin.top} )`}>
                {data.map(d => <rect x={xScale(d.name)} width={xScale.bandwidth()} y={0} height={innerHeight- yScale(d.value)} />)}
            </g>
        </svg>
    )
}

export default BarChart;