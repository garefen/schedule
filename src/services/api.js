import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://us-central1-rotina-escolar-backend.cloudfunctions.net/app'
    baseURL: 'https://rotina-escolar-backend.herokuapp.com/'
    // baseURL: 'http://localhost:3333'
});

export default api;