import React, {useState, useEffect} from "react";
import DisordersBarGraph from "./Visualizations/Provider_Visualizations/DisordersBarGraph";
import TreatmentPieChart from "./Visualizations/Provider_Visualizations/TreatmentPieChart";
import LocationsFunnelGraph from "./Visualizations/Provider_Visualizations/LocationsFunnelGraph";
import { Container } from "react-bootstrap";

function ProviderVisualizationsPage() {
  const [visDimensions, setVisDimensions] = useState({width: 0, height: 0});

  // useEffect for handling visualization dimensions and responsive resizing
  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = document.getElementById("visContainer").offsetWidth;
      const visWidth = Math.floor(containerWidth * 0.85);

      setVisDimensions({width: visWidth, height: Math.floor(visWidth / 2.0)});
    }

    // update dimensions when page loads
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  return (
    <div>
      <h1 style={{textAlign : "center", marginBottom : "20px"}}>Provider Visualizations (Mental Health Austin)</h1>
      <br></br>
      <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
        <DisordersBarGraph width={visDimensions.width} height={visDimensions.height} />
      </Container>
      <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
        <TreatmentPieChart />
      </Container>
      <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
        <LocationsFunnelGraph width={visDimensions.width} height={visDimensions.height} />
      </Container>
    </div>
  );
};

export default ProviderVisualizationsPage;