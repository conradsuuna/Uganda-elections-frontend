import React from 'react';
import * as d3 from 'd3';
import {useD3} from './CustomHook'


function BarChart({ data, station }) {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 1000;
            const margin = { top: 30, right: 20, bottom: 20, left: 90 };

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.name))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.value)])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .style("color", "steelblue")
                    .call(d3.axisBottom(x)
                        .tickValues(
                            data.map(d => d.name)
                        )
                        .tickSizeOuter(0)
                    );

            const y1Axis = (g) =>
                g.attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "s").tickFormat(null, "%"))
            //   .call((g) =>
            //     g.append("text")
            //       .attr("x", -margin.left)
            //       .attr("y", 10)
            //       .attr("fill", "currentColor")
            //       .attr("text-anchor", "start")
            //       .text("hello")
            //   );

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            svg.select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d.name))
                .attr("width", x.bandwidth())
                .attr("y", (d) => y1(d.value))
                .attr("height", (d) => y1(0) - y1(d.value))
                .style('border', "1px solid black");

            // svg.select(".plot-area").append('g')
            // .attr('class', 'grid')
            // .attr('transform', `translate(0, ${height})`)
            // .call(d3.axisBottom()
            // .scale(x)
            // .tickSize(-height, 0, 0)
            // .tickFormat(''))

            // svg.select(".plot-area").append('g')
            // .attr('class', 'grid')
            // .call(d3.axisLeft()
            // .scale(y1)
            // .tickSize(-width, 0, 0)
            // .tickFormat(''))

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', -(height / 2) - margin.bottom)
                .attr('y', margin.left / 2.4)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('Win Percentage (%)')

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', 15)
                .attr('text-anchor', 'middle')
                .text(`Presidential votes at the ${station} polling station - 2021`)

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', height + 20)
                .attr('text-anchor', 'middle')
                .text(`Candidates`)
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

export default BarChart;
