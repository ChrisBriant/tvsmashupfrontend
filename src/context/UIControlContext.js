import createDataContext from './createDataContext';

const defaultState = {
  focusedVsInput: 0,
  catList: []
};

const uiControlReducer = (state,action) => {
  switch(action.type) {
    case 'setFocusedVsInput':
      return {...state,focusedVsInput:action.payload};
    case 'addToCatList':
      return {...state,catList:[...state.catList,action.payload]};
    case 'removeFromCatList':
      let newCatList = state.catList.pop(action.payload);
      console.log('REMOVING', action.payload, newCatList);
      return {...state,catList:newCatList};
    case 'resetCatList':
      return {...state,catList:[]};
    default:
      return defaultState;
  }
};

const setFocusedVsInput = (dispatch) => async (focused) => {
  dispatch({type:'setFocusedVsInput', payload:focused});
}

const addToCatList = (dispatch) => async (cat) => {
  dispatch({type:'addToCatList', payload:cat});
}

const removeFromCatList = (dispatch) => async (idx) => {
  dispatch({type:'removeFromCatList', payload:idx});
}


const resetCatList = (dispatch) => async () => {
  dispatch({type:'resetCatList', payload:null});
}



export const {Provider, Context} = createDataContext (
  uiControlReducer,
  { setFocusedVsInput, addToCatList, removeFromCatList, resetCatList },
  {...defaultState}
  //{smashups: [], shows: [], show: {}, BASEURL: 'http://localhost:8000' }
);
