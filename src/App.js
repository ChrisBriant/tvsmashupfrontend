import logo from './logo.svg';
import './App.css';
import {Provider as AuthProvider} from './context/AuthContext';
import {Provider as SmashUpProvider} from './context/SmashUpContext';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <AuthProvider>
      <SmashUpProvider>
        <div className="App">
          <Main />
        </div>
      </SmashUpProvider>
    </AuthProvider>
  );
}

export default App;
