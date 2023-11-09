import { useState, useEffect } from "react";
import TimeLineItem from "./TimeLineItem";
import axios from "axios";
import "../CSS/timeline.css"; 


function TimeLine() {
  const [loaded, setLoaded] = useState(false);
  const [newsEventsInstances, setNewsEventsInstances] = useState([]);

  // Fetch page of news/events instances from the API
  useEffect(() => {
    axios
      .get("https://api.syrianrefugeecrisis.me/news-and-events")
      .then((response) => {
        setNewsEventsInstances(response.data.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
        setLoaded(true); // Set loaded to true even if there's an error to avoid an infinite loading state
      });
  }, []);

  // Verify that the charity data has been loaded before rendering the main content
  if (!loaded) {
    return <h1 style={{ textAlign: "center" }}>Page Loading...</h1>;
  }

  // Check if there is at least one instance in the array
  if (newsEventsInstances.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No instances available.</h1>;
  }

  //sort the instances by date
  newsEventsInstances.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="timeline-container">
     {newsEventsInstances.map((data, idx) => (
        <TimeLineItem data={data} key={idx} />
      ))}
    </div>
  );
}

export default TimeLine;
