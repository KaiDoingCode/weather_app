import axios from "axios";

export const api = axios.create({
    baseURL: 'http://dataservice.accuweather.com',
    timeout: 6000,
});

export const apiKey = 'LTCkk7NjinGdLl99wwhAeEHNn9TT2uOx';