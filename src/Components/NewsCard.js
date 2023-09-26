import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/Button";

function NewsCard(props) {
  return (
    <Card style={{ width: "90%" }}>
      <Card.Img
        variant="top"
        src={"https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3b%2FPicture_Not_Yet_Available.png&tbnid=yyB_JrLCM880CM&vet=12ahUKEwjvoMSM58eBAxUyMt4AHVVBDO8QMygBegQIARBW..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3APicture_Not_Yet_Available.png&docid=hT23S5DEZnbFxM&w=342&h=311&q=no%20image%20yet&ved=2ahUKEwjvoMSM58eBAxUyMt4AHVVBDO8QMygBegQIARBW"}
        style={{ objectFit : "cover", width: "100%", height: "200px"}}
      />
      <Card.Body style={{ textAlign: "left" }}>
        <Card.Title>{props.instance.title}</Card.Title>
        <Card.Text style={{ fontSize: "small" }}>Name of Event: N/A</Card.Text>
        <Card.Text>Date of Event N/A</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
        <ListGroup.Item>Location of Event: N/A</ListGroup.Item>
        <ListGroup.Item>Date of Event: N/A</ListGroup.Item>
        <ListGroup.Item>map: N/A</ListGroup.Item>
        <ListGroup.Item>Description of Event: N/A</ListGroup.Item>
        <ListGroup.Item>Effected People: N/A</ListGroup.Item>
        <ListGroup.Item>Source: N/A</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="outline-success">More Info</Button>{" "}
      </Card.Body>
    </Card>
  );
}

export default NewsCard;