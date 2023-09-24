import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InstanceGrid(props) {
  const instanceList = require('./country_data.json');
  return (
    <Container fluid className="mt-5">
      <div className="title-holder mb-3">
        <h3>{instanceList.length} Instances</h3>
      </div>
      <Row className='d-flex justify-content-center'>
        {instanceList.map((instance) => {
          return (
            <Col className="mb-3" key={instance.id}>
              <props.modelCard instance={instance} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default InstanceGrid;