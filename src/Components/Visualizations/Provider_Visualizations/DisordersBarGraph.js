import React, { useState, useEffect } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";
import "./DisordersBarGraph.css";

// Adapted code from https://recharts.org/en-US/examples/CustomContentOfTooltip

// Function to display custom tooltip when hovering over an item in the bar graph
function DisorderLabel(props) {
  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Disorder: ${props.label}`}</p>
        <p className="intro">{`Number of Possible Treatments: ${props.payload[0].value}`}</p>
      </div>
    );
  }

  // Default behavior
  return null;
}

function DisordersBarGraph(props) {
  const [disorderInstances, setDisorderInstances] = useState(null);

  const api_url = "https://api.mentalhealthaustin.me/get_all_disorders/";

  useEffect(() => {
    axios.get(api_url)
      .then((response) => {
        // Sort reponse by total number of treatments
        const sortedInstances = response.data.sort((a, b) => (a.treatments_list.length > b.treatments_list.length) ? 1 : -1).reverse();
        let newInstances = [];
        for (let i = 0; i < sortedInstances.length; i++) {
          newInstances.push({
            name: sortedInstances[i].name,
            num_treatments: sortedInstances[i].treatments_list.length
          });
        }
        setDisorderInstances(newInstances);
      })
      .catch((error) => {
        console.log("There was an error fetching the disorder instances: ", error);
      });
  }, [api_url]);

  return (
    disorderInstances && props.height && props.width ?
    (
    <Container style={{justifyContent : "center"}}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Number of Treatments per Disorder
      </h3>
      <BarChart width={props.width} height={props.height} data={disorderInstances}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip content={<DisorderLabel/>}/>
        <Bar dataKey="num_treatments" fill="#00a9b5" />
      </BarChart>
    </Container>)
    :
    (<div style={{paddingTop: "20px", textAlign : "center"}}>
      <Spinner animation="border" variant="primary" />
    </div>)
  );
}

export default DisordersBarGraph;