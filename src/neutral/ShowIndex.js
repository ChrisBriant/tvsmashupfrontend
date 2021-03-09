import {useContext,useEffect} from 'react';
import {withRouter} from 'react-router';
import {Context} from '../context/SmashUpContext';



const ShowIndex = () => {
  const {getShowIndicies, state: {showIndicies}} = useContext(Context);

  useEffect( () => {
    getShowIndicies();
  },[]);

  return (
    <h1>This is where the show index goes</h1>
  )
}

export default withRouter(ShowIndex);
