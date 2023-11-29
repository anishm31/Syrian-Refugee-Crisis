import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Tooltip } from "@visx/tooltip";
import { useTooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const NewsVis = ({ newsData }) => {
  const ref = useRef();
  const [dataset, setDataset] = useState([]);
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip();

  useEffect(() => {
    const allShortnames = newsData.data.flatMap((d) =>
      (d.sources || []).map((source) => source.source_short_name)
    );

    const sourceCounts = d3.rollup(
      allShortnames,
      (v) => v.length,
      (d) => d || "Unknown"
    );

    const sourceData = Array.from(sourceCounts, ([shortname, count]) => ({
      shortname,
      radius: Math.sqrt(count) * 5,
    }));

    const newDataset = sourceData.map((data) => ({
      cx: Math.random() * 500 + 10,
      cy: Math.random() * 500 + 15,
      r: data.radius,
      name: data.shortname,
    }));

    setDataset(enforceNonOverlapping(newDataset));
  }, [newsData]);

  const enforceNonOverlapping = (newDataset) => {
    const margin = 5;
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
        circle.cx = Math.random() * 500 + 10;
        circle.cy = Math.random() * 500 + 15;

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

    const circles = svgElement.selectAll("circle").data(dataset);

    circles
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.r)
      .style("fill", (d) => getColorBasedOnRadius(d.r))
      .on("mouseover", (event, d) => handleMouseOver(event, d))
      .on("mouseout", handleMouseOut);

    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.r)
      .style("fill", (d) => getColorBasedOnRadius(d.r))
      .on("mouseover", (event, d) => handleMouseOver(event, d))
      .on("mouseout", handleMouseOut);

    circles.exit().remove();
  }, [dataset]);

  const handleMouseOver = (event, data) => {
    const { x, y } = localPoint(event);
    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: data,
    });
  };

  const handleMouseOut = () => {
    hideTooltip();
  };

  const getColorBasedOnRadius = (radius) => {
    return d3.interpolateRdYlBu(radius / 30);
  };

  return (
    <div style={{ position: "relative" }}>
      <svg width={1000} height={1000} ref={ref}>
        {dataset.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={getColorBasedOnRadius(d.r)}
            onMouseOver={(event) => handleMouseOver(event, d)}
            onMouseOut={handleMouseOut}
          />
        ))}
      </svg>
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={defaultStyles}
        >
          <strong>{tooltipData.name}</strong>
        </Tooltip>
      )}
    </div>
  );
};

export default NewsVis;
