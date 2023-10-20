import React from "react";
import "./timeline.css"; 


function TimeLineItem({ data }) {
  // Ensure that data is defined before rendering
  if (!data) {
    return null;
  }

  // Extract relevant data properties
  const { title, description, date, imageUrl, link } = data;
  
  const eventDate = new Date(date);
  return (
    <div className="timeline-item">
      <div className="timeline-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <time>{eventDate.toDateString()}</time>
        {imageUrl && <img src={imageUrl} alt={title} />}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        )}
        <span className="circle" />
      </div>
    </div>
  );
}

export default TimeLineItem;
