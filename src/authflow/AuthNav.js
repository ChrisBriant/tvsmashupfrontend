import {useContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Route, BrowserRouter } from 'react-router-dom';
import SmashupList from '../neutral/SmashupList';
import AddShow from './AddShow';
import AddSmashUp from './AddSmashUp';
import ViewSmashUp from '../neutral/ViewSmashup';
import {Context} from '../context/AuthContext';

const AuthNav = (history) => {
  const {signout} = useContext(Context);

  const handleRouteChange = () => {
    alert('Route Changed');
  }

  const logOut = (e) => {
    e.preventDefault();
    signout();
  }

  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">TV Smashup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/addshow">Add Show</Nav.Link>
            <Nav.Link href="/addsmashup">Add Smash Up</Nav.Link>
            <Nav.Link href="#" onClick={logOut}>Logoff</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/">
          <SmashupList />
      </Route>
      <Route path="/home">
          <SmashupList />
      </Route>
      <Route path="/addshow" onChange={handleRouteChange}>
          <AddShow />
      </Route>
      <Route path="/addsmashup">
          <AddSmashUp />
      </Route>
      <Route path="/viewsmashup/:id">
          <ViewSmashUp />
      </Route>
    </BrowserRouter>
  );
}

export default AuthNav;
