import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function NewsBarGraph({ newsData }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!newsData || newsData.data.length === 0) return;
    console.log("FIRST", newsData.data);
    const margin = { top: 30, right: 30, bottom: 150, left: 60 };
    const width = 2000 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //want the x axis to be different sources
    const uniqueShortnames = [...new Set(newsData.data.flatMap(d => (d.sources || []).map(s => s.source_short_name)))];
   // const uniqueShortnames = [...new Set(newsData.data.flatMap(d => d.sources.map(s => s.source_short_name)))];
    const x = d3.scaleBand()
      .range([0, width])
      .domain(uniqueShortnames ) // Assuming 'primary_country' is the property you want to use
      .padding(0.85);

    const y = d3.scaleLinear()
      .domain([0, newsData.data.length])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-40)")
      .style("text-anchor", "end");

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll("mybar")
      .data(newsData.data.filter(d => d.sources && d.sources.in_db === true))
      .enter()
      .append("rect")
      .attr("x", d => x(d.primary_country)) // Update to the correct property
      .attr("y", d => y(/* Use the property that represents the height of the bar */))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(/* Use the property that represents the height of the bar */))
      .attr("transform", "rotate(80)")
      .attr("fill", "#69b3a2");



      

      console.log("LOOK HERE", newsData.data.map(place => place.id)); // Log x-axis data
      console.log(x.domain()); // Log x-scale domain

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [newsData]);

  return (
    <div>
      <h1>Your Donation Progress</h1>
      <div ref={svgRef}></div>
    </div>
  );
}

export default NewsBarGraph;
