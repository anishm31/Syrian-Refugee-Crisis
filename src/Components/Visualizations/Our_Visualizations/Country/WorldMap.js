import * as d3 from "d3"
import {geoData} from "./mapGeoData"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

// Adapted code from https://www.react-graph-gallery.com/choropleth-map

function WorldMap(props) {
  const [instances, setInstances] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Define the color scale for the choropleth map
  const thresholds = [100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000];
  const thresholdLabels = ["100", "1K", "10K", "100K", "1M", "10M"];
  const colorScheme = d3.schemeBuPu[thresholds.length + 1];
  let colorScale =
    d3.scaleThreshold()
    .domain(thresholds)
    .range(colorScheme);

  // Define the projection that will be used to draw the map
  const projection = d3.geoNaturalEarth1()

  // Create the geoPath generator
  const pathGenerator = d3.geoPath().projection(projection);

  // Function to create country paths (complex shapes) for the map
  const createSvgPaths = (mapHeight, mapWidth) => {
    // Adjust projection (scale and translation) to fit the map in the container
    projection.fitSize([mapWidth, mapHeight], geoData);

    return (
      geoData.features
      .filter((country) => country.id !== "ATA")
      .map((countryShape) => {
        // Fetch data for country if it exists in the instance array
        const totalRefugees = instances.find((country) => country.country_iso3 === countryShape.id)?.num_refugees;
        // Fetch correseponding color
        const color = totalRefugees ? colorScale(totalRefugees) : colorScale(0);
    
        return (
          <path
            key={countryShape.id}
            d={pathGenerator(countryShape)}
            stroke="#bdbdbd"
            strokeWidth={0.5}
            fill={color}
            fillOpacity={1}
          />
        );}
      ));
  }

  // Function used to generate a legend for the choropleth map
  const createMapLegend = (legendHeight, legendWidth) => {
    const legendX = 10;
    const legendY = 50;

    return (
      <g>
        {/*Legend Title*/}
        <text
          x={legendX + (colorScheme.length * legendWidth) / 2}
          y={legendY - 5}
          fontSize="14px"
          textAnchor="middle"
        >
          Total Syrian Refugees
        </text>
        {
        /*Legend Colors*/
        colorScheme.map((color, i) => (
          <g key={i} transform={`translate(${legendX + i * legendWidth}, ${legendY})`}>
            <rect width={legendWidth} height={legendHeight} fill={color} />
            <text
              /*Make the threshold labels centered in-between the rectangles*/
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
  
  // Fetch data from API to get the total number of refugees for each country
  useEffect(() => {
    if (!loaded) {
      axios.get("https://api.syrianrefugeecrisis.me/countries")
        .then((response) => {
          setInstances(response.data.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loaded]);

  return (
    loaded && props.width && props.height ?
    <svg height={props.height} width={props.width} >
      {createSvgPaths(props.height, props.width)}
      <g transform={`translate(0, ${props.height - 80})`}>
        {createMapLegend(10, 60)}
      </g>
    </svg>
    :
    <div style={{paddingTop: "20px"}}>
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default WorldMap;