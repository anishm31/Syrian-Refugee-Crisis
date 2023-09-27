import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { BrowserRouter as Link } from 'react-router-dom';

function CharityCard(props) {
  const date_est = new Date(props.instance.attributes.established);

  return (
    <Card style={{ width: "90%" }}>
    <Card.Img
      className="border"
      variant="top"
      src={props.instance.attributes.logo_img}
      style={{ objectFit : "fit", width: "100%", height: "200px"}}
    />
    <Card.Body style={{ textAlign: "left" }}>
      <Card.Title>{props.instance.name}</Card.Title>
      <Card.Text style={{ fontSize: "small" }}>Est: {date_est.getFullYear()}</Card.Text>
      <Card.Text>Purpose: {props.instance.attributes.description} </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
      <ListGroup.Item>Headquarters: {props.instance.attributes.headquarters}</ListGroup.Item>
      <ListGroup.Item>Parent Organization: {props.instance.attributes.parent_org}</ListGroup.Item>
      <ListGroup.Item>Notable Award: {props.instance.attributes.awards_received[0]}</ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <Button variant="outline-success">
        <Link 
          style={{ color: "black", textDecoration: "inherit"}}
          to={"/charities/" + props.instance.name}>
        More Info
        </Link>
      </Button>
    </Card.Body>
  </Card>
  );
}

export default CharityCard;