import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const NewsVis = ({ newsData }) => {
  const ref = useRef();
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    // Generate dataset based on the number of sources
    const allShortnames = newsData.data.flatMap((d) =>
      (d.sources || []).map((source) => source.source_short_name)
    );
    const numberOfSources = allShortnames.length;

    const sourceCounts = d3.rollup(
      allShortnames,
      (v) => v.length,
      (d) => d || "Unknown"
    );

    const sourceData = Array.from(sourceCounts, ([shortname, count]) => ({
      shortname,
      radius: Math.sqrt(count) * 5, // Adjust the scaling factor as needed
    }));

    const newDataset = sourceData.map((data) => ({
      cx: Math.random() * 500 + 10, // Adjust the range for x positions
      cy: Math.random() * 500 + 15, // Centered around the middle of the available height
      r: data.radius, // Use the calculated radius from sourceData
    }));

    // Ensure non-overlapping positions
    setDataset(enforceNonOverlapping(newDataset));
  }, [newsData]);

  const enforceNonOverlapping = (newDataset) => {
    const margin = 5; // Adjust the margin to control the spacing between circles
    const maxAttempts = 1000;

    return newDataset.map((circle) => {
      let attempts = 0;
      while (
        newDataset.some(
          (other) =>
            other !== circle &&
            Math.hypot(other.cx - circle.cx, other.cy - circle.cy) <
              other.r + circle.r + margin
        )
      ) {
        circle.cx = Math.random() * 500 + 10; // Adjust the range for x positions
        circle.cy = Math.random() * 500 + 15; // Centered around the middle of the available height

        attempts += 1;
        if (attempts > maxAttempts) {
          console.warn("Max attempts reached. Some circles may still overlap.");
          break;
        }
      }

      return circle;
    });
  };

  useEffect(() => {
    if (dataset.length === 0) return;

    const svgElement = d3.select(ref.current);

    // Select all existing circles and bind data
    const circles = svgElement.selectAll("circle").data(dataset);

    // Update existing circles
    circles
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.r);

    // Enter new circles
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.r)
      .style("fill", "blue");

    // Exit removed circles
    circles.exit().remove();
  }, [dataset]);

  return <svg width={1000} height={1000} ref={ref} />;
};

export default NewsVis;
