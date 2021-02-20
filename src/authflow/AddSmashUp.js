import {useState, useContext} from 'react';
import AutoComplete from '../components/AutoComplete';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {Context} from '../context/SmashUpContext';
import {Context as UIContext} from '../context/UIControlContext';
import CategoryInput from '../components/CategoryInput';
import {isValidSmashUp} from '../helpers/validation';

const AddSmashup = () => {
  const {state: {showVs, errorMessage}} = useContext(Context);
  const {state: {catList}} = useContext(UIContext);

  console.log('CAT LIST',catList);

  const submitSmashup = async () => {
    console.log(showVs);
    let payload = {
        show1: showVs.show1.id,
        show2: showVs.show2.id,
        categories: catList
    }
    console.log(isValidSmashUp(payload));
    //createSmashup();
  }

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
      <Row><Col>{errorMessage}</Col></Row>
      {
        showVs.show1.name !== '' && showVs.show2.name !== ''
        ?
          <>
            <Row>
              <Col>
                <h2>Add Categories</h2>
                <p>Add categories below to judge your two shows. People can view these
                categories and rate them. This will determine which show wins based on your
                chosen categories.</p>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <p>Examples: </p>
                <ul>
                  <li>Best lead actor</li>
                  <li>Strongest plot</li>
                  <li>Replay value</li>
                </ul>
              </Col>
              <Col md={8}>
                <CategoryInput />
              </Col>
            </Row>
          </>
        : null
      }
      <Row>
        <Col>
          <Button onClick={submitSmashup}>Create Smashup</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddSmashup;
