import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Canvas from '../components/Canvas';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Context} from '../context/SmashUpContext';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UIContext} from '../context/UIControlContext';
import Rating from '../components/Rating';
import EditCategories from '../components/EditCategories';
import Spacer from '../components/Spacer';

const ViewSmashUp = () => {
  const {getSmashup,resetSmashup,state:{selectedSmashup,BASEURL}} = useContext(Context);
  const {isAuthed,state:{authed,userId}} = useContext(AuthContext);
  const {addToCatList, removeFromCatList, state:{catList}} = useContext(Context);

  const [editMode, setEditMode] = useState(false);
  console.log('Selected smashup', selectedSmashup);
  const { id } = useParams();

  console.log(id);

  useEffect( () => {
    resetSmashup();
    getSmashup(id);
  },[]);



  // if(selectedSmashup.creator.id === userId) {
  //   console.log('I am me');
  // }

  console.log('authed',authed,userId, selectedSmashup);

  return (
    selectedSmashup
    ?
    <Container>
      <Row>
        <Col><h1>{selectedSmashup.show1.name} Vs {selectedSmashup.show2.name}</h1></Col>
      </Row>
      <Row>
        {
          authed && userId === selectedSmashup.creator.id
          ? <Col><h2>Created by You</h2></Col>
          : <Col><h2>Created by {selectedSmashup.creator.name}</h2></Col>
        }
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
      {
        authed && userId === selectedSmashup.creator.id
        ? <Row>
            <Col><Button onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : "Edit Categories"  }</Button></Col>
          </Row>
        : null
      }
      <Spacer height="1rem"/>
      <Row>
        <Col>
          {
            editMode
            ? <EditCategories  categories={selectedSmashup.categories}/>
            :
              <>
                {
                  selectedSmashup.categories.map( (cat) => (
                    <Row key={cat.id}>
                      <Col>
                        <p>{cat.category}</p>
                      </Col>
                      <Col>
                        <Rating presentation={true} rating={cat.average_rating.rating__avg}/>
                      </Col>
                    </Row>
                  ))
                }
              </>
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
