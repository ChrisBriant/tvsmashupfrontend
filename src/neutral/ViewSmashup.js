import {useContext, useEffect} from 'react';
import { useParams } from 'react-router';
import Canvas from '../components/Canvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/SmashUpContext';
import Rating from '../components/Rating';

const ViewSmashUp = () => {
  const {getSmashup,resetSmashup,state:{selectedSmashup,BASEURL}} = useContext(Context);
  console.log('Selected smashup', selectedSmashup);
  const { id } = useParams();

  console.log(id);

  useEffect( () => {
    resetSmashup();
    getSmashup(id);
  },[]);

  return (
    selectedSmashup
    ?
    <Container>
      <Row>
        <Col><h1>{selectedSmashup.show1.name} Vs {selectedSmashup.show2.name}</h1></Col>
      </Row>
      <Row>
        <Col><h2>Created by {selectedSmashup.creator.name}</h2></Col>
      </Row>
      <Row>
        <Col>
          <Canvas
            width="200"
            height="100"
            img1={BASEURL+selectedSmashup.show1.tv_image.picture}
            img2={BASEURL+selectedSmashup.show2.tv_image.picture}
          />
        </Col>
      </Row>
      <Row><Col><h2>Categories</h2></Col></Row>
      <Row>
      <Col>
      {
        selectedSmashup.categories.map( (cat) => (
          <Row key={cat.id}>
            <Col>
              <p>{cat.category}</p>
            </Col>
            <Col>
              <Rating />
            </Col>
          </Row>
        ))
      }
      </Col>
      </Row>
    </Container>
    :
    <Container>
      <Row><Col><p>No smashup is selected</p></Col></Row>
    </Container>
  );
}

export default ViewSmashUp;


// {
//   selectedSmashup.categories.map( (cat) => (
//     <Row key={cat.id}>
//       <Col>
//         <p>cat.Category</p>
//       </Col>
//     </Row>
//   ))
// }
