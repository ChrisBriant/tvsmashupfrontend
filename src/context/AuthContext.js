import createDataContext from './createDataContext';
import tvApi from '../api/tvsmashupapi';
import decode from 'jwt-decode';
//import {navigate} from '../navigationRef';

const defaultState = {
  authed: false,
  token: null,
  errorMessage: '',
  userId: null,
  regSuccess: false,
  setForgotSuccess: false
};

const authReducer = (state,action) => {
  switch(action.type) {
    case 'add_error':
      return {...state,errorMessage:action.payload};
    case 'signin':
      return {...state,errorMessage:'',accessToken:action.payload};
    case 'setAuthed':
      return {...state,authed:true};
    case 'setUnauthed':
      return {...state,authed:false};
    case 'clear_error_message':
      return {...state,errorMessage:''};
    case 'setId':
      console.log('Setting ID', action.payload);
      return {...state,userId:action.payload};
    case 'signout':
      return {token: null, errorMessage: ''};
    case 'regSuccess':
      return {...state, regSuccess: true};
    case 'setForgotSuccess':
      return {...state, forgotSuccess: action.payload};
    default:
      return defaultState;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
};

const tryLocalSignin = dispatch => async () => {
  const accessToken = localStorage.getItem('access_token');
  if(accessToken) {
    dispatch({type:'setAuthed', payload:accessToken});
  } else {
    dispatch({type:'setUnauthed', payload:null});
  }
};

const register = dispatch => async ({username,email,password,passchk}) => {
    //Make api request to sign up with that email and Password

    try {
      const response = await tvApi.post('/api/register/',
                                          {username,email,password,passchk}
                        )
                        .then(res => {
                          console.log("success",res.data);
                          //SAVE TO STORAGE
                          dispatch({type:'regSuccess', payload:null});
                        });
    } catch (err) {
      console.log(err);
      dispatch({type:'add_error', payload: 'Something went wrong with sign up'});
    }
  };


const signin = (dispatch) => async ({email, password}) => {
  try {
    console.log(JSON.stringify({email,password}));
    const response = await tvApi.post('/authenticate/',
                                        {email,password}
                      )
                      .then(res => {
                        console.log("success",res.data.access);
                        //SAVE TO STORAGE
                        localStorage.setItem("access_token", res.data.access);
                        console.log("access", res.data.access);
                        dispatch({type:'signin', payload:res.data.access});
                        const decoded = decode(res.data.access);
                        dispatch({type:'setAuthed', payload:true});
                        dispatch({type:'setId', payload:decoded.user_id});
                      });
  } catch (err){
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    })
  }
}

const isAuthed = (dispatch) => () => {
  const accessToken = localStorage.getItem('access_token');
  if(accessToken) {
    const decoded = decode(accessToken);
    console.log(decoded);
    if(decoded.exp < Date.now() / 1000) {
      console.log('Out of date');
      dispatch({type:'setUnauthed', payload:null});
      dispatch({type:'setId', payload:null});
      return false;
    } else {
      dispatch({type:'setAuthed', payload:true});
      dispatch({type:'setId', payload:decoded.user_id});
      return true;
    }
    //// TODO: Actual checking of token will need to go here

  } else {
    console.log('Here')
    dispatch({type:'setUnauthed', payload:null});
    dispatch({type:'setId', payload:null});
    return false;
  }
}


const signout = dispatch => async () => {
  localStorage.removeItem('access_token');
  dispatch({type:'setUnauthed', payload:null});
  dispatch({type:'setId', payload:null});
}

const forgotPassword = dispatch => async (email) => {
  dispatch({type:'setForgotSuccess', payload:true});

  // try {
  //   const response = await tvApi.post('/forgotpassword/',
  //                                       {email}
  //                     )
  //                     .then(res => {
  //                       console.log("success",res.data.access);
  //                       dispatch({type:'setForgotSuccess', payload:null});
  //                     });
  // } catch (err){
  //   console.log(err);
  //   dispatch({
  //     type: 'add_error', = dispatch => async (email) => {
  //     payload: 'Password reset failed'
  //   });
}

const resetForgotPassword  = dispatch => async (email) => {
  dispatch({type:'setForgotSuccess', payload:false});
}

export const {Provider, Context} = createDataContext (
  authReducer,
  { signin, signout, register, clearErrorMessage, tryLocalSignin, isAuthed,
    forgotPassword, resetForgotPassword
  },
  {...defaultState}
);
