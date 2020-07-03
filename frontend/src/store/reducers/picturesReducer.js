import {FETCH_PICTURES_SUCCESS} from "../actions/picturesActions";

const initialState = {
  pictures: [],
};

const picturesReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_PICTURES_SUCCESS:
      return {...state, pictures: action.pictures};
    default:
      return state;
  }
};

export default picturesReducer;