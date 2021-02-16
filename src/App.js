import logo from './logo.svg';
import './App.css';
import {Provider as AuthProvider} from './context/AuthContext';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <AuthProvider>
      <div className="App">
        <Main />
      </div>
    </AuthProvider>
  );
}

export default App;
