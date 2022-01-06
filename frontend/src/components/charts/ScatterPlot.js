import React from 'react';
import * as d3 from 'd3';
import { useD3 } from './CustomHook'


function ScatterPlot({ data, station }) {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 1000;
            const margin = { top: 30, right: 20, bottom: 20, left: 90 };
            const color_gradient = d3.scaleLinear()
                .domain([0, 1])
                .range(["#69b3a2", "red"]);

            const x = d3
                .scaleLinear()
                .domain(d3.extent(data, (d) => d.x))
                .rangeRound([margin.left, width - margin.right])

            const y = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d.y))
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .style("color", "steelblue")
                    .call(d3.axisBottom(x).ticks(width / 80)
                    );

            const yAxis = (g) =>
                g.attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y).ticks(null, "s").tickFormat(null, "%"))

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(yAxis);

            const grid = g => g
                .attr("stroke", "currentColor")
                .attr("stroke-opacity", 0.1)
                .call(g => g.append("g")
                    .selectAll("line")
                    .data(x.ticks())
                    .join("line")
                    .attr("x1", d => 0.5 + x(d))
                    .attr("x2", d => 0.5 + x(d))
                    .attr("y1", margin.top)
                    .attr("y2", height - margin.bottom))
                .call(g => g.append("g")
                    .selectAll("line")
                    .data(y.ticks())
                    .join("line")
                    .attr("y1", d => 0.5 + y(d))
                    .attr("y2", d => 0.5 + y(d))
                    .attr("x1", margin.left)
                    .attr("x2", width - margin.right));

            svg.append("g").call(grid);

            // Set the gradient
            svg.append("linearGradient")
                .attr("id", "line-gradient")
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", 0)
                .attr("y1", y(0))
                .attr("x2", 0)
                .attr("y2", d3.max(data, (d) => d.y))
                .selectAll("stop")
                .data([
                    { offset: "20%", color: "#69b3a2" },
                    { offset: "100%", color: "red" }
                ])
                .enter().append("stop")
                .attr("offset", function (d) { return d.offset; })
                .attr("stop-color", function (d) { return d.color; });

            // define plot
            svg.select(".plot-area")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => x(d.x))
                .attr("cy", (d) => y(d.y))
                .attr("r", 5)
                .style("fill", `url(#line-gradient)`)

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', -(height / 2) - margin.bottom)
                .attr('y', margin.left / 2.4)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('Winner Percentage (%)')

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('text-anchor', 'middle')
                .attr('y', 15)
                .text(`${station} polling stations - 2021`)

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', height + 20)
                .attr('text-anchor', 'middle')
                .text(`Voter Turnout (%)`)
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 600,
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

export default ScatterPlot;
