import {GET_ALL_VENUES_SUCCESS, GET_VENUE_SUCCESS} from "../actions/venuesActions";

const initialState = {
  venues: [],
  venue: null,
};

const venuesReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_ALL_VENUES_SUCCESS:
      return {...state, venues: action.venues};
    case GET_VENUE_SUCCESS:
      return {...state, venue: action.venue};
    default:
      return state;
  }
};

export default venuesReducer;