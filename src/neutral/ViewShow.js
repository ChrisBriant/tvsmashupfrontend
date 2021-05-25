import {useContext,useEffect} from 'react';
import {withRouter, useParams} from 'react-router';
import {Context} from '../context/SmashUpContext';
import Canvas from '../components/Canvas';
import Spacer from '../components/Spacer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ViewShow = (props) => {
  const { id } = useParams();
  const {searchByShowId,setCurrentShow, state: {show,smashups,BASEURL}} = useContext(Context);

  //// TODO: Display TV Show detail and Get the smashups by TV show
  //const {getSmashupsByShow, state: {searchResults,BASEURL}} = useContext(Context);

  useEffect( () => {
    searchByShowId(id);
    console.log('Here', show);
  },[]);

  const viewSmashUp = (e,id) => {
    e.preventDefault();
    console.log('Smashup ID', id);
    props.history.push(`/viewsmashup/${id}`);
  }


  return (
    <div>
      <Spacer height="1rem" />
      <div className="panel">
        {
          show
          ? <>
            <Row>
              <Col><h1>{show.shows[0].name}</h1></Col>
            </Row>
            <Row>
              <Col>
                {
                  show.shows[0].tv_image
                  ? <img alt={show.shows[0].name} className='image-lg' src={BASEURL+show.shows[0].tv_image.picture} />
                  : null
                }
              </Col>
            </Row>
            {
              show.smashups.length > 0
              ? <>
                <Row>
                  <Col md="4"></Col>
                  <Col md="4"><h2>Smashups</h2></Col>
                  <Col md="4"></Col>
                </Row>
                <Row>
                  <Col>
                    {
                      show.smashups.map((smashup) => (
                        <div key={smashup.id}>
                          <Spacer height="1rem" />
                          <Row>
                            <Col>
                              <Canvas
                                id={smashup.id}
                                width="200"
                                height="100"
                                img1={BASEURL+smashup.show1.tv_image.picture}
                                img2={BASEURL+smashup.show2.tv_image.picture}
                              />
                            </Col>
                            <Col>
                              <Row>
                                <Col>
                                  <h4>{smashup.show1.name} Vs {smashup.show2.name}</h4>
                                </Col>
                              </Row>
                              <Row>
                                <Col><p><strong>Number of categories </strong>{smashup.categories.length}</p></Col>
                              </Row>
                              <Row>
                                <Col><a href="#" onClick={(e) => viewSmashUp(e,smashup.id)}>View</a></Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      ))
                    }
                  </Col>
                </Row>
              </>
              : <>
                <Spacer height="1rem" />
                <h4>No smashups exist for this TV Show, click <a href="/addsmashup">here</a> to create one.</h4>
              </>
            }

          </>
          : null
        }
      </div>
      <Spacer height="1rem" />
    </div>
  );
}

export default withRouter(ViewShow);
