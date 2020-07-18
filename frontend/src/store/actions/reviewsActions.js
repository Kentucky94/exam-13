import axiosOrders from "../../axiosOrders";
import {getVenue} from "./venuesActions";

export const GET_VENUE_REVIEWS_SUCCESS = 'GET_VENUE_REVIEWS_SUCCESS';

export const getVenueReviewsSuccess = reviews => ({type: GET_VENUE_REVIEWS_SUCCESS, reviews});

export const getVenueReviews = venueId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/reviews/${venueId}`);

      dispatch(getVenueReviewsSuccess(response.data))
    }catch(error){
      console.log(error);
    }
  }
};

export const postReview = (venueId, reviewData) => {
  return async dispatch => {
    try{
      await axiosOrders.post(`/reviews/${venueId}`, reviewData);
      await axiosOrders.post(`/venues/reRate/${venueId}`);

      dispatch(getVenueReviews(venueId));
      dispatch(getVenue(venueId));
    }catch(error){
      console.log(error)
    }
  }
};

export const deleteReview = (reviewId, venueId) => {
  return async dispatch => {
    try{
      await axiosOrders.delete(`/reviews/${reviewId}`);
      await axiosOrders.post(`/venues/reRate/${venueId}`);

      dispatch(getVenueReviews(venueId));
      dispatch(getVenue(venueId));
    }catch(error){
      console.log(error)
    }
  }
};