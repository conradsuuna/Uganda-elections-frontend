import React from 'react';
import * as d3 from 'd3';
import { useD3 } from './CustomHook'


function GroupedBarChart({ data, stats, parties, station }) {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 1000;
            const margin = { top: 30, right: 20, bottom: 20, left: 90 };

            const x0 = d3.scaleBand()
                .domain(parties)
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);
            const x = d3.scaleBand()
                .domain(stats)
                .rangeRound([0, x0.bandwidth()])
                .padding(0.02);

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, d => d.presidential > d.parliamentary ? d.presidential : d.parliamentary)])
                .nice()
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                    .style("color", "steelblue")
                    .call(d3.axisBottom(x0)
                        .tickValues(
                            data.map(d => d.party)
                        )
                        .tickSizeOuter(0)
                    );

            const y1Axis = (g) =>
                g.attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "s").tickFormat(null, "%"))


            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            // Show the bars
            const model_name = svg
                .selectAll(".bar")
                // Enter in data = loop group per group
                .data(data)
                .enter().append("g")
                .attr("class", "bar")
                .attr("transform", d => `translate(${x0(d.party)}, 0)`)

            model_name.selectAll(".bar.field1")
                .data(d => [d])
                .enter()
                .append("rect")
                .attr("class", "bar field1")
                .style("fill", "#377eb8")
                .attr("x", d => x('presidential'))
                .attr("y", d => y1(d.presidential))
                .attr("width", x.bandwidth())
                .attr("height", d => y1(0) - y1(d.presidential))

            model_name.selectAll(".bar.field2")
                .data(d => [d])
                .enter()
                .append("rect")
                .attr("class", "bar field2")
                .style("fill", "#4daf4a")
                .attr("x", d => x('parliamentary'))
                .attr("y", d => y1(d.parliamentary))
                .attr("width", x.bandwidth())
                .attr("height", d => y1(0) - y1(d.parliamentary))


            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', -(height / 2) - margin.bottom)
                .attr('y', margin.left / 2.4)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('Vote Percentage (%)')

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', 15)
                .attr('text-anchor', 'middle')
                .text(`Presidential/Parliamentary Party Votes of ${station.toUpperCase()} District - 2021`)

            svg.append('text')
                .style("fill", "steelblue")
                .attr('x', width / 2)
                .attr('y', height + 20)
                .attr('text-anchor', 'middle')
                .text(`Political Parties`)


            // legend
            const z = d3.scaleOrdinal()
                .range(["#377eb8", "#4daf4a"])

            const legend = svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(stats.slice())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function (d) {
                    return d;
                });

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
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default GroupedBarChart;
