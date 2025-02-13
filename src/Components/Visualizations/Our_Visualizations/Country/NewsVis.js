import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Tooltip } from "@visx/tooltip";
import { useTooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const NewsVis = () => {
  const ref = useRef();
  const [dataset, setDataset] = useState([]);
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip();
  const thresholds = [1,2,5,10, 20, 30, 40,50,60];
  const thresholdLabels = ["1","5","10", "20", "30", "40","50","60","70"];
  const colorScheme = d3.interpolateBuPu;
  const colorScale = d3.scaleThreshold()  
    .domain(thresholds)
    .range(Array.from({ length: thresholds.length + 1 }, (_, i) => colorScheme(i / thresholds.length)));

  useEffect(() => {
    axios.get("https://api.syrianrefugeecrisis.me/news-and-events")
    .then((response) => {
      const newsData = response.data;
      console.log(newsData)
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
        count,
      }));

      const newDataset = sourceData.map((data) => ({
        cx: Math.random() * 500 + 10,
        cy: Math.random() * 500 + 15,
        r: data.radius,
        name: data.shortname,
        count: data.count,
      }));

      setDataset(enforceNonOverlapping(newDataset));
      })
    .catch((error) => {
      console.log(error);
    });
  }, []);

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

  const getColorBasedOnRadius = (count) => {
    return colorScale(count);
  };

  const createMapLegend = (legendHeight, legendWidth) => {
    // Adjust legend width so that it stores the width of each color scale rectangle
    const colorRange = Array.from({ length: thresholds.length + 1 }, (_, i) => colorScheme(i / thresholds.length));
    legendWidth = legendWidth / colorRange.length;
    const legendX = 100 / 4; // CHANGE
    const legendY = 50;

    return (
      <g>
        {"Legend"}
        <text
          x={legendX + (colorRange.length * legendWidth) / 2}
          y={legendY - 5}
          fontSize="14px"
          textAnchor="middle"
        >
          Frequency of Source Citings
        </text>
        {colorRange.map((color, i) => (
          <g key={i} transform={`translate(${legendX + i * legendWidth+1}, ${legendY})`}>
            <rect width={legendWidth} height={legendHeight} fill={color} />
            <text
              x={legendWidth / 2 * 2}
              y={legendHeight + 10}
              fontSize="12px"
              textAnchor="middle"
            >
              {thresholdLabels[i]}
            </text>
          </g>
        ))}
      </g>
    );
  };

  return (
    dataset.length > 0
    ?
    <div style={{ position: "relative" }}>
      <h3 style={{textAlign : "center", marginBottom : "10px"}}>Frequency of Source Citations</h3>
      <svg width={600} height={600} ref={ref}>
        {dataset.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={getColorBasedOnRadius(d.count)}
            onMouseOver={(event) => handleMouseOver(event, d)}
            onMouseOut={handleMouseOut}
          />
        ))}
        <g transform={`translate(0, ${600 - 80})`}>
          {createMapLegend(10, 300)}
        </g>
      </svg>
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={defaultStyles}
        >
          <div>
            <strong>{tooltipData.name}</strong>
          </div>
          <div>Count: {tooltipData.count}</div>
        </Tooltip>
      )}
    </div>
    :
    <div style={{paddingTop: "20px", textAlign : "center"}}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default NewsVis;
