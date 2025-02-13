import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from "axios";
import Highlighter from "react-highlight-words";
import "../CSS/NewsCard.css";


function NewsCard(props) {
    const [locationCountryExists, setLocationCountryExists] = useState(false);
    const locationCountry = props.instance.primary_country;

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
                <Card.Title>{highlightSearchTerms(props.instance.title)}</Card.Title>
                <Card.Text style={{ fontSize: "small" }}>Date of News/Event: {highlightSearchTerms(event_date.toDateString())}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{ textAlign: "left" }}>
                <ListGroup.Item>
                    {
                    locationCountryExists ?
                    <>Location of News/Event: <Link to={`/countries/${props.instance.primary_country}`}>{highlightSearchTerms(props.instance.primary_country)}</Link></> 
                    :
                    <>Location of News/Event: {highlightSearchTerms(props.instance.primary_country)}</>
                    }
                </ListGroup.Item>
                <ListGroup.Item>Source(s): 
                    <ul className="sources-list" style={{display: "inline"}}>
                        {
                            props.instance.sources.map((source) => (
                                source.in_db ?
                                (<li style={{display: "inline"}}>
                                    <Link to={`/charities/${source.source_reg_name}`}>{highlightSearchTerms(source.source_short_name)}</Link>
                                </li>)
                                :
                                (<li style={{display: "inline"}}>
                                    {highlightSearchTerms(source.source_short_name)}
                                </li>)
                            ))
                        }
                    </ul>
                </ListGroup.Item>
                <ListGroup.Item>Theme(s): {highlightSearchTerms(formatStringList(props.instance.themes))}</ListGroup.Item>
                <ListGroup.Item>Disaster Type: {highlightSearchTerms(formatStringList(props.instance.disaster_type))}</ListGroup.Item>
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