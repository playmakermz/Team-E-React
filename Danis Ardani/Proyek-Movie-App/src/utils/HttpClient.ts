import axios from 'axios';
import { API_ACCESS_TOKEN, API_URL } from '@env';

const HttpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_ACCESS_TOKEN}`,
  },
});

HttpClient.interceptors.request.use(
  config => {
    const token = API_ACCESS_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.params = {
      ...config.params,
      api_key: API_ACCESS_TOKEN,
    };

    const fullUrl = `${config.baseURL}${config.url}?${new URLSearchParams(config.params).toString()}`;
    console.log(`Making request to: ${fullUrl}`);

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  response => {
    console.log('Response data:', response.data);
    return response;
  },
  error => {
    console.error('Error response:', error.response);
    return Promise.reject(error);
  }
);

export default HttpClient;
