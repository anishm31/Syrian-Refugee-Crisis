import React, { useState, useEffect } from "react";
import { FunnelChart, Funnel, LabelList, Tooltip } from "recharts";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";
import "./DisordersBarGraph.css";

// Adapted code from https://recharts.org/en-US/api/FunnelChart

// Function to display custom tooltip when hovering over an item in the funnel graph
function LocationLabel(props) {
  if (props.active && props.payload && props.payload.length) {
    const data = props.payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p className="intro">{`Disorder: ${data.name}`}</p>
        <p className="intro">{`Frequency: ${data.frequency}`}</p>
      </div>
    );
  }

  return null;
}

function LocationsFunnelGraph(props) {
  const [locationInstances, setLocationInstances] = useState(null);

  const api_url = "https://api.mentalhealthaustin.me/get_all_locations/";

  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        // Aggregate the frequency of treated disorders
        let freqs = {};
        for (let i = 0; i < response.data.length; i++) {
          let obj = response.data[i];
          for (let j = 0; j < obj.disorders_list.length; j++) {
            let disorder = obj.disorders_list[j];
            freqs[disorder] = disorder in freqs ? freqs[disorder] + 1 : 1;
          }
        }

        let newInstances = [];
        for (const [key, value] of Object.entries(freqs)) {
          newInstances.push({
            name: key,
            frequency: value,
          });
        }

        // sort disorders by frequency
        let sortedInstances = newInstances
          .sort((a, b) => (a.frequency > b.frequency ? 1 : -1))
          .reverse()
          .slice(0, 20);

        let colors = [
          "#8884d8",
          "#83a6ed",
          "#8dd1e1",
          "#82ca9d",
          "#a4de6c",
          "#ffc658",
          "#a05d56",
          "#d0743c",
          "#ff8c00",
          "#3b3b3b",
          "#6a0572",
          "#9f1853",
          "#c0282d",
          "#ed5e00",
          "#ff9300",
          "#ffb900",
          "#ffdb58",
          "#95d13c",
          "#5cb85c",
          "#008000",
          "#1f618d",
          "#34495e",
          "#8e44ad",
          "#d35400",
        ];
        
        for (let i = 0; i < sortedInstances.length; i++) {
          sortedInstances[i]["fill"] = colors[i % colors.length];
        }

        setLocationInstances(sortedInstances);
      })
      .catch((error) => {
        console.log(
          "There was an error fetching the location instances: ",
          error
        );
      });
  }, [api_url]);

  return locationInstances && props.height && props.width ? (
    <Container style={{ justifyContent: "center", marginLeft: "60px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Frequency of Treated Disorders Across All Locations
      </h3>
      <FunnelChart width={props.width} height={props.height}>
        <Tooltip content={<LocationLabel />} />
        <Funnel dataKey="frequency" data={locationInstances} isAnimationActive>
          <LabelList position="center" fill="#000" stroke="none" dataKey="name" fontSize={13} />
        </Funnel>
      </FunnelChart>
    </Container>
  ) : (
    <div style={{ paddingTop: "20px", textAlign: "center" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default LocationsFunnelGraph;