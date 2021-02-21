import {useContext,useEffect} from 'react';
import {withRouter} from 'react-router';

import {Context} from '../context/SmashUpContext';
import Canvas from '../components/Canvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//<Canvas width="300" height="200" />


const Home = (props) => {
  const {getSmashups,resetSmashups, state: {smashups,selectedSmashup,BASEURL}} = useContext(Context);

  useEffect( () => {
    resetSmashups();
    getSmashups();
  },[]);

  console.log('Here are the smashups',smashups);
  console.log('Selected smashup', selectedSmashup);

  const viewSmashUp = (e,id) => {
    e.preventDefault();
    console.log('Smashup ID', id);
    props.history.push(`/viewsmashup/${id}`);

  }

  return (
    <Container>
      <h1>Latest Smashups</h1>
      {
        smashups.map((smashup) => (
          <Row key={smashup.id}>
            <Col>
              <Row>
                <Col>
                  <h4>{smashup.show1.name} Vs {smashup.show2.name}</h4>
                </Col>
              </Row>
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
              </Row>
              <Row>
                <Col><p><strong>Number of categories </strong>{smashup.categories.length}</p></Col>
              </Row>
              <Row>
                <Col><a href="#" onClick={(e) => viewSmashUp(e,smashup.id)}>View</a></Col>
              </Row>
            </Col>
          </Row>
        ))
      }
    </Container>
  );
}

export default withRouter(Home);
