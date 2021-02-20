import createDataContext from './createDataContext';
import tvApi from '../api/tvsmashupapi';
import decode from 'jwt-decode';
//import {navigate} from '../navigationRef';

const defaultState = {
  authed: false
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
    // case 'isAuthed':
    //   return {...state};
    case 'clear_error_message':
      return {...state,errorMessage:''};
    case 'signout':
      return {token: null, errorMessage: ''};
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

const signup = dispatch => async ({email, password}) => {
    //Make api request to sign up with that email and Password
    try {
      console.log(JSON.stringify({email,password}));
      const response = await tvApi.post('/apilogin/authenticate/',
                                          {email,password}
                        )
                        .then(res => {
                          console.log("success",res.data.access);
                          //SAVE TO STORAGE
                          localStorage.setItem("access_token", res.data.access);
                          console.log("access", res.data.access);
                                dispatch({type:'signin', payload:res.data.access});
                        });
      // await AsyncStorage.setItem('token',response.data.access);
      //Navigate to main flow
      //navigate('Camera');
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
                      });
  } catch (err){
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    })
  }
}

const isAuthed = () => {
  const accessToken = localStorage.getItem('access_token');
  if(accessToken) {
    const decoded = decode(accessToken);
    console.log(decoded);
    if(decoded.exp < Date.now() / 1000) {
      return false;
    } else {
      return true;
    }
    //// TODO: Actual checking of token will need to go here

  } else {
    return false;
  }
}


const signout = dispatch => async () => {
  // await AsyncStorage.removeItem('token');
  // dispatch({type: 'signout'});
  // //navigate('loginFlow');
}

export const {Provider, Context} = createDataContext (
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, isAuthed},
  {token: null, errorMessage: ''}
);
