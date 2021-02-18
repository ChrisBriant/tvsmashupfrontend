import {useState, useContext} from 'react';
import AutoComplete from '../components/AutoComplete';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/SmashUpContext';

const AddSmashup = () => {
  const {state: {showVs}} = useContext(Context);

  console.log('SHOW VS',showVs);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add a New Smashup</h1>
        </Col>
      </Row>
      <Row>
        <Col><h2>{showVs.show1.name}</h2></Col><Col><h2>Vs</h2></Col><Col><h2>{showVs.show2.name}</h2></Col>
      </Row>
      <Row>
        <Col>
          <AutoComplete
            label="First Show"
            placeholder="Start typing the name of a show"
            ariaLabel="First Show"
            shownumber={1}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <AutoComplete
            label="Second Show"
            placeholder="Start typing the name of a show"
            ariaLabel="Second Show"
            shownumber={2}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AddSmashup;
