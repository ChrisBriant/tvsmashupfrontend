import {useContext} from 'react';
import {Context} from './context/AuthContext';
import AuthNav from './authflow/AuthNav';
import UnauthNav from './unauthflow/UnauthNav';

const Main = () => {
    const {isAuthed} = useContext(Context);

    return (
      <>
        <div className="main">
          { isAuthed
            ? <AuthNav />
            : <UnauthNav/>
          }

        </div>
      </>
    )
}


export default Main;
