import axiosOrders from "../../axiosOrders";

export const GET_VENUE_IMAGES_SUCCESS = 'GET_VENUE_IMAGES_SUCCESS';

export const getVenueImagesSuccess = images => ({type: GET_VENUE_IMAGES_SUCCESS, images});

export const getVenueImages = venueId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/images/${venueId}`);

      dispatch(getVenueImagesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  };
};

export const postVenueImage = (venueId, imageData) => {
  return async dispatch => {
    try{
      await axiosOrders.post(`/images/${venueId}`, imageData);

      dispatch(getVenueImages(venueId));
    }catch(error){
      console.log(error);
    }
  }
};