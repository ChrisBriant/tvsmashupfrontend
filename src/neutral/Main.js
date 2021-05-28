import {useState, useContext, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Route, BrowserRouter } from 'react-router-dom';
import AddShow from '../authflow/AddShow';
import AddSmashUp from '../authflow/AddSmashUp';
import ViewSmashUp from './ViewSmashup';
import SearchResults from './SearchResults';
import ShowIndex from './ShowIndex';
import ViewShow from './ViewShow';
import Signin from '../unauthflow/Signin';
import Register from '../unauthflow/Register';
import Home from '../unauthflow/Home';
import PasswordReset from '../unauthflow/PasswordReset';
import ForgotPassword from '../unauthflow/ForgotPassword';
import Spacer from '../components/Spacer';
import CookiesModal from '../components/CookiesModal';
import {Context} from '../context/AuthContext';
import {checkCookiePolicy} from '../helpers/cookiestorage';


const Main = () => {
    const {isAuthed,signout, state:{authed,isAdmin}} = useContext(Context);
    const [search,setSearch] = useState('');
    const [cookieAccept,setCookieAccept] = useState(false);

    const logOut = (e) => {
      e.preventDefault();
      signout();
    }

    useEffect(() => {
      isAuthed();
      setCookieAccept(checkCookiePolicy());
    },[]);


    return (
      <>
        {
          cookieAccept
          ? null
          : <CookiesModal show={true} />
        }
        <div className="main">
          <BrowserRouter>
            <Navbar expand="lg" className="navbar-custom">
              <Navbar.Brand href="/home">TV Smashup</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/showindex">Show Index</Nav.Link>
                  {
                    authed
                    ? <>
                      { isAdmin
                        ? <Nav.Link href="/addshow">Add Show</Nav.Link>
                        : null
                      }
                      <Nav.Link href="/addsmashup">Add Smash Up</Nav.Link>
                      <Nav.Link href="/home" onClick={logOut}>Logoff</Nav.Link>
                    </>
                    : <>
                      <Nav.Link href="/signin">Signin</Nav.Link>
                      <Nav.Link href="/register">Register</Nav.Link>
                    </>
                  }
                </Nav>
                <Form inline className="search-custom">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => {setSearch(e.target.value)}}
                  />
                  <Nav.Link href={`/search/${search}`}>
                    <Button variant="outline-success">Search</Button>
                  </Nav.Link>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/home">
                <Home />
            </Route>
            {
              authed
              ? <>
                {
                  isAdmin
                  ? <Route exact path="/addshow">
                        <AddShow />
                    </Route>
                  : null
                }
                <Route exact path="/addsmashup">
                    <AddSmashUp />
                </Route>
              </>
              : <>
                <Route exact path="/signin">
                    <Signin />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/forgotpassword/">
                    <ForgotPassword />
                </Route>
                <Route exact path="/passwordreset/:hash">
                  <PasswordReset/>
                </Route>
              </>
            }
            <Route exact path="/showindex">
                <ShowIndex />
            </Route>
            <Route exact path="/viewsmashup/:id">
                <ViewSmashUp />
            </Route>
            <Route exact path="/search/:searchStr">
                <SearchResults />
            </Route>
            <Route exact path="/viewshow/:id">
                <ViewShow />
            </Route>
          </BrowserRouter>
        </div>

        <Spacer height="1rem" />

        <footer>
          <p>TV SmashUp App by <a href="https://github.com/ChrisBriant/tvsmashupfrontend" target="_blank">Chris Briant</a></p>
        </footer>
      </>
    )
}


export default Main;
