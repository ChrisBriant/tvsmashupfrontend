import createDataContext from './createDataContext';
import tvApi from '../api/tvsmashupapi';
//import {navigate} from '../navigationRef';

const defaultState = {
  smashups: []
};

const smashUpReducer = (state,action) => {
  switch(action.type) {
    case 'setSmashups':
      return {...state,smashups:action.payload};
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

export const {Provider, Context} = createDataContext (
  smashUpReducer,
  { getSmashups },
  {smashups: [] }
);
