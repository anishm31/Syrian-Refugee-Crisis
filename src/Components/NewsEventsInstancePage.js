import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import IFrame from "./IFrame";


function NewsEventsInstancePage() {
    const params = useParams();
    const [newsInstance, setNewsInstance] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Call the API to get the news instance data
    useEffect(() => {
        axios
            .get(`https://api.syrianrefugeecrisis.me/news-and-events/${params.id}`)
            .then((res) => {
                setNewsInstance(res.data.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log("Call to the API failed...", err);
            })
    }, [params.id]);

    // Verify that the charity data has been loaded before rendering main content
    if (!loaded) {
        return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
    }

    const eventDate = new Date(newsInstance.date);
    return (
        <div>
            <Container className='mt-5' style={{width : "85%", textAlign : "center"}}>
                <div className="News/Events-info">
                    <Card style={{ width: "90%", textAlign: "center"}}>
                        <Card.Img
                            variant="top"
                            src={newsInstance.image_url[0]}
                            style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto"}}
                        />
                        <Card.Body style={{ textAlign: "left" }}>
                            <Card.Title style={{fontWeight: "bold", fontSize: "25px"}}>{newsInstance.title}</Card.Title>
                            <Card.Text style={{ fontSize: "small" }}>Date of News/Event: {eventDate.toDateString()}</Card.Text>
                            <a href={newsInstance.org_link}>Link to Article</a>
                        </Card.Body>
                        <ListGroup style={{ textAlign: "left" }} className="list-group-flush">
                            <ListGroup.Item>Location of Event: {newsInstance.primary_country}</ListGroup.Item>
                            <ListGroup.Item>Country ISO Code: {newsInstance.country_iso3.toUpperCase()}</ListGroup.Item>
                        </ListGroup>
                        <ListGroup style={{ textAlign: "left" }} className="list-group-flush">
                            <ListGroup.Item>Source(s): </ListGroup.Item>
                            <ul style={{paddingLeft: "50px"}}>
                                {newsInstance.sources.map((source) => (
                                <li>{source.source_short_name}</li>))}
                            </ul>
                        </ListGroup>
                        <ListGroup style={{ textAlign: "left" }} className="list-group-flush">
                            <ListGroup.Item>Theme(s): </ListGroup.Item>
                            <ul style={{paddingLeft: "50px"}}>
                                {newsInstance.themes.map((theme) => (
                                <li>{theme}</li>))}
                            </ul>
                        </ListGroup>
                        <ListGroup style={{ textAlign: "left" }} className="list-group-flush">
                            <ListGroup.Item>Disaster Type: </ListGroup.Item>
                            <ul style={{paddingLeft: "50px"}}>
                                <li>{newsInstance.disaster_type.length > 0 ? newsInstance.disaster_type : "None"}</li>
                            </ul>
                        </ListGroup>
                        <IFrame src={newsInstance.video_url[0]} />
                    </Card>
                </div>
            </Container>
            <Container className="text-center my-5">
                <Row className="justify-content-md-center" xs={1} sm={2}>
                    <Col>
                        <Card>
                            <Card.Header as="h5">Associated Charities</Card.Header>
                            <Card.Body>
                                {newsInstance.relevant_charities && newsInstance.relevant_charities.map((charity, index) => (
                                <Container key={index} className="my-3">
                                    <Link to={`/charities/${charity.charity_name}`}>
                                    <Button variant="primary" className="btn w-100">
                                        {charity.charity_name}
                                    </Button>
                                    </Link>
                                </Container>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">Associated Countries</Card.Header>
                            <Card.Body>
                                {newsInstance.relevant_countries && newsInstance.relevant_countries.map((country, index) => (
                                <Container key={index} className="my-3">
                                    <Link to={`/countries/${country.country_name}`}>
                                    <Button variant="primary" className="btn w-100">
                                        {country.country_name}
                                    </Button>
                                    </Link>
                                </Container>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NewsEventsInstancePage;