import {GET_VENUE_REVIEWS_SUCCESS} from "../actions/reviewsActions";

const initialState = {
  venueReviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_VENUE_REVIEWS_SUCCESS:
      return {...state, venueReviews: action.reviews};
    default:
      return state;
  }
};

export default reviewsReducer;