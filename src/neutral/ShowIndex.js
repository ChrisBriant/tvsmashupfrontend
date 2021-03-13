import {useContext,useEffect,useState} from 'react';
import {withRouter} from 'react-router';
import {Context} from '../context/SmashUpContext';
import Spacer from '../components/Spacer';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const ShowIndex = (props) => {
  const {getShowIndicies, getShowsByLetter, state: {shows,showIndicies}} = useContext(Context);
  const [letter,setLetter] = useState('');

  useEffect( () => {
    getShowIndicies();
  },[]);

  const getShows = (letter) => {
    setLetter(letter);
    getShowsByLetter(letter);
  }

  const goToShow = (e,id) => {
    e.preventDefault();
    props.history.push(`/viewshow/${id}`);
  }

  return (
    <>
      <Spacer height="1rem" />
      <h1>Index of Shows</h1>
      <Spacer height="1rem" />
      <div className="panel">
        {
          showIndicies
          ? <>
            {
              showIndicies.map((idx) => (
                <>
                  <Row key={idx.showidx} >
                    <Col>
                      <a href='#' onClick={() => {getShows(idx.showidx)}}>{idx.showidx.toUpperCase()} ({idx.count_shows} shows)</a>
                    </Col>
                  </Row>
                  {
                    letter === idx.showidx
                    ? <>
                      <Spacer height="1rem" />
                      {
                        shows.map((show) => (
                          <>
                            <Row key={show.id}>
                              <Col>
                                <a href="#" onClick={(e) => {goToShow(e,show.id)}}>{show.name} ({show.smashup_count} smashups)</a>
                              </Col>
                            </Row>
                          </>
                        ))
                      }
                      <Spacer height="1rem" />
                      </>
                    : null
                  }
                </>
              ))
            }
          </>
          : <>
            <h2>There are no shows to show!</h2>
          </>
        }
      </div>
    </>
  );
}

export default withRouter(ShowIndex);
