import {useContext,useEffect} from 'react';
import {withRouter} from 'react-router';

import {Context} from '../context/SmashUpContext';
import Canvas from '../components/Canvas';
import Spacer from '../components/Spacer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//<Canvas width="300" height="200" />


const SmashupList = (props) => {
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
    <Container className="panel">
      <h1>Latest Smashups</h1>
      {
        smashups.map((smashup) => (
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
    </Container>
  );
}

export default withRouter(SmashupList);
