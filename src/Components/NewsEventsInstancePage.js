import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";


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
                            <Card.Title>{newsInstance.title}</Card.Title>
                            <Card.Text style={{ fontSize: "small" }}>Date of News/Event: {eventDate.toDateString()}</Card.Text>
                            <Card.Text>Location of Event: {newsInstance.primary_country}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Source(s): {formatStringList(newsInstance.sources)}</ListGroup.Item>
                            <ListGroup.Item>Theme(s): {formatStringList(newsInstance.themes)}</ListGroup.Item>
                            <iframe title="Bing Video" src={newsInstance.video_url[0]} width="800" height="600" frameborder="0"></iframe>
                        </ListGroup>
                    </Card>
                </div>
            </Container>
            <Container className="text-center my-5">
                <Row>
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

function formatStringList(stringList) {
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

export default NewsEventsInstancePage;