import AutoComplete from '../components/AutoComplete';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AddSmashup = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Add a New Smashup</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AutoComplete
            label="First Show"
            placeholder="Start typing the name of a show"
            ariaLabel="First Show"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AddSmashup;
