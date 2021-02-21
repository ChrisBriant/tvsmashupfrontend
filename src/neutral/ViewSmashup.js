import {useContext, useEffect} from 'react';
import { useParams } from "react-router";
import Canvas from '../components/Canvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/SmashUpContext';

const ViewSmashUp = () => {
  const {getSmashup,state:{selectedSmashup,BASEURL}} = useContext(Context);
  console.log('Selected smashup', selectedSmashup);
  const { id } = useParams();

  console.log(id);

  useEffect( () => {
    getSmashup(id);
  },[]);

  return (
    selectedSmashup
    ?
    <Container>
      <Row>
        <Col><h1></h1></Col>
      </Row>
      <Row>
        <Col><h2><strong>Created by</strong></h2></Col>
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
        <p>put categories here</p>
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
