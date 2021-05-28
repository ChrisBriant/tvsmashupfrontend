import {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Rating from '../components/Rating';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/SmashUpContext';
import {Context as AuthContext} from '../context/AuthContext';

const RatingModal = props => {
  const [showRatings,setShowRatings] = useState({
    show_1 : null,
    show_2 : null
  });
  const {addRating} = useContext(Context);
  const {state:{authed}} = useContext(AuthContext);

  const resetRatingsAndToggle = () => {
    setShowRatings({
      show_1 : null,
      show_2 : null
    });
    props.toggle();
  }

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
    addRating(payload,authed);
    resetRatingsAndToggle();
  }



  const updateRating = (id,rating) => {
    let newShowRatings = {...showRatings};
    if(props.show1.id === id) {
      newShowRatings.show_1 = {id: id, rating: rating};
    } else {
      newShowRatings.show_2 = {id: id, rating: rating};
    }
    setShowRatings(newShowRatings);
  }


  return (
    <>
      <div className="modal-80w">
        <Modal
          show={props.show}
          onHide={resetRatingsAndToggle}
          dialogClassName="modal-80w"
          >
          <Modal.Header closeButton>
            <Modal.Title>{props.selectedCategory.category}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col><p>Rate the two shows against each other!</p></Col>
              </Row>
              <Row>
                <Col md="3">
                  <Row><Col>{props.show1.name}</Col></Row>
                </Col>
                <Col md="2">
                  <Row><Col><Rating id={props.show1.id} updateRating={updateRating}/></Col></Row>
                </Col>
                <Col md="2"><h2>Vs</h2></Col>
                <Col md="3">
                  <Row><Col>{props.show2.name}</Col></Row>
                </Col>
                <Col md="2">
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
      </div>
    </>
  );
}

export default RatingModal;
