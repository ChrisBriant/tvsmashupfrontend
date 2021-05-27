import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MessageModal = props => {
  const [show, setShow] = useState(props.show);


  return (
    <>
      <div className="modal-20w">
        <Modal
          show={show}
          dialogClassName="modal-20w"
          >
          <Modal.Header>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col><p>{props.message}</p></Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShow(false)}
                block
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default MessageModal;
