import {useContext} from 'react';
import {Context} from './context/AuthContext';
import Home from './authflow/Home';
import UnauthNav from './unauthflow/UnauthNav';

const Main = () => {
    const {isAuthed} = useContext(Context);

    return (
      <>
        <div className="main">
          { isAuthed
            ? <Home />
            : <UnauthNav/>
          }

        </div>
      </>
    )
}


export default Main;
