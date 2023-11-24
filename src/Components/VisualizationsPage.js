import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import WorldMap from "./Visualizations/Our_Visualizations/Country/WorldMap";
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import Chart from 'chart.js/auto';


function VisualizationsPage() {
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

      setVisDimensions({width: Math.floor(containerWidth * 0.95), height: Math.floor(containerHeight * 0.95)});
    }

    // update dimensions when page loads
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (!charitiesData) return;

    // destroy existing chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }
    const newChartInstance = new Chart("dummyCanvasId", {
      type: "doughnut", // or your desired chart type
      data: generateReliefChartData(),
      options: {
      },
    });
    setChartInstance(newChartInstance);
    // destroy the chart instance when the component is unmounted
    return () => {
      newChartInstance.destroy();
    };
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

    const customColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0',
      '#2196F3', '#FF5722', '#607D8B', '#E91E63', '#795548', '#00BCD4',
      '#8BC34A', '#673AB7', '#CDDC39', '#FF5252', '#FFC107', '#3F51B5',
      '#009688', '#FFD600', '#FF4081', '#8D6E63', '#FF5722', '#536DFE'
    ];
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: customColors.slice(0, data.length),
          hoverBackgroundColor: customColors.slice(0, data.length),
        }
      ],
    };
  };

  const generateLegend = () => {
    const data = generateReliefChartData();
    if (!data) return null;
  
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.labels.map((label, index) => (
          <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: data.datasets[0].backgroundColor[index],
                marginRight: '5px',
              }}
            />
            <span style={{ fontSize: '12px' }}>{`${label}: ${data.datasets[0].data[index]} charities`}</span>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div>
      <div style={{height: "100vh"}}>
          <h1 style={{textAlign : "center", marginBottom : "20px"}}>Our Visualizations</h1>
          <br></br>
          <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
            <WorldMap height={visDimensions.height} width={visDimensions.width}/>
          </Container>
      </div>
      <div>
        <Container style={{ width: "60%", height: "60%" }}>
          {charitiesData && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
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
                <div style={{ width: '30%', padding: '20px' }}>
                  {generateLegend()}
                </div>
              </div>
            )}
        </Container>
      </div>
    </div>
  )
}

export default VisualizationsPage;