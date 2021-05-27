import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router';
import vs from '../assets/vs.svg';
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
import RatingModal from '../components/RatingModal';

const ViewSmashUp = () => {
  const {getSmashup,resetSmashup,state:{successMessage,errorMessage,selectedSmashup,BASEURL}} = useContext(Context);
  const {isAuthed,state:{authed,userId}} = useContext(AuthContext);
  const {addToCatList, removeFromCatList, state:{catList}} = useContext(Context);

  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState({})
  const [showRatingModal, setShowRatingModal] = useState(false);
  console.log('Selected smashup', selectedSmashup);
  const { id } = useParams();

  console.log('Here is the id',id);

  useEffect( async () => {
    resetSmashup();
     await getSmashup(id,authed);
  },[]);

  const setUpdated = () => {
    setEditMode(!editMode);
  }

  const showRatingBox = (cat) => {
    setSelectedCategory(cat)
    setShowRatingModal(true);
  }

  const hideRatingBox = () => {
    setShowRatingModal(false);
  }

  // if(selectedSmashup.creator.id === userId) {
  //   console.log('I am me');
  // }

  console.log('authed',authed,userId, selectedSmashup);

  return (
    selectedSmashup
    ?
    <Container>
      <RatingModal
        show={showRatingModal}
        toggle={() => {setShowRatingModal(!showRatingModal)}}
        selectedCategory = {selectedCategory}
        show1 = {selectedSmashup.show1}
        show2 = {selectedSmashup.show2}
      />
      <Spacer height="1rem" />
      <div className="panel">
          <Row>
            <Col><h1>{selectedSmashup.show1.name}</h1></Col>
            <Col><img alt="vs image" src={vs} className="vsimg-small"/></Col>
            <Col><h1>{selectedSmashup.show2.name}</h1></Col>
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
                width="400"
                height="200"
                img1={BASEURL+selectedSmashup.show1.tv_image.picture}
                img2={BASEURL+selectedSmashup.show2.tv_image.picture}
              />
            </Col>
          </Row>
        <Spacer height="2rem" />
        {
          selectedSmashup.categories.length > 0
          ?
          <div className="panel">
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
                  ? <EditCategories
                        categories={selectedSmashup.categories}
                        smashupId={selectedSmashup.id}
                        setUpdated={setUpdated}
                        />
                  :
                    <>
                      <Row className="left-align-cols">
                        <Col><strong>Category</strong></Col>
                        <Col><strong>{selectedSmashup.show1.name}</strong></Col>
                        <Col><strong>{selectedSmashup.show2.name}</strong></Col>
                        <Col><strong>Total Ratings</strong></Col>
                        <Col><strong>Winner</strong></Col>
                        <Col></Col>
                      </Row>
                      {
                        selectedSmashup.categories.map( (cat) => (
                          <Row key={cat.id} className="left-align-cols">
                            <Col>
                              <p>{cat.category}</p>
                            </Col>
                            <Col>
                              <Rating presentation={true} rating={cat.show_1_average_rating.show_1_rating__rating__avg}/>
                            </Col>
                            <Col>
                              <Rating presentation={true} rating={cat.show_2_average_rating.show_2_rating__rating__avg}/>
                            </Col>
                            <Col>
                              <p>{cat.rating_count}</p>
                            </Col>
                            <Col>
                              {
                                cat.show_1_average_rating.show_1_rating__rating__avg === cat.show_2_average_rating.show_2_rating__rating__avg
                                ? <p>Draw</p>
                                :
                                  <>
                                    {
                                      cat.show_1_average_rating.show_1_rating__rating__avg > cat.show_2_average_rating.show_2_rating__rating__avg
                                      ? <p>{selectedSmashup.show1.name}</p>
                                      : <p>{selectedSmashup.show2.name}</p>
                                    }
                                  </>
                              }

                            </Col>
                            <Col>
                              {
                                cat.already_rated
                                ? <p>Already rated</p>
                                : <a href='#' onClick={() => {showRatingBox(cat)}}>Rate</a>
                              }
                            </Col>
                          </Row>
                        ))
                      }
                    </>
                }
              </Col>
            </Row>
          </div>
          : <>  
              <Row><Col><h2>No categories exist for this smashup</h2></Col></Row> 
              <Row>
                  <Col><Button onClick={() => setAddMode(!addMode)}>{addMode ? "Cancel" : "Add Categories"  }</Button></Col>
              </Row>
              {
                addMode
                ? <>
                  <Row>
                    <Col>
                      <Spacer height="1rem"/>
                      <EditCategories
                              categories={selectedSmashup.categories}
                              smashupId={selectedSmashup.id}
                              setUpdated={setUpdated}
                              />
                    </Col>
                  </Row>
                </>
                : null
              }
            </>
        }
        <Spacer height="1rem" />
        <Row>
          <Col>{errorMessage}</Col>
        </Row>
        <Row>
          <Col>{successMessage}</Col>
        </Row>
      </div>
      <Spacer height="1rem" />
    </Container>
    :
    <>
      <Spacer height="1rem" />
      <Container className="panel">
        <Spacer height="1rem" />
        <Row><Col><h2>No smashup is selected</h2></Col></Row>
        <Spacer height="1rem" />
      </Container>
      <Spacer height="1rem" />
    </>
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
