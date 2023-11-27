import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function NewsBarGraph({ newsData }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!newsData || newsData.data.length === 0) return;
    console.log("FIRST", newsData.data);
    const margin = { top: 30, right: 30, bottom: 150, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // Flatten the data and extract the source short names
     const allShortnames = newsData.data.flatMap(d =>
      (d.sources || []).map(source => source.source_short_name)
    );

    // Count occurrences of each short name
    const sourceCounts = d3.rollup(
      allShortnames,
      v => v.length,
      d => d || "Unknown"
    );

    // Create categories based on counts
    const categories = Array.from(sourceCounts.keys())
      .reduce((acc, shortname) => {
        const count = sourceCounts.get(shortname);
        if (count <= 1) {
          acc.singleOrLess.push(shortname);
        } else {
          acc.mainGroup.push(shortname);
        }
        return acc;
      }, { mainGroup: [], singleOrLess: [] });

      // Define the color scale for the choropleth map
  const thresholds = [5,10,15,20,25];
  //const thresholds = [100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000];
  const thresholdLabels = ["100", "1K", "10K", "100K", "1M", "10M"];
  const colorScheme = d3.schemeYlOrRd[thresholds.length + 1];
  let colorScale =
    d3.scaleThreshold()
    .domain(thresholds)
    .range(colorScheme);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(categories.mainGroup.concat("Sources cited 1 times or less")) 

    const y = d3.scaleLinear()
      .domain([0, d3.max(sourceCounts.values())])
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
      .data(categories.mainGroup.map(shortname => ({
        shortname,
        count: sourceCounts.get(shortname),
      })))
      .enter()
      .append("rect")
      .attr("x", d => x(d.shortname))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr('fill', function (d) {
        return colorScale(d.count);
      });

    // Create a separate category for sources with count <= 1
    const singleOrLessTotal = categories.singleOrLess.reduce((acc, shortname) => acc + sourceCounts.get(shortname), 0);
    svg.append("rect")
      .attr("x", x("Sources cited 1 times or less"))
      .attr("y", y(singleOrLessTotal))
      .attr("width", x.bandwidth())
      .attr("height", height - y(singleOrLessTotal))
      .attr("fill", "lightgray");

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