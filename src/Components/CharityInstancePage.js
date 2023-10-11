import React from "react";
import charityData from "../model_data/charity_db.json";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

function CharityInstancePage() {
    const params = useParams();
    const charity = charityData.find(instance => instance.name === params.id)
    const date_est = new Date(charity.attributes.established);
    return (
        <div>
            <Container className='mt-5' style={{width: "85%", textAlign: "center"}}>
                <div className='charity-info'>
                    <Card style={{ width: "90%", textAlign: "center"}}>
                        <Card.Img
                            variant="top"
                            src={charity.attributes.logo_img}
                            style={{ objectFit : "cover", width: "20%", height: "20%", margin: "auto"}}
                        />
                        <Card.Body style={{ textAlign: "left" }}>
                            <Card.Title>{charity.name}</Card.Title>
                            <Card.Text>{charity.attributes.abbreviation}</Card.Text>
                            <Card.Text style={{ fontSize: "small" }}>Est: {date_est.getFullYear()}</Card.Text>
                            <Card.Text>Purpose: {charity.attributes.description} </Card.Text>
                            <a href={charity.attributes.website} class="card-link">Website</a>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Headquarters: {charity.attributes.headquarters}</ListGroup.Item>
                            <ListGroup.Item>Parent Organization: {charity.attributes.parent_org}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Text>Notable Awards:</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                        {charity.attributes.awards_received.map((award) => (
                                <ListGroup.Item>{award}</ListGroup.Item>))}
                        </ListGroup>
                        <Card.Img
                            variant="bottom"
                            src={charity.attributes.org_img}
                            style={{objectFit: "cover", width: "50%", height: "50%", margin: "auto"}}
                        />
                    </Card>
                </div>
            </Container>
            
            <Container className="text-center my-5">
                <Row>
                    <Col>
                        <Card>
                        <Card.Header as="h5">Associated Countries</Card.Header>
                        <Card.Body>
                            <Container className="my-3">
                                <Link
                                    to={`/countries/Turkey`}
                                >
                                    <Button 
                                        variant="primary"
                                        className="btn w-100"
                                    >
                                    Turkey
                                    </Button>
                                </Link>
                            </Container>
                            <Container className="my-3">
                                <Link
                                    to={`/countries/Turkey`}
                                >
                                    <Button 
                                        variant="primary"
                                        className="btn w-100"
                                    >
                                    Turkey
                                    </Button>
                                </Link>
                            </Container>
                            <Container className="my-3">
                                <Link
                                    to={`/countries/Turkey`}
                                >
                                    <Button 
                                        variant="primary"
                                        className="btn w-100"
                                    >
                                    Turkey
                                    </Button>
                                </Link>
                            </Container>

                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                        <Card.Header as="h5">Associated Countries</Card.Header>
                        <Card.Body>
                            <Container className="my-3">
                                <Link
                                    to={`/countries/Turkey`}
                                >
                                    <Button 
                                        variant="primary"
                                        className="btn w-100"
                                    >
                                    Turkey
                                    </Button>
                                </Link>
                            </Container>
                            <Container className="my-3">
                                <Link
                                    to={`/countries/Turkey`}
                                >
                                    <Button 
                                        variant="primary"
                                        className="btn w-100"
                                    >
                                    Turkey
                                    </Button>
                                </Link>
                            </Container>
                            <Container className="my-3">
                                <Link
                                    to={`/countries/Turkey`}
                                >
                                    <Button 
                                        variant="primary"
                                        className="btn w-100"
                                    >
                                    Turkey
                                    </Button>
                                </Link>
                            </Container>

                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default CharityInstancePage;
