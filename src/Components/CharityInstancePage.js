import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import VideoCarousel from "./VideoCarousel";
import axios from "axios";

function CharityInstancePage() {
    const params = useParams();
    const [charityInstance, setCharityInstance] = useState({});
    const [loaded, setLoaded] = useState(false);
    // Fetch charity data using API
    useEffect(() => {
        axios.get(`https://api.syrianrefugeecrisis.me/charities/${params.id}`)
        .then(res => {
            setCharityInstance(res.data.data);
            setLoaded(true)
        })
        .catch(err => {
            console.log("Call to the API failed...", err);
        })
    }, [params.id]);
    
    // Verify that the charity data has been loaded before rendering main content
    if (!loaded) {
        return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
    }
    const date_est = new Date(charityInstance.established);  
    return (
        <div>
            <Container className='mt-5' style={{width: "85%", textAlign: "center"}}>
                <div className='charity-info'>
                    <Card style={{ width: "90%", textAlign: "center"}}>
                        <Card.Img
                            variant="top"
                            src={charityInstance.logo_img}
                            style={{ objectFit : "cover", width: "20%", height: "20%", margin: "auto"}}
                        />
                        <Card.Body style={{ textAlign: "left" }}>
                            <Card.Title>{charityInstance.name}</Card.Title>
                            <Card.Text>{charityInstance.short_name}</Card.Text>
                            <Card.Text style={{ fontSize: "small" }}>Est: {date_est.getFullYear()}</Card.Text>
                            <Card.Text>Purpose: {charityInstance.description} </Card.Text>
                            <a href={charityInstance.website} class="card-link">Website</a>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Headquarters: {charityInstance.headquarters}</ListGroup.Item>
                            <ListGroup.Item>Parent Organization: {charityInstance.parent_org}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Text>Notable Awards:</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                        {charityInstance.awards_received.map((award) => (
                                <ListGroup.Item>{award.award_name}</ListGroup.Item>))}
                        </ListGroup>
                        <Card.Body>
                            <VideoCarousel youtubeInfo={charityInstance.youtube_info} />
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            
            <Container className="text-center my-5">
                <Row xsm={1} sm={2} md={2}>
                    <Col>
                        <Card>
                            <Card.Header as="h5">Associated Countries</Card.Header>
                            <Card.Body>
                                {charityInstance.relevant_countries && charityInstance.relevant_countries.map((country, index) => (
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
                    <Col>
                        <Card>
                            <Card.Header as="h5">Associated News/Events</Card.Header>
                            <Card.Body>
                                {charityInstance.relevant_news_events && charityInstance.relevant_news_events.map((event, index) => (
                                <Container key={index} className="my-3">
                                    <Link to={`/news-and-events/${event.news_event_title}`}>
                                    <Button variant="primary" className="btn w-100">
                                        {event.news_event_title}
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

export default CharityInstancePage;
