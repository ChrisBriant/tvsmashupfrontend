import {useContext,useState} from 'react';
import {Context} from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '../components/Spacer';
import {isValidPassword} from '../helpers/validation';


const Register = () => {
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [username,setUsername] = useState('');
  const [passChk,setPassChk] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const {register, state:{regSuccess}} = useContext(Context);


  const handleSend = (e) => {
    e.preventDefault();

    setErrorMessage('');
    let valid = true;
    if(pass !== passChk) {
      valid = false;
      setErrorMessage(`Your password does not match what you have entered for the confirm password.
                        Please retype them and try again.`);
    }
    if(!isValidPassword(pass)) {
      valid = false;
      setErrorMessage(`Your password does not meet the complexity requirements.
                        Please choose a password which is eight characters long, has
                         at least one special character, one number and one upper case letter.`);
    }

    if(valid) {
      const payload = {
        'username' : username,
        'email': email,
        'password' : pass,
        'passchk' : passChk
      }
      register(payload);
    }
  }

  const handleChangePass = (e) => {
    setPass(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleChangePassChk= (e) => {
    setPassChk(e.target.value);
  }


  return (
    <>
      {
        !regSuccess
        ?
          <>
            <Spacer height="4rem" />
            <div className="panel">
              <h2>Register</h2>
              <Form onSubmit={handleSend}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter a user name" onChange={handleChangeUsername} required />
                  <Form.Text className="text-muted">
                    You're user name is visible to others.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail} required />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handleChangePass} required />
                </Form.Group>

                <Form.Group controlId="formBasicPasswordChk">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handleChangePassChk} required />
                </Form.Group>

                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </Form>
              <p className="error">{errorMessage}</p>
            </div>
            <Spacer height="4rem" />
          </>
        :
        <>
          <Spacer height="12rem" />
          <div className="panel">
            <h2>Register</h2>
            <p>Congratulations! You have successfully registered. Please check your email for a link to confirm your account.
              Once you have done that click on &quot;Signin&quot; to log in.</p>
          </div>
          <Spacer height="12rem" />
        </>
      }
    </>
  );
}

export default Register;
