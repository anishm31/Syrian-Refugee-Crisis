import React from "react";
import "./timeline.css";
import { Link } from 'react-router-dom'; 


function TimeLineItem({ data }) {
  // Ensure that data is defined before rendering
  if (!data) {
    return null;
  }

  // Extract relevant data properties
  const { title, description, date, } = data;

  
  const eventDate = new Date(date);
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
     
        <h2>{title}</h2>
        <p>{description}</p>
        <time>{eventDate.toDateString()}</time>
        <     div className="custom-button">
                    <Link
                        style={{ color: "black", textDecoration: "inherit", border:'none'}}
                        to={`/news-and-events/${title}`}>
                        More Info
                    </Link>
                    </div>
        <span className="circle" />
      </div>
    </div>
  );
}

export default TimeLineItem;
