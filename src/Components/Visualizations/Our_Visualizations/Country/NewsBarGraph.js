import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

//adapted code from https://medium.com/@conlonsp/visualizing-data-with-d3-and-react-4866c84d3b65

function NewsBarGraph({ newsData }) {
  const svgRef = useRef(null);
  const [singleSources, setSingleSources] = useState([]);


  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

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

    //get all of the sources short names
    const allShortnames = newsData.data.flatMap(d =>
      (d.sources || []).map(source => source.source_short_name)
    );

    // Count occurrences of each short name
    const sourceCounts = d3.rollup(
      allShortnames,
      v => v.length,
      d => d || "Unknown"
    );

    const currentSvgRef = svgRef.current;
    // Create categories for sources used more than once, and used one time or less
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
    const thresholds = [5, 10, 15, 20, 25];;
    setSingleSources(categories.singleOrLess);
    console.log("debug", singleSources);
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
      })
      .on("mouseover", function (event, d) {
        //create a tooltip when you hover your mouse over a bar
        tooltip.style("visibility", "visible")
          .html(`Source: ${d.shortname}<br>Count: ${d.count}`)
          .style("left", event.pageX + "px")
          .style("top", (event.pageY - 28) + "px");
        d3.select(this)
          .attr("fill", "orange");
      })
      .on("mousemove", function (event) {
        tooltip.style("left", event.pageX + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function (event, d) {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("fill", colorScale(d.count));
      });



    // Create a seperate category for sources with count <= 1
    const singleOrLessTotal = categories.singleOrLess.reduce((acc, shortname) => acc + sourceCounts.get(shortname), 0);
    svg.append("rect")
      .attr("x", x("Sources cited 1 times or less"))
      .attr("y", y(singleOrLessTotal))
      .attr("width", x.bandwidth())
      .attr("height", height - y(singleOrLessTotal))
      .attr("fill", "lightgray");


    return () => {
      d3.select(currentSvgRef).selectAll('*').remove();
    };
  }, [newsData, singleSources, tooltip]);

  //generate a list of sources that were used 1 or 0 times
  const generateLegend = () => {

    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <div>
          <h2 style={{ textAlign: 'center', border: '1px solid black', padding: '10px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Sources cited {"<="} 1 times</h2>
          <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
            {singleSources.map((item, index) => (
              <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                {item}
              </div>
            ))}
          </div>
        </div>

      </ul>
    );
  };
  return (
    <div>
      <h1>Source Frequency</h1>
      <div ref={svgRef}></div>
      <div style={{ width: '50%', padding: '20px' }}>
        {generateLegend()}
      </div>
    </div>
  );
}

export default NewsBarGraph;