import {GET_VENUE_IMAGES_SUCCESS} from "../actions/imagesActions";

const initialState = {
  venueImages: [],
};

const imagesReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_VENUE_IMAGES_SUCCESS:
      return {...state, venueImages: action.images};
    default:
      return state;
  }
};