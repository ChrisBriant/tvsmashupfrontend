import {useContext,useState} from 'react';
import {withRouter, useParams} from 'react-router';
import {Context} from '../context/AuthContext';
import {isValidEmail} from '../helpers/validation';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '../components/Spacer';
import {isValidPassword} from '../helpers/validation';

const PasswordReset = () => {
  const {changePassword, state:{changeSuccess, errorMessage}} = useContext(Context);
  const [pass,setPass] = useState('');
  const [passChk,setPassChk] = useState('');
  const [validationError,setErrorMessage] = useState('');
  const { hash } = useParams();

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
    console.log("Password Valid", valid);
    if(valid) {
      let payload = {
        hash,
        password : pass
      }
      changePassword(payload);
    }
  }

  const handleChangePass = (e) => {
    setPass(e.target.value);
  }

  const handleChangePassChk= (e) => {
    setPassChk(e.target.value);
  }

  return (
    <>
    {
      !changeSuccess
      ?
      <>
        <Spacer height="4rem" />
        <div className="panel">
          <h2>Change Password</h2>
          <Form onSubmit={handleSend}>

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
          <p className="error">{validationError}</p>
        </div>
        <Spacer height="4rem" />
      </>
      :
      <>
        <Spacer height="12rem" />
        <div className="panel">
          <h2>Change Password</h2>
          <p>Congratulations! You have successfully changed your password.</p>
        </div>
        <Spacer height="12rem" />
      </>
    }
    </>
  )

}

export default PasswordReset;
