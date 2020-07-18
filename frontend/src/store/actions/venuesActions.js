import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

export const GET_ALL_VENUES_SUCCESS = 'GET_ALL_VENUES_SUCCESS';
export const GET_VENUE_SUCCESS = 'GET_VENUE_SUCCESS';

export const getAllVenuesSuccess = venues => ({type: GET_ALL_VENUES_SUCCESS, venues});
export const getVenueSuccess = venue => ({type: GET_VENUE_SUCCESS, venue});

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

export const getVenue = venueId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/venues/${venueId}`);

      dispatch(getVenueSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const postVenue = venueData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/venues', venueData);
      toast.success('Your venue has been posted');
      dispatch(push('/'));
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteVenue = venueId => {
  return async dispatch => {
    try{
      await axiosOrders.delete(`/venues/${venueId}`);
      toast.warn('Venue has been deleted!');
      dispatch(getAllVenues());
    }catch(error){
      console.log(error);
    }
  }
};