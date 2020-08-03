import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: 'https://api.rawg.io/api',
});

export default axiosConfig;
