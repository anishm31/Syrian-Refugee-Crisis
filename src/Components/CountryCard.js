import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/Button";

function CountryCard(props) {
  return (
    <Card style={{ width: "90%" }}>
      <Card.Img
        variant="top"
        src={props.instance.flag_url}
        style={{ objectFit : "cover", width: "100%", height: "200px"}}
      />
      <Card.Body style={{ textAlign: "left" }}>
        <Card.Title>{props.instance.country}</Card.Title>
        <Card.Text style={{ fontSize: "small" }}>ISO Code: {props.instance.country_iso3}</Card.Text>
        <Card.Text>Total Syrian Refugees: {props.instance.attributes.num_refugees.toLocaleString()}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
        <ListGroup.Item>Total Asylum Decisions: {props.instance.attributes.num_asylum_decisions.toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Year of Decisions: {props.instance.attributes.year_of_decisions}</ListGroup.Item>
        <ListGroup.Item>Number Granted Asylum: {props.instance.attributes.num_recognized.toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Number Rejected: {props.instance.attributes.num_apps_rejected.toLocaleString()}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="outline-success">More Info</Button>{" "}
      </Card.Body>
    </Card>
  );
}

export default CountryCard;