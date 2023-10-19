import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';


function NewsCard(props) {
    const event_date = new Date(props.instance.date);
    return (
        <Card style={{ width: "90%" }}>
            <Card.Img
                variant="top"
                src={props.instance.image_url[0]}
                style={{ objectFit : "cover", width: "100%", height: "200px"}}
            />
            <Card.Body style={{ textAlign: "left" }}>
                <Card.Title>{props.instance.title}</Card.Title>
                <Card.Text>Date of News/Event: {event_date.toDateString()}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
                <ListGroup.Item>Location of News/Event: {props.instance.primary_country}</ListGroup.Item>
                <ListGroup.Item>Source(s): {formatStringList(props.instance.sources)}</ListGroup.Item>
                <ListGroup.Item>Theme: {formatStringList(props.instance.themes)}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
    <           Button variant="outline-success">
                    <Link
                        style={{ color: "black", textDecoration: "inherit"}}
                        to={`/news-and-events/${props.instance.title}`}>
                        More Info
                    </Link>
                </Button>
            </Card.Body>
        </Card>
    );
}

function formatStringList(stringList) {
    let formatted_string = "";
    for (let i = 0; i < stringList.length; i++) {
      if (i !== stringList.length - 1) {
        formatted_string += stringList[i] + ", ";
      }
      else {
        formatted_string += stringList[i];
      }
    }
    return formatted_string;
}

export default NewsCard;