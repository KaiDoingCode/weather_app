import axios from "axios";

export const api = axios.create({
    baseURL: 'https://dataservice.accuweather.com',
    timeout: 6000,
});

export const apiKey = 'ybjAX5SNI9XPomXGhDArxkcEjYaMIHk8';