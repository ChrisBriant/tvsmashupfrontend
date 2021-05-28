import {useContext,useEffect} from 'react';
import {withRouter, useParams} from 'react-router';
import {Context} from '../context/SmashUpContext';
import Canvas from '../components/Canvas';
import Spacer from '../components/Spacer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SearchResults = (props) => {
  const { searchStr } = useParams();
  const {search, setCurrentShow, state: {searchResults,BASEURL}} = useContext(Context);


  useEffect( () => {
    search(searchStr);
  },[]);

  const viewSmashUp = (e,id) => {
    e.preventDefault();
    props.history.push(`/viewsmashup/${id}`);
  }

  const goToShow = (e,id) => {
    e.preventDefault();
    props.history.push(`/viewshow/${id}`);
  }


  return (
    <>
      <Spacer height="1rem" />
      <Container className="panel">
        <Row><Col><h1>Search Results</h1></Col></Row>
        <Row>
          <Col>
            <Row><Col><h2>TV Shows</h2></Col></Row>
            {
              searchResults
              ? <>
                {  searchResults.shows.length <= 0
                  ? <Row><Col><h4>No shows were found</h4></Col></Row>
                  : <>
                    {
                      searchResults.shows.map((show) => (
                        <div key={show.id}>
                          <Spacer height="1rem" />
                          <Row>
                            <Col>
                              <Row>
                                <Col><img alt={show.name} className='search-image' src={BASEURL+show.tv_image.picture} /></Col>
                              </Row>
                              <Row>
                                <Col><a href='#' onClick={(e) => {goToShow(e,show.id)}}>{show.name}</a></Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      ))
                    }
                  </>
                }
              </>
             : null
            }
          </Col>
          <Col>
            <Row><Col><h2>Smashups</h2></Col></Row>
            {
              searchResults
              ? <>
                {  searchResults.smashups.length <= 0
                  ? <Row><Col><h4>No shows were found</h4></Col></Row>
                  : <>
                    {
                      searchResults.smashups.map((smashup) => (
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
                  </>
                }
              </>
             : null
            }
          </Col>
        </Row>
      </Container>
      <Spacer height="1rem" />
    </>

  );
}

export default withRouter(SearchResults);
