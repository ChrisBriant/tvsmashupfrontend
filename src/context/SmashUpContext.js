import createDataContext from './createDataContext';
import tvApi from '../api/tvsmashupapi';
import {multipartConn, tvApi as apiWithToken} from '../api/connections';
//import {navigate} from '../navigationRef';

const defaultState = {
  smashups: [],
  shows: [],
  showVs: { show1 : {name:'', id:null}, show2 : {name:'', id:null}},
  errorMessage : '',
  addedShow : null,
  BASEURL: 'http://localhost:8000'
};

const smashUpReducer = (state,action) => {
  let newShows;
  let errorMessage = '';

  switch(action.type) {
    case 'setSmashups':
      return {...state,smashups:action.payload};
    case 'setShows':
      return {...state,shows:action.payload};
    case 'setShow':

      newShows = state.showVs;
      newShows[`show${action.payload.vsIndex}`] = action.payload;
      //Check to see if they are different values
      if(newShows.show1.id === newShows.show2.id) {
        //Reset if match
        newShows[`show${action.payload.vsIndex}`] = {};
        errorMessage = 'Both shows must be different';
      }
      // if(action.payload.vsIndex === 1) {
      //   newShows.show1 = action.payload;
      // } else {
      //   newShows.show2 = action.payload;
      // }
      return {...state,showVs:newShows,errorMessage:errorMessage};
    case 'clearShows':
      return {...state,shows:[]};
    case 'sendError':
      return {...state,errorMessage:action.payload}
    case 'addShowSuccess':
      return {...state,addedShow:action.payload}
    case 'resetShowSuccess':
      return {...state,addedShow:action.payload}
    case 'setSmashup':
      console.log('Set Smashup')
      //return {...state,addedShow:action.payload}
    default:
      return defaultState;
  }
};


const getSmashups = (dispatch) => async () => {
  const response = await tvApi.get('/api/allsmashups/')
                    .then(res => {
                      console.log("success",res.data);
                      dispatch({type:'setSmashups', payload:res.data});
                    });
}

const searchShows = (dispatch) => async (searchStr) => {
  const response = await tvApi.get('/api/searchshows/?search='+searchStr)
                    .then(res => {
                      console.log("success",res.data);
                      dispatch({type:'setShows', payload:res.data});
                    });
}


const createSmashup = (dispatch) => async (data) => {
  console.log('Sending ',data);
  const response = await apiWithToken.post('/api/addsmashup/',data)
                    .then(res => {
                      console.log("success",res.data);
                      dispatch({type:'setSmashup', payload:res.data});
                    }).catch(err => {
                        console.log('I am err', err.response.status);
                        if(err.response.status === 400) {
                          console.log(err.response);
                          dispatch({type:'sendError', payload:err.response.data.message});
                        } else if(err.response.status === 401) {
                          dispatch({type:'sendError', payload:'You are not authorised to perform this action'});
                       }
                    });
}


const setShow = (dispatch) => async (show) => {
  dispatch({type:'setShow', payload:show});
}

const resetShowSuccess = (dispatch) => async (show) => {
  dispatch({type:'resetShowSuccess', payload:null});
}

const clearShows = (dispatch) => async () => {
  dispatch({type:'clearShows', payload:null});
}


const addShow = (dispatch) => async (formData) => {
  await multipartConn.post('/api/addshow/',formData)
          .then(res => {
              console.log(res);
              console.log(res.data);
              dispatch({type:'addShowSuccess', payload:{name: res.data.name, message: `You have successfully added the show ${res.data.name}.`}});
          }).catch(err => {
              console.log('I am err', err.response.status);
              if(err.response.status === 401) {
                dispatch({type:'sendError', payload:'You are not authorised to perform this action'});
              }

          });
}

export const {Provider, Context} = createDataContext (
  smashUpReducer,
  { getSmashups, searchShows, setShow, clearShows, addShow, resetShowSuccess, createSmashup },
  {...defaultState}
  //{smashups: [], shows: [], show: {}, BASEURL: 'http://localhost:8000' }
);
