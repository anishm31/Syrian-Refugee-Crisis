import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";


function CountryCard(props) {

  // Function to handle highlighting of search terms in results
  const highlightSearchTerms = (textToHighlight) => {
    // If no search performed, return the text as is
    if (!props.searchQuery) return textToHighlight;

    // Else, return the text with the search terms highlighted
    return (
      <Highlighter
        searchWords={props.searchQuery.split(" ")}
        autoEscape={true}
        textToHighlight={textToHighlight}
      />
    )
  }

  return (
    <Card style={{ width: "90%" }}>
      <Card.Img
        variant="top"
        src={props.instance.flag_url}
        style={{ objectFit : "cover", width: "100%", height: "200px"}}
      />
      <Card.Body style={{ textAlign: "left" }}>
        <Card.Title>{highlightSearchTerms(props.instance.name)}</Card.Title>
        <Card.Text style={{ fontSize: "small" }}>ISO Code: {highlightSearchTerms(props.instance.country_iso3)}</Card.Text>
        <Card.Text>Total Syrian Refugees: {props.instance.num_refugees.toLocaleString()}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
        <ListGroup.Item>Total Asylum Decisions: {props.instance.num_asylum_decisions.toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Year of Decisions: {highlightSearchTerms(props.instance.year_of_decisions.toString())}</ListGroup.Item>
        <ListGroup.Item>Number Granted Asylum: {props.instance.num_recognized.toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Number Rejected: {props.instance.num_apps_rejected.toLocaleString()}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="outline-success">
          <Link 
            style={{ color: "black", textDecoration: "inherit"}}
            to={`/countries/${props.instance.name}`}>
          More Info
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CountryCard;