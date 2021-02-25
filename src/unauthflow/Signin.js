import {useContext,useState} from 'react';
import {Context} from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signin = (props) => {
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const {signin} = useContext(Context);

  console.log('SIGN IN');

  const handleChangePass = (e) => {
    setPass(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSend = (e) => {
    e.preventDefault();
    const payload = {
      'email': email,
      'password': pass
    }
    console.log('clicked',payload);
    signin(payload);
  }

  return (
    // <div>
    //   <label>Email Address:
    //     <input id="name" type="text" value={email} onChange={handleChangeEmail} />
    //   </label>
    //   <label>Password:
    //     <input id="name" type="password" value={pass} onChange={handleChangePass} />
    //   </label>
    //   <button id="sendname" onClick={handleSend}>Login</button>
    // </div>
    <div className="panel">
      <Form onSubmit={handleSend}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChangePass}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signin;
