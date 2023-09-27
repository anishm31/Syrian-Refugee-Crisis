import React from "react";
import countryData from "../model_data/country_db.json";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup} from 'react-bootstrap';

function CountryInstancePage() {
    const params = useParams();
    const country = countryData.find(instance => instance.country === params.id)
    return (
        <Container className='mt-5' style={{width: "85%", textAlign: "center"}}>
            <div className="country-info">
                <Card style={{ width: "90%", textAlign: "center"}}>
                    <Card.Img
                        variant="top"
                        src={country.flag_url}
                        style={{ objectFit : "cover", width: "50%", height: "50%", margin: "auto"}}
                    />
                    <Card.Body style={{ textAlign: "left" }}>
                        <Card.Title>{country.country}</Card.Title>
                        <Card.Text style={{ fontSize: "small" }}>ISO Code: {country.country_iso3}</Card.Text>
                        <Card.Text>Total Syrian Refugees: {country.attributes.num_refugees.toLocaleString()}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Total Asylum Decisions: {country.attributes.num_asylum_decisions.toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Year of Decisions: {country.attributes.year_of_decisions}</ListGroup.Item>
                        <ListGroup.Item>Number Granted Asylum: {country.attributes.num_recognized.toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Number Rejected: {country.attributes.num_apps_rejected.toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Number Closed: {country.attributes.num_closed.toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Other: {country.attributes.num_other.toLocaleString()}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </Container>
      );
}

export default CountryInstancePage;
