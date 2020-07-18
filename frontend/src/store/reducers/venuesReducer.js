import {GET_ALL_VENUES_SUCCESS} from "../actions/venuesActions";

const initialState = {
  venues: [],
};

const venuesReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_ALL_VENUES_SUCCESS:
      return {...state, venues: action.venues};
    default:
      return state;
  }
};

export default venuesReducer;