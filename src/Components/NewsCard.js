import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';


function NewsCard(props) {
    return (
        <Card style={{ width: "90%" }}>
            <Card.Img
                variant="top"
                src={props.instance.Image}
                style={{ objectFit : "cover", width: "100%", height: "200px"}}
            />
            <Card.Body style={{ textAlign: "left" }}>
                <Card.Title>{props.instance.title}</Card.Title>
                <Card.Text style={{ fontSize: "small" }}>Name of Event: {props.instance.Title}</Card.Text>
                <Card.Text>Date of Event {props.instance.Date.toLocaleString()}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
                <ListGroup.Item>Location of Event: {props.instance.attributes.PrimaryCountry.toLocaleString()}</ListGroup.Item>
                <ListGroup.Item>Disaster Type: {props.instance.attributes.DisasterType.toLocaleString()}</ListGroup.Item>
                <ListGroup.Item>Source: {props.instance.attributes.OtherSources.toLocaleString()}</ListGroup.Item>
                <ListGroup.Item>Theme: {props.instance.attributes.Themes.toLocaleString()}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
    <           Button variant="outline-success">
                    <Link
                        style={{ color: "black", textDecoration: "inherit"}}
                        to={"/news-and-events/" + props.instance.Title}>
                        More Info
                    </Link>
                </Button>
            </Card.Body>
        </Card>
    );
}


export default NewsCard;