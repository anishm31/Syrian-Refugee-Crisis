import React from "react";
import charityData from "../model_data/charity_db.json";
import { useParams } from 'react-router-dom';
import {Container, Card, ListGroup} from 'react-bootstrap';

function CharityInstancePage() {
    const params = useParams();
    const charity = charityData.find(instance => instance.name === params.id)
    const date_est = new Date(charity.attributes.established);
    return (
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
                        style={{objectFit: "cover", width: "100%", height: "100%", margin: "auto"}}
                    />
                </Card>
            </div>
        </Container>
        
    );
}

export default CharityInstancePage;
