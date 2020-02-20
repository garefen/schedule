import axios from 'axios';

require('dotenv/config');

const api = axios.create({
    baseURL: 'http://localhost:3333'
    // baseURL: 'https://rotina-escolar-backend.herokuapp.com/'
});

export default api;