import {useState, useContext} from 'react';
import {withRouter} from 'react-router';
import AutoComplete from '../components/AutoComplete';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {Context} from '../context/SmashUpContext';
import {Context as UIContext} from '../context/UIControlContext';
import CategoryInput from '../components/CategoryInput';
import MessageModal from '../components/MessageModal';
import {isValidSmashUp} from '../helpers/validation';
import Spacer from '../components/Spacer';

const AddSmashup = (props) => {
  const {createSmashup, state: {showVs, errorMessage}} = useContext(Context);
  const {state: {catList}} = useContext(UIContext);
  const [newId,setNewId] = useState(0);
  const [newCreated,setNewCreated] = useState(true);
  const [success,setSuccess] = useState(false);

  const submitSmashup = async () => {
    let payload = {
        show1: showVs.show1.id,
        show2: showVs.show2.id,
        categories: catList
    }
    if (isValidSmashUp(payload)) {
      await createSmashup(payload).then(success => {
        if(success.created) {
          setNewId(success.id);
          setNewCreated(true);
          setSuccess(success.created);
        }
      });
    }
  }

  const submitSuccessAction = () => {
    props.history.push(`/viewsmashup/${props.smashupId}`);
  }

  const goToSmashup = () => {
    props.history.push('/viewsmashup/'+newId);
  }

  return (
    <>
      {
        success
        ? <MessageModal
          smashupId={newId}
          show={success}
          title="Success"
          message="Smashup has successfully been added."
          okAction={submitSuccessAction}
        />
        : null
      }
      {
        !newCreated
        ? <>
          <Spacer height="1rem" />
          <Container className="panel">
            <Row>
              <Col>
                <h1>Add a New Smashup</h1>
              </Col>
            </Row>
            <Spacer height="1rem" />
            <Row>
              <Col md="1"></Col>
              <Col md="10"><h2>Successfully Added New Smashup</h2></Col>
              <Col md="1"></Col>
            </Row>
            <Spacer height="1rem" />
            <Row>
              <Col md="2"></Col>
              <Col md="4">
                <Button onClick={() => {setNewCreated(false)}}>Add Another</Button>
              </Col>
              <Col md="4">
                <Button onClick={goToSmashup}>View Smashup</Button>
              </Col>
              <Col md="2"></Col>
            </Row>
            <Spacer height="1rem" />
          </Container>
          <Spacer height="1rem" />
        </>
        : <>
          <Spacer height="1rem" />
          <Container className="panel">
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
            <Row>
              <Col>
                <p className="error">{errorMessage}</p>
              </Col>
            </Row>
          </Container>
          <Spacer height="1rem" />
        </>
      }
    </>
  );
}

export default withRouter(AddSmashup);
