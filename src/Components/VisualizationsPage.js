import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import WorldMap from "./Visualizations/Our_Visualizations/Country/WorldMap";
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import Chart from 'chart.js/auto';


function VisualizationsPage() {
  // State for visualization dimensions
  const [visDimensions, setVisDimensions] = useState({width: 0, height: 0});
  const [charitiesData, setCharitiesData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios.get("https://api.syrianrefugeecrisis.me/charities")
      .then((response) => {
        setCharitiesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

    return () => {
      window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  const generateReliefChartData = () => {
    if (!charitiesData) return null;

    const reliefCount = {};
    charitiesData.data.forEach(charity => {
      charity.relief_provided.forEach(relief => {
        reliefCount[relief] = (reliefCount[relief] || 0) + 1;
      });
    });

    const labels = Object.keys(reliefCount);
    const data = Object.values(reliefCount);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0'],
        }
      ],
    };
  };
  
  return (
      <div style={{height: "100vh"}}>
          <h1 style={{textAlign : "center", marginBottom : "20px"}}>Our Visualizations</h1>
          <br></br>
          <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
            <WorldMap height={visDimensions.height} width={visDimensions.width}/>
            {charitiesData && (
              <div>
                <Doughnut
                  data={generateReliefChartData()}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: (tooltipItem, data) => {
                          const dataset = data.datasets[tooltipItem.datasetIndex];
                          const total = dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue);
                          const currentValue = dataset.data[tooltipItem.index];
                          const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
                          return `${data.labels[tooltipItem.index]}: ${percentage}`;
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </Container>
      </div>
  )
}

export default VisualizationsPage;