import axiosOrders from "../../axiosOrders";

export const GET_ALL_VENUES_SUCCESS = 'GET_ALL_VENUES_SUCCESS';

export const getAllVenuesSuccess = venues => ({type: GET_ALL_VENUES_SUCCESS, venues});

export const getAllVenues = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/venues');

      dispatch(getAllVenuesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};