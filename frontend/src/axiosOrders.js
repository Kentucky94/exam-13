import axios from 'axios';
import {store} from "./index";
import config from "./config";

const axiosOrders = axios.create({
  baseURL: config.apiURL
});

axiosOrders.interceptors.request.use(config => {
  try{
    config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
  }catch(error){}

  return config;
});

export default axiosOrders;