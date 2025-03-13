import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://collabit-cctc.onrender.com/api/', 
});

export default axiosInstance;