import {useContext,useEffect} from 'react';
import {Context} from '../context/SmashUpContext';
import Canvas from '../components/Canvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//<Canvas width="300" height="200" />


const Home = () => {
  const {getSmashups, state: {smashups,BASEURL}} = useContext(Context);

  useEffect( () => {
    console.log('Using Effect');
    getSmashups();
  },[]);

  console.log('Here are the smashups',smashups);

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
                    width="200"
                    height="100"
                    img1={BASEURL+smashup.show1.tv_image.picture}
                    img2={BASEURL+smashup.show2.tv_image.picture}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      }
    </Container>
  );
}

export default Home;
