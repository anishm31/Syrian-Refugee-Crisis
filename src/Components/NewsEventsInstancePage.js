import React from "react";
import newsData from "../model_data/news_db.json";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


function NewsEventsInstancePage() {
    const params = useParams();
    const event = newsData.find(instance => instance.Title === params.id)
    return (
        <div>
            <Container className='mt-5' style={{width : "85%", textAlign : "center"}}>
                <div className="News/Events-info">
                    <Card style={{ width: "90%", textAlign: "center"}}>
                        <Card.Img
                            variant="top"
                            src={event.Image}
                            style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto"}}
                        />
                        <Card.Body style={{ textAlign: "left" }}>
                            <Card.Title>{event.Title}</Card.Title>
                            <Card.Text style={{ fontSize: "small" }}>Date of Event: {event.Date.toLocaleString()}</Card.Text>
                            <Card.Text>Location of Event: {event.attributes.PrimaryCountry.toLocaleString()}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Disaster Type: {event.attributes.DisasterType.toLocaleString()}</ListGroup.Item>
                            <ListGroup.Item>Source: {event.attributes.OtherSources}</ListGroup.Item>
                            <ListGroup.Item>Theme: {event.attributes.Themes.toLocaleString()}</ListGroup.Item>
                            <iframe title="Bing Video" src={event.attributes.Video.toLocaleString()} width="800" height="600" frameborder="0"></iframe>
                        </ListGroup>
                        <Card.Img
                            variant="bottom"
                            src={event.SecondImage}
                            style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto"}}
                        />
                    </Card>
                </div>
            </Container>
            <Container className="text-center my-5">
                <Row>
                    <Col>
                        <Card>
                            <Card.Header as="h5">Associated Charities</Card.Header>
                            <Card.Body>
                                {event.associatedCharities && event.associatedCharities.map((charity, index) => (
                                <Container key={index} className="my-3">
                                    <Link to={charity.link}>
                                    <Button variant="primary" className="btn w-100">
                                        {charity.name}
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
                                {event.associatedCountries && event.associatedCountries.map((country, index) => (
                                <Container key={index} className="my-3">
                                    <Link to={country.link}>
                                    <Button variant="primary" className="btn w-100">
                                        {country.name}
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