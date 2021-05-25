import {useContext,useEffect,useState} from 'react';
import {withRouter} from 'react-router';
import {Context} from '../context/SmashUpContext';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../components/Spacer';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const ShowIndex = (props) => {
  const {getShowIndicies, getShowsByLetter, state: {shows,showIndicies}} = useContext(Context);
  const {state:{authed}} = useContext(AuthContext);
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
      <div className="panel">
        <h1>Index of Shows</h1>
        {
          showIndicies && showIndicies.length > 0
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
            <h4>There are no smashups to view, be the first to add one!</h4>
            <Spacer height="1rem" />
              { authed
                ? <><h4>Add your <a href="/addsmashup">first SmashUp.</a></h4></>
                : <> 
                    <h4>Register <a href="/register">here</a> to get started.</h4>
                    <Spacer height="1rem" />
                    <h4>Already have an account? Click <a href="/signin">here</a> to sign in.</h4>
                  </> 
              } 
          </>
        }
      </div>
    </>
  );
}

export default withRouter(ShowIndex);
