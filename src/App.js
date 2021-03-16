import logo from './logo.svg';
import './App.css';
import {Provider as AuthProvider} from './context/AuthContext';
import {Provider as SmashUpProvider} from './context/SmashUpContext';
import {Provider as UIControlProvider} from './context/UIControlContext';
import Main from './neutral/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <AuthProvider>
      <SmashUpProvider>
        <UIControlProvider>
          <div className="App">
            <Main />
          </div>
        </UIControlProvider>
      </SmashUpProvider>
    </AuthProvider>
  );
}

export default App;
