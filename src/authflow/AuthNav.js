import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import AddShow from './AddShow';
import AddSmashUp from './AddSmashUp';
import ViewSmashUp from '../neutral/ViewSmashup';

const AuthNav = (history) => {
  const handleRouteChange = () => {
    alert('Route Changed');
  }



  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="addshow">Add Show</Nav.Link>
            <Nav.Link href="addsmashup">Add Smash Up</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/home">
          <Home />
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
