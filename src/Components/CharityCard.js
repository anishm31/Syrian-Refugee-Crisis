import React, {useEffect, useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";

function CharityCard(props) {
  const [hqExists, setHQExists] = useState(false);
  const hqCountry = props.instance.hq_country;

  // Call API to determine if hqCountry is an instance in the Country model
  useEffect(() => {
    axios
      .get(`https://api.syrianrefugeecrisis.me/countries/${hqCountry}`)
      .then(() => {
        setHQExists(true);
      })
      .catch(() => {
        setHQExists(false);
      })
  }, [setHQExists, hqCountry]);

  const date_est = new Date(props.instance.established);
  return (
    <Card style={{ width: "90%" }}>
    <Card.Img
      className="border"
      variant="top"
      src={props.instance.logo_img}
      style={{ objectFit : "fit", width: "100%", height: "200px", border: "1px solid black"}}
    />
    <Card.Body style={{ textAlign: "left" }}>
      <Card.Title>{props.instance.name}</Card.Title>
      <Card.Text style={{ fontSize: "small" }}>Est: {date_est.getFullYear()}</Card.Text>
      <Card.Text>Relief Provided: {formatReliefTypes(props.instance.relief_provided)} </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
      <ListGroup.Item>
        {
          hqExists ?
          <>Headquarters: <Link to={`/countries/${props.instance.hq_country}`}>{props.instance.hq_country}</Link></> 
          :
          <>Headquarters: {props.instance.hq_country}</>
        }
      </ListGroup.Item>
      <ListGroup.Item>Number of Awards: {props.instance.awards_received.length}</ListGroup.Item>
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