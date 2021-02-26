import {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RatingModal = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveRating = () => {
    props.toggle();
  }

  useEffect( () => {
    //resetSmashup();
  },[]);

  return (
    <>
      <Modal show={props.show} onHide={props.toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Rate the two shows against each other!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.toggle}>
            Cancel
          </Button>
          <Button onClick={handleSaveRating}>
            Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RatingModal;
