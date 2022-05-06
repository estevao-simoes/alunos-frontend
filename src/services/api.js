import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.estevao.dev.br/api'
});

export default api;