import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function CharityCard(props) {
  console.log(props.instance.established)
  const date_est = new Date(props.instance.established);

  return (
    <Card style={{ width: "90%" }}>
    <Card.Img
      className="border"
      variant="top"
      src={props.instance.logo_img}
      style={{ objectFit : "fit", width: "100%", height: "200px"}}
    />
    <Card.Body style={{ textAlign: "left" }}>
      <Card.Title>{props.instance.name}</Card.Title>
      <Card.Text style={{ fontSize: "small" }}>Est: {date_est.getFullYear()}</Card.Text>
      <Card.Text>Relief Provided: {formatReliefTypes(props.instance.relief_provided)} </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
      <ListGroup.Item>Headquarters: {props.instance.hq_country}</ListGroup.Item>
      <ListGroup.Item>Parent Organization: {props.instance.parent_org}</ListGroup.Item>
      <ListGroup.Item>Organization Type: {props.instance.org_type[0]}</ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <Button variant="outline-success">
        <Link 
          style={{ color: "black", textDecoration: "inherit"}}
          to={`/charities/${props.instance.name}`}>
        More Info
        </Link>
      </Button>
    </Card.Body>
  </Card>
  );
}

function formatReliefTypes(relief_types) {
  let relief_types_string = "";
  for (let i = 0; i < relief_types.length; i++) {
    if (i !== relief_types.length - 1) {
      relief_types_string += relief_types[i] + ", ";
    }
    else {
      relief_types_string += relief_types[i];
    }
  }
  return relief_types_string;
}

export default CharityCard;