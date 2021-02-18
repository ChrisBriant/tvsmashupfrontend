import createDataContext from './createDataContext';

const defaultState = {
  focusedVsInput: 0
};

const uiControlReducer = (state,action) => {
  switch(action.type) {
    case 'setFocusedVsInput':
      return {...state,focusedVsInput:action.payload};
    default:
      return defaultState;
  }
};

const setFocusedVsInput = (dispatch) => async (focused) => {
  dispatch({type:'setFocusedVsInput', payload:focused});
}

export const {Provider, Context} = createDataContext (
  uiControlReducer,
  { setFocusedVsInput },
  {...defaultState}
  //{smashups: [], shows: [], show: {}, BASEURL: 'http://localhost:8000' }
);
