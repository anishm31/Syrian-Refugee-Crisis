import React, { useState, useEffect } from "react";
import {FunnelChart, Funnel, LabelList, Tooltip} from "recharts";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";
import "./DisordersBarGraph.css";

// Adapted code from https://recharts.org/en-US/api/FunnelChart

// Function to display custom tooltip when hovering over an item in the funnel graph
function LocationLabel(props) {
  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{`Frequency of Disorder: ${props.payload[0].value}`}</p>
      </div>
    );
  }

  // Default behavior
  return null;
}

function LocationsFunnelGraph(props) {
  const [locationInstances, setLocationInstances] = useState(null);

  const api_url = "https://api.mentalhealthaustin.me/get_all_locations/";

  useEffect(() => {
    axios.get(api_url)
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

        // Convert frequencies to an array of objects
        let newInstances = [];
        for (const [key, value] of Object.entries(freqs)) {
            newInstances.push({
                name: key,
                frequency: value
            });
        }

        // Grab the top 5 disorder frequencies
        let top5Instances = newInstances.sort((a, b) => (a.frequency > b.frequency) ? 1 : -1).reverse().slice(0, 5);
        
        // Color the top 5 disorders
        let colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];
        for (let i = 0; i < top5Instances.length; i++) {
          top5Instances[i]["fill"] = colors[i];
        }

        setLocationInstances(top5Instances);
    })
    .catch((error) => {
        console.log("There was an error fetching the location instances: ", error);
    });
  }, [api_url]);

  return (
    locationInstances && props.height && props.width ?
    (
    <Container style={{justifyContent : "center"}}>
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Frequency of Treated Disorder over All Locations
        </h3>
        <FunnelChart width={props.width} height={props.height}>
            <Tooltip content={<LocationLabel/>}/>
            <Funnel
                dataKey="frequency"
                data={locationInstances}
                isAnimationActive
            >
                <LabelList position="center" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
        </FunnelChart>
    </Container>)
    :
    (<div style={{paddingTop: "20px", textAlign : "center"}}>
        <Spinner animation="border" variant="primary" />
    </div>)
  );
}

export default LocationsFunnelGraph;