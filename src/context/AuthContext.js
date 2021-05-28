import createDataContext from './createDataContext';
import tvApi from '../api/tvsmashupapi';
import decode from 'jwt-decode';

const defaultState = {
  authed: false,
  token: null,
  errorMessage: '',
  userId: null,
  isAdmin: false,
  regSuccess: false,
  setForgotSuccess: false,
  changeSuccess: false,
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
      return {...state,userId:action.payload};
    case 'setIsAdmin':
      return {...state,isAdmin:action.payload};
    case 'signout':
      return {token: null, errorMessage: ''};
    case 'regSuccess':
      return {...state, regSuccess: true};
    case 'setForgotSuccess':
      return {...state, forgotSuccess: action.payload};
    case 'setChangeSuccess':
      return {...state, changeSuccess: action.payload};
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
                          //SAVE TO STORAGE
                          dispatch({type:'regSuccess', payload:null});
                        });
    } catch (err) {
      dispatch({type:'add_error', payload: 'Something went wrong with sign up'});
    }
  };


const signin = (dispatch) => async ({email, password}) => {
  let signInSuccess;
  try {
    const response = await tvApi.post('/authenticate/',
                                        {email,password}
                      )
                      .then(res => {
                        //SAVE TO STORAGE
                        localStorage.setItem("access_token", res.data.access);
                        dispatch({type:'signin', payload:res.data.access});
                        const decoded = decode(res.data.access);
                        dispatch({type:'setAuthed', payload:true});
                        dispatch({type:'setId', payload:decoded.user_id});
                        dispatch({type:'setIsAdmin', payload:decoded.is_admin});
                        signInSuccess = true;
                      });
  } catch (err){
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
    signInSuccess =false;
  }
  return signInSuccess;
}

const isAuthed = (dispatch) => () => {
  const accessToken = localStorage.getItem('access_token');
  if(accessToken) {
    const decoded = decode(accessToken);
    if(decoded.exp < Date.now() / 1000) {
      dispatch({type:'setUnauthed', payload:null});
      dispatch({type:'setId', payload:null});
      return false;
    } else {
      dispatch({type:'setAuthed', payload:true});
      dispatch({type:'setIsAdmin', payload:decoded.is_admin});
      dispatch({type:'setId', payload:decoded.user_id});
      return true;
    }
  } else {
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

const forgotPassword = dispatch => async (data) => {

  try {
    const response = await tvApi.post('/api/forgotpassword/',
                                        data
                      )
                      .then(res => {
                        dispatch({type:'setChangeSuccess', payload:true});
                      });
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Sorry something went wrong'
      });
    }
}


const changePassword = dispatch => async (data) => {

  try {
    const response = await tvApi.post('/api/changepassword/',
                                        data
                      )
                      .then(res => {
                        dispatch({type:'setForgotSuccess', payload:true});
                      });
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Password reset failed'
      });
    }
  }

const resetForgotPassword  = dispatch => async (email) => {
  dispatch({type:'setForgotSuccess', payload:false});
}

export const {Provider, Context} = createDataContext (
  authReducer,
  { signin, signout, register, clearErrorMessage, tryLocalSignin, isAuthed,
    forgotPassword, resetForgotPassword, changePassword
  },
  {...defaultState}
);
