import {useContext,useState} from 'react';
import {withRouter} from 'react-router';
import {Context} from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '../components/Spacer';

const Signin = (props) => {
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [signInSuccess,setSignInSuccess] = useState(false);
  const {signin, state:{errorMessage}} = useContext(Context);

  console.log('SIGN IN');

  const handleChangePass = (e) => {
    setPass(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const payload = {
      'email': email,
      'password': pass
    }
    await signin(payload).then(msg => {
            console.log(msg,'Sign in successful');
          }
    );
  }

  const forgotPassword = (e) => {
    e.preventDefault();
    props.history.push('/forgotpassword/');
  }

  return (
    <>
      <Spacer height="8rem" />
      <div className="panel">
        <h2>Sign In</h2>
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
          <Button variant="primary" type="submit" >
            Submit
          </Button>
          <p>Forgot your password? Click <a href="#" onClick={forgotPassword}>here</a> to reset.</p>
        </Form>
        <p className="error">{errorMessage}</p>
      </div>
      <Spacer height="8rem" />
    </>
  );
}

export default withRouter(Signin);
