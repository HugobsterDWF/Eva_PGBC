import axios from 'axios';

const api = axios.create({
  baseURL: 'https://evagbc-ebcmh6bhegfabqat.eastus2-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
