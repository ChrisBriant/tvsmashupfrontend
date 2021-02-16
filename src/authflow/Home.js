import {useContext,useEffect} from 'react';
import {Context} from '../context/SmashUpContext';


const Home = () => {
  const {getSmashups, state: {smashups}} = useContext(Context);

  useEffect( () => {
    console.log('Using Effect');
    getSmashups();
  },[]);

  console.log('Here are the smashups',smashups);

  return (
    <div>
      <h1>You are logged in!</h1>
    </div>
  );
}

export default Home;
