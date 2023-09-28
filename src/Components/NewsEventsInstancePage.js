import React from "react";
import newsData from "../model_data/news_db.json";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup} from 'react-bootstrap';


function NewsEventsInstancePage() {
const params = useParams();
const event = newsData.find(instance => instance.Title === params.id)
console.log("Item is: ", event);
return (
<Container className='mt-5' style={{width : "85%", textAlign : "center"}}>
<div className="News/Events-info">
<Card style={{ width: "90%", textAlign: "center"}}>
<Card.Img
variant="top"
src={event.Image}
style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto"}}
/>
<Card.Body style={{ textAlign: "left" }}>
<Card.Title>{event.Title}</Card.Title>
<Card.Text style={{ fontSize: "small" }}>Date of Event: {event.Date.toLocaleString()}</Card.Text>
<Card.Text>Location of Event: {event.attributes.PrimaryCountry.toLocaleString()}</Card.Text>
</Card.Body>
<ListGroup className="list-group-flush">
<ListGroup.Item>Disaster Type: {event.attributes.DisasterType.toLocaleString()}</ListGroup.Item>
<ListGroup.Item>Source: {event.attributes.OtherSources}</ListGroup.Item>
<ListGroup.Item>Theme: {event.attributes.Themes.toLocaleString()}</ListGroup.Item>
</ListGroup>
<Card.Img
                    variant="bottom"
                    src={event.SecondImage}
                    style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto"}}
                />
</Card>
</div>
</Container>
);
}


export default NewsEventsInstancePage;