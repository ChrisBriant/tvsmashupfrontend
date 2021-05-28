import createDataContext from './createDataContext';
import tvApi from '../api/tvsmashupapi';
import {multipartConn, tvApi as apiWithToken} from '../api/connections';

const defaultState = {
  smashups: [],
  shows: [],
  show: null,
  showVs: { show1 : {name:'', id:null}, show2 : {name:'', id:null}},
  errorMessage : '',
  addedShow : null,
  selectedSmashup: null,
  successMessage: '',
  searchResults: null,
  showIndicies: null,
  BASEURL: 'http://localhost:8000'
};

const setAuthHeader = () => {
  tvApi.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
  }
}

const smashUpReducer = (state,action) => {
  let newShows;
  let errorMessage = '';
  let successMessage = '';

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
      return {...state,showVs:newShows,errorMessage:errorMessage};
    case 'clearShows':
      return {...state,shows:[]};
    case 'sendError':
      return {...state,errorMessage:action.payload}
    case 'addShowSuccess':
      return {...state,addedShow:action.payload}
    case 'resetShowSuccess':
      return {...state,addedShow:action.payload}
    case 'resetSmashup':
      return {...state,selectedSmashup:action.payload}
    case 'resetSmashups':
      return {...state,smashups:[]}
    case 'setSmashup':
      return{...state,selectedSmashup:action.payload}
    case 'setSuccessMessage':
      return{...state,successMessage:action.payload}
    case 'setSearchResults':
      return{...state,searchResults:action.payload}
    case 'setCurrentShow':
      return{...state,show:action.payload}
    case 'setShowIndicies':
      return{...state,showIndicies:action.payload}
    case 'setCategory':
      //Slot into the selected smashup
      let newSelectedSmashup = {...state.selectedSmashup};
      let catIndex = newSelectedSmashup.categories.find(cat => cat.id === action.payload.category.id);
      newSelectedSmashup.categories[catIndex] = action.payload;
      return{...state,selectedSmashup:newSelectedSmashup};
    default:
      return defaultState;
  }
};


const getSmashups = (dispatch) => async () => {
  const response = await tvApi.get('/api/allsmashups/')
                    .then(res => {
                      dispatch({type:'setSmashups', payload:res.data});
                    });
}

const searchShows = (dispatch) => async (searchStr) => {
  const response = await tvApi.get('/api/searchshows/?search='+searchStr)
                    .then(res => {
                      dispatch({type:'setShows', payload:res.data});
                    });
}


const createSmashup = (dispatch) => async (data) => {
  let success = {created:false,id:0};
  const response = await apiWithToken.post('/api/addsmashup/',data)
                    .then(res => {
                      dispatch({type:'setSmashup', payload:res.data});
                      success = {created:true,id:res.data.id};
                    }).catch(err => {
                        if(err.response.status === 400) {
                          dispatch({type:'sendError', payload:err.response.data.message});
                        } else if(err.response.status === 401) {
                          dispatch({type:'sendError', payload:'You are not authorised to perform this action'});
                       }
                       success = {created:false,id:0};
                    });
  return success;
}


const getSmashup = (dispatch) => async (data,authed) => {
  if(authed) {
    setAuthHeader();
  }

  const response = await tvApi.get(`/api/getsmashup/?id=${data}`)
                    .then(res => {
                      dispatch({type:'setSmashup', payload:res.data});
                    }).catch(err => {
                        if(err.response.status === 400) {
                          dispatch({type:'sendError', payload:err.response.data.message});
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
              dispatch({type:'addShowSuccess', payload:{name: res.data.name, message: `You have successfully added the show ${res.data.name}.`}});
          }).catch(err => {
              if(err.response.status === 401) {
                dispatch({type:'sendError', payload:'You are not authorised to perform this action'});
              } else if(err.response.status == 400) {
                dispatch({type:'sendError', payload:`Something went wrong creating the show, please check 
                the file is one of the allowed types (PNG, JPEG, JPG)`});
              }
          });
}

const resetSmashup = (dispatch) => () => {
  dispatch({type:'resetSmashup', payload:null});
}

const resetSmashups = (dispatch) => () => {
  dispatch({type:'resetSmashups', payload:null});
}

const updateCategories = (dispatch) => async (smashUpId,existing,newcategories) => {
  let data = {
    id: smashUpId,
    existing: existing,
    new: newcategories
  }
  await apiWithToken.post('/api/updatecategories/',data)
        .then(res => {
          dispatch({type:'setSmashup', payload:res.data});
          dispatch({type:'setSuccessMessage',payload:'Successfully updated categories'});
        }).catch(err => {
            if(err.response.status === 400) {
              dispatch({type:'sendError', payload:err.response.data.message});
            }
        });
}

const addRating = (dispatch) => async (data,authed) => {
  if(authed) {
    setAuthHeader();
  }

  await tvApi.post('/api/addrating/',data)
        .then(res => {
          dispatch({type:'setCategory', payload:res.data});
          dispatch({type:'setSuccessMessage',payload:'Your rating has been added'});
        }).catch(err => {
            if(err.response.status === 400) {
              dispatch({type:'sendError', payload:err.response.data.message});
            }
        });
}


const search = (dispatch) => async (searchStr) => {
  const response = await tvApi.get('/api/search/?search='+searchStr)
                    .then(res => {
                      dispatch({type:'setSearchResults', payload:res.data});
                    });
}

const setCurrentShow = (dispatch) => async (show) => {
  //NOT WORKING FOR SOME REASON
  dispatch({type:'setShow',payload:show});
}

const searchByShowId = (dispatch) => async (id) => {
  const response = await tvApi.get('/api/showsbyid/?id='+id)
                    .then(res => {
                      dispatch({type:'setCurrentShow',payload:res.data});
                    });
}


const getShowIndicies = (dispatch) => async () => {
  const response = await tvApi.get('/api/showsindexed')
                    .then(res => {
                      dispatch({type:'setShowIndicies',payload:res.data});
                    });
}


const getShowsByLetter = (dispatch) => async (letter) => {
  const response = await tvApi.get('/api/showsbyletter?letter='+letter)
                    .then(res => {
                      dispatch({type:'setShows',payload:res.data});
                    });
}



export const {Provider, Context} = createDataContext (
  smashUpReducer,
  { getSmashups, searchShows, setShow, clearShows, addShow, resetShowSuccess,
    createSmashup, getSmashup, resetSmashup,resetSmashups, updateCategories,
    addRating, search, setCurrentShow, searchByShowId, getShowIndicies,
    getShowsByLetter},
  {...defaultState}
);
