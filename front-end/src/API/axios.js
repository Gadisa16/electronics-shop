import axios from 'axios';
const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/electronics-shop-59148/us-central1/api" // THE API (cloud function) URL

    // baseURL: "http://localhost:3333" // The API of my local server

    baseURL: "https://electronics-shop-rg1g.onrender.com" //API, URL of the deployed server
});

export { axiosInstance }