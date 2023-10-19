import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import CountryMap from "./CountryMap";
import axios from "axios";

function CountryInstancePage() {
    const params = useParams();
    const [countryInstance, setCountryInstance] = useState({});
    const [loaded, setLoaded] = useState(false);
    // Fetch country data using API
    useEffect(() => {
        axios.get(`https://api.syrianrefugeecrisis.me/countries/${params.id}`)
        .then(res => {
            setCountryInstance(res.data.data);
            setLoaded(true)
        })
        .catch(err => {
            console.log("Call to the API failed...", err);
        })
    }, [params.id]);

    // Verify that the country data has been loaded before rendering main content
    if (!loaded) {
        return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
    }
    return (
        <div>
            <Container className='mt-5' style={{width: "85%", textAlign: "center"}}>
                <div className="country-info">
                    <Card style={{ width: "90%", textAlign: "center"}}>
                        <Card.Img
                            variant="top"
                            src={countryInstance.flag_url}
                            style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto",
                                     border: "1px solid black"}}
                        />
                        <Card.Body style={{ textAlign: "left" }}>
                            <Card.Title style={{fontWeight: "bold", fontSize: "25px"}}>{countryInstance.name}</Card.Title>
                            <Card.Text style={{ fontSize: "small" }}>ISO Code: {countryInstance.country_iso3}</Card.Text>
                            <Card.Text>Capital: {formatStringList(countryInstance.capital)}</Card.Text>
                            <Card.Text></Card.Text>
                            <Card.Text style={{fontSize: "20px"}}>{'\n'}Refugee Statistics:</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Total Syrian Refugees: {countryInstance.num_refugees.toLocaleString()}</ListGroup.Item>
                            <ListGroup.Item>Total Asylum Decisions: {countryInstance.num_asylum_decisions.toLocaleString()}</ListGroup.Item>
                            <ListGroup.Item>Year of Decisions: {countryInstance.year_of_decisions}</ListGroup.Item>
                            <ListGroup.Item>Number Granted Asylum: {countryInstance.num_recognized.toLocaleString()}</ListGroup.Item>
                            <ListGroup.Item>Number Rejected: {countryInstance.num_apps_rejected.toLocaleString()}</ListGroup.Item>
                            <ListGroup.Item>Number Closed: {countryInstance.num_closed.toLocaleString()}</ListGroup.Item>
                            <ListGroup.Item>Other: {countryInstance.num_other.toLocaleString()}</ListGroup.Item>
                        </ListGroup>
                        <CountryMap mapInfo={countryInstance.map_info}/>
                    </Card>
                </div>
            </Container>
            <Container className="text-center my-5">
                <Row className="justify-content-md-center" xs={1} sm={2}>
                    <Col>
                        <Card>
                            <Card.Header as="h5">Associated Charities</Card.Header>
                            <Card.Body>
                                {countryInstance.relevant_charities && countryInstance.relevant_charities.map((charity, index) => (
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
                            <Card.Header as="h5">Associated News/Events</Card.Header>
                            <Card.Body>
                                {countryInstance.relevant_news_events && countryInstance.relevant_news_events.map((event, index) => (
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

export default CountryInstancePage;
