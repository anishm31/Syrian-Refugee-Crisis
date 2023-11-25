import { useState, useEffect } from "react";
import axios from "axios";
import * as d3 from 'd3';

function NewsBarGraph() {
  const [sources, setSources] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios.get("https://api.syrianrefugeecrisis.me/news-and-events")
        .then((response) => {
          setSources(response.data.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loaded]);

  useEffect(() => {
    if (sources.length > 0) {
      // Extract source names
      const data = sources.map((event) => event.title);

      // Set up SVG dimensions
      const svgWidth = '100%';
      const svgHeight = 500;

      // Set up margin
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Calculate chart dimensions
      const chartWidth = svgWidth - margin.left - margin.right;
      const chartHeight = svgHeight - margin.top - margin.bottom;

      // Create SVG container
      const svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      // Create chart group
      const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create scaleBand
      const xScale = d3.scaleBand()
        .domain(data)
        .range([0, chartWidth])
        .padding(0.9);

      // Create bars
      chart.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d))
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', chartHeight)
        .attr('fill', 'steelblue');

      // Create x-axis
      const xAxis = d3.axisBottom(xScale);
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(${margin.left},${svgHeight - margin.bottom})`)
        .call(xAxis);
    }
  }, [sources]);

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
