import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Route, BrowserRouter } from 'react-router-dom';
import Signin from './Signin';
import Register from './Register';
import SmashupList from '../neutral/SmashupList';
import ViewSmashUp from '../neutral/ViewSmashup';
import Home from './Home';

const UnauthNav = () => {

  return (
    <BrowserRouter>
      <Navbar expand="lg" className="navbar-custom" >
        <Navbar.Brand href="#home">TV Smashup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/signin">Signin</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
          <Form inline className="search-custom">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/home">
          <Home />
      </Route>
      <Route exact path="/signin">
          <Signin />
      </Route>
      <Route path="/register">
          <Register />
      </Route>
      <Route path="/viewsmashup/:id">
          <ViewSmashUp />
      </Route>
    </BrowserRouter>
  );
}

export default UnauthNav;
