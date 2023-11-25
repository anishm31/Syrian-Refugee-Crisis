import React, { useEffect } from 'react';
import * as d3 from 'd3';

function NewsBarGraph() {
  useEffect(() => {
    // Sample data
    const data = [10, 20, 15, 25, 30];

    // Set up SVG dimensions
    const svgWidth = '100%';
    const svgHeight = 500;

    // Set up margin
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Calculate chart dimensions
    const chartWidth = '100%' - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Create chart group
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([chartHeight, 0]);

    // Create bars
    chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => chartHeight - yScale(d));

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${svgHeight - margin.bottom})`)
      .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

  }, []); // Empty dependency array to run the effect only once

  return (
    <svg
      style={{
        height: 500,
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

export default NewsBarGraph;
