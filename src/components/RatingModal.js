import {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Rating from '../components/Rating';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/SmashUpContext';

const RatingModal = props => {
  const [show, setShow] = useState(false);
  const [showRatings,setShowRatings] = useState({
    show_1 : null,
    show_2 : null
  });
  const {addRating} = useContext(Context);

  const resetRatingsAndToggle = () => {
    setShowRatings({
      show_1 : null,
      show_2 : null
    });
    props.toggle();
  }

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const handleSaveRating = () => {
    let newShowRatings = {...showRatings}
    //Set default rating to one star if not set
    if(!newShowRatings.show_1) {
      newShowRatings.show_1 = {id:props.show1.id,rating:1}
    }
    if(!newShowRatings.show_2) {
      newShowRatings.show_2 = {id:props.show2.id,rating:1}
    }

    let payload = {
      id: props.selectedCategory.id,
      ...newShowRatings
    }
    console.log('RATING PAYLOAD', payload);
    addRating(payload);
    resetRatingsAndToggle();
  }



  const updateRating = (id,rating) => {
    console.log('UPDATE RATING', id, rating);
    let newShowRatings = {...showRatings};
    if(props.show1.id === id) {
      newShowRatings.show_1 = {id: id, rating: rating};
    } else {
      newShowRatings.show_2 = {id: id, rating: rating};
    }
    setShowRatings(newShowRatings);
  }

  console.log('CATEGORY', props.selectedCategory);

  return (
    <>
      <Modal show={props.show} onHide={resetRatingsAndToggle}>
        <Modal.Header closeButton>
          <Modal.Title>{props.selectedCategory.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col><p>Rate the two shows against each other!</p></Col>
            </Row>
            <Row>
              <Col>
                <Row><Col>{props.show1.name}</Col></Row>
              </Col>
              <Col>
                <Row><Col><Rating id={props.show1.id} updateRating={updateRating}/></Col></Row>
              </Col>
              <Col><h2>Vs</h2></Col>
              <Col>
                <Row><Col>{props.show2.name}</Col></Row>
              </Col>
              <Col>
                <Row><Col><Rating id={props.show2.id} updateRating={updateRating}/></Col></Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={resetRatingsAndToggle}>
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
