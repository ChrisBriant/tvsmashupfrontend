import {useContext,useState} from 'react';
import {Context} from '../context/AuthContext';
import {isValidEmail} from '../helpers/validation';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '../components/Spacer';

const ForgotPassword = () => {
  const {forgotPassword, resetForgotPassword, state:{forgotSuccess}} = useContext(Context);
  const [email,setEmail] = useState('');
  const [error,setError] = useState('');

  const tryAgain = () => {
    resetForgotPassword();
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSend = (e) => {
    e.preventDefault();
    if(isValidEmail(email))
    {
      const payload = {
        'email': email,
      }
      forgotPassword(payload);
    } else {
      setError('Please enter a valid email address.');
    }
  }

  return(
    <>
      {
        forgotSuccess
        ? <>
            <Spacer height="8rem" />
            <div className="panel">
              <h2>Forgot Password</h2>
              <p>If that email is registered with us then you will have recieved a
                message with a link to reset your password.</p>
              <p><strong>Didn't receive anything?</strong></p>
              <p>Click <a href="#" onClick={tryAgain}>here</a> to try again.</p>
            </div>
            <Spacer height="8rem" />
        </>
        : <>
            <Spacer height="8rem" />
              <div className="panel">
                <h2>Forgot Password</h2>
                <p>Enter your email address below to and we will send you a link to
                  reset your password.</p>
                <Form onSubmit={handleSend}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail} required/>
                  </Form.Group>
                  <Button variant="primary" type="submit" >
                    Submit
                  </Button>
                </Form>
            </div>
            <p className="error">{error}</p>
          <Spacer height="8rem" />
        </>
      }
    </>
  )

}

export default ForgotPassword;
