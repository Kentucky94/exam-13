import {push} from 'connected-react-router';
import axiosOrders from "../../axiosOrders";
import {toast} from "react-toastify";

export const FETCH_PICTURES_SUCCESS = 'FETCH_PICTURES_SUCCESS';
export const POST_PICTURE_SUCCESS = 'POST_PICTURE_SUCCESS';
export const DELETE_PICTURE_SUCCESS = 'DELETE_PICTURE_SUCCESS';

export const fetchPicturesSuccess = pictures => ({type: FETCH_PICTURES_SUCCESS, pictures});
export const postPictureSuccess = () => ({type: POST_PICTURE_SUCCESS});
export const deletePictureSuccess = () => ({type: DELETE_PICTURE_SUCCESS});

export const fetchPictures = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/pictures');

      dispatch(fetchPicturesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchUserPictures = userId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/pictures/' + userId);

      dispatch(fetchPicturesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const postPicture = pictureData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/pictures', pictureData);

      dispatch(postPictureSuccess());
      toast.success('Picture has been created!');
      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  };
};

export const deletePicture = pictureId => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/pictures/' + pictureId);

      dispatch(deletePictureSuccess());
      toast.warn('Picture has been deleted!');
      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};