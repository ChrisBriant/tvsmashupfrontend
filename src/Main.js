import {useContext, useEffect, useState} from 'react';
import {Context} from './context/AuthContext';
import AuthNav from './authflow/AuthNav';
import UnauthNav from './unauthflow/UnauthNav';

const Main = () => {
    const {isAuthed, state:{authed}} = useContext(Context);
    //const [authed,setAuthed] = useState(false);

    useEffect(() => {
      //setAuthed(isAuthed());
      isAuthed();
    },[]);


    console.log(authed);

    return (
      <>
        <div className="main">
          { authed
            ? <AuthNav />
            : <UnauthNav/>
          }
        </div>
        <footer>
          <h1>Footer content here</h1>
        </footer>
      </>
    )
}


export default Main;
