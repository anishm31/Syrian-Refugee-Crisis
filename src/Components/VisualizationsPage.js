import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import WorldMap from "./Visualizations/Our_Visualizations/Country/WorldMap";
import CharityPieChart from "./Visualizations/Our_Visualizations/Country/CharityPieChart";
import NewsBarGraph from "./Visualizations/Our_Visualizations/Country/NewsBarGraph";
import NewsVis from "./Visualizations/Our_Visualizations/Country/NewsVis";
import axios from "axios";


function VisualizationsPage() {
  const [visDimensions, setVisDimensions] = useState({width: 0, height: 0});
  const [charitiesData, setCharitiesData] = useState(null);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    axios.get("https://api.syrianrefugeecrisis.me/charities")
      .then((response) => {
        setCharitiesData(response.data);
        setNewsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get("https://api.syrianrefugeecrisis.me/news-and-events")
      .then((response) => {
        setNewsData(response.data);
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
  
  return (
    <div>
      <div style={{height: "100vh"}}>
          <h1 style={{textAlign : "center", marginBottom : "20px"}}>Our Visualizations</h1>
          <br></br>
          <Container style={{height: "65%", width: "85%"}} fluid id="visContainer">
            {/* <WorldMap height={visDimensions.height} width={visDimensions.width}/> */}
          </Container>
      </div>
      <div>
        <Container style={{ width: "60%", height: "60%" , marginBottom: "20px"}}>
          {/* {charitiesData && <CharityPieChart charitiesData={charitiesData} />} */}
        </Container>
      </div>
      <div>
      <Container style={{ width: "50%", height: "50%" }}>
      {newsData && <NewsVis newsData={newsData} />}
        </Container>
      </div>
    </div>
  )
}

export default VisualizationsPage;