import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import WorldMap from "./Visualizations/Our_Visualizations/Country/WorldMap";

function VisualizationsPage() {
  // State for visualization dimensions
  const [visDimensions, setVisDimensions] = useState({width: 0, height: 0});

  // useEffect for handling visualization dimensions and responsive resizing
  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = document.getElementById("visContainer").offsetWidth;
      const containerHeight = document.getElementById("visContainer").offsetHeight;

      // Set visualization dimensions to be 95% of parent container dimensions
      setVisDimensions({width: Math.floor(containerWidth * 0.95), height: Math.floor(containerHeight * 0.95)});
    }

    // Setup dimensions on page load
    updateDimensions();

    // Add event listener to update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  return (
      <div style={{height: "100vh"}}>
          <h1>Visualizations</h1>
          <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
            <WorldMap height={visDimensions.height} width={visDimensions.width}/>
          </Container>
      </div>
  )
}

export default VisualizationsPage;