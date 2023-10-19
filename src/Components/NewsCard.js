import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from "axios";


function NewsCard(props) {
    const [locationCountryExists, setLocationCountryExists] = useState(false);
    const locationCountry = props.instance.primary_country;
  
    // Call API to determine if location is an instance in the Country model
    useEffect(() => {
      axios
        .get(`https://api.syrianrefugeecrisis.me/countries/${locationCountry}`)
        .then(() => {
          setLocationCountryExists(true);
        })
        .catch(() => {
          setLocationCountryExists(false);
        })
    }, [setLocationCountryExists, locationCountry]);

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
                <Card.Text style={{ fontSize: "small" }}>Date of News/Event: {event_date.toDateString()}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
                <ListGroup.Item>
                    {
                    locationCountryExists ?
                    <>Location of News/Event: <Link to={`/countries/${props.instance.primary_country}`}>{props.instance.primary_country}</Link></> 
                    :
                    <>Location of News/Event: {props.instance.primary_country}</>
                    }
                </ListGroup.Item>
                <ListGroup.Item>Source(s): {formatStringList(props.instance.sources)}</ListGroup.Item>
                <ListGroup.Item>Theme(s): {formatStringList(props.instance.themes)}</ListGroup.Item>
                <ListGroup.Item>Disaster Type: {formatStringList(props.instance.disaster_type)}</ListGroup.Item>
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
    if (stringList.length === 0)
        return "None";
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