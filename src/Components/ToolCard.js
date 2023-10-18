import React from 'react';
import Card from 'react-bootstrap/Card';

function ToolCard (props) {
  return (
    <Card data-testid="tool-card" className="card h-100">
        <a href={props.link}><Card.Img variant="top" src={props.image}></Card.Img></a>
        <Card.Body>
            <Card.Title><h5>{props.name}</h5></Card.Title>
            <Card.Text>{props.desc}</Card.Text>
        </Card.Body>
    </Card>
);
}

export default ToolCard;