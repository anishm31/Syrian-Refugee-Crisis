import React from "react";
import Card from "react-bootstrap/Card";

function TeamCard(props) {
  return (
    <Card data-testid="dev-card" className="card h-100">
      <Card.Img variant="top" src={props.image}></Card.Img>
      <Card.Body>
        <Card.Title>
          <h5>{props.name}</h5>
        </Card.Title>
        <h6>
          <Card.Text>@{props.user}</Card.Text>
        </h6>
        <h6>
          <Card.Text>{props.role}</Card.Text>
        </h6>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Commits: </small>
        <small>{props.commits}</small>
        <br></br>
        <small className="text-muted">Issues: </small>
        <small>{props.issues}</small>
      </Card.Footer>
    </Card>
  );
}

export default TeamCard;
