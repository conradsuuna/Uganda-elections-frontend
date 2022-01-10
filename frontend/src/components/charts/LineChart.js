import React from 'react';
import * as d3 from 'd3';
import { useD3 } from './CustomHook'


function LineChart({ data, station }) {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 1000;
            const margin = { top: 50, right: 20, bottom: 20, left: 90 };

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.year))
                .rangeRound([margin.left, width - margin.right])

            const y1 = d3
                .scaleLinear()
                .domain([0, 100])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .style("color", "steelblue")
                    .call(d3.axisBottom(x)
                        .tickValues(
                            data.map(d => d.year)
                        )
                        .tickSizeOuter(0)
                    );

            const y1Axis = (g) =>
                g.attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "s").tickFormat(null, "%"))

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            const grid = g => g
                .attr("stroke", "currentColor")
                .attr("stroke-opacity", 0.1)
                .call(g => g.append("g")
                    .selectAll("line")
                    .data(y1.ticks())
                    .join("line")
                    .attr("y1", d => 0.5 + y1(d))
                    .attr("y2", d => 0.5 + y1(d))
                    .attr("x1", margin.left)
                    .attr("x2", width - margin.right));

            svg.append("g").call(grid);

            const linePath = d3.line()
                .x((d) => x(d.year))
                .y((d) => y1(d.voter_turnout))
                .curve(d3.curveLinear)(data);

            // const areaPath = d3
            //     .area()
            //     .x((d) => x(d.year))
            //     .y0((d) => y1(d.voter_turnout))
            //     .y1(() => y1(d3.min(data, (d) => d.voter_turnout) - 1))
            //     .curve(d3.curveMonotoneY)(data);

            svg
                .append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#69b3a2')
                .attr('stroke-width', 2)
                .attr('class', 'line')
                .attr('d', linePath);

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', -(height / 2) - margin.bottom)
                .attr('y', margin.left / 2.4)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('Percentage Turnout (%)')

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', 20)
                .attr('text-anchor', 'middle')
                .text(`Voter Turnout Trend For Presidential Elections in ${station} District`)

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', height + 20)
                .attr('text-anchor', 'middle')
                .text(`Years/Time`)
        },
        [data.length]
    );
    {/* <path fill={color} d={areaPath} opacity={0.3} />
<path strokeWidth={3} fill="none" stroke={color} d={linePath} /> */}
    return (
        <svg
            ref={ref}
            style={{
                height: 650,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default LineChart;
