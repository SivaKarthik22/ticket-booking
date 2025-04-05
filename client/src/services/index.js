import axios from 'axios';

export const userAxiosInstance = axios.create({
    baseURL: "/api/users/",
    headers : {
        'Content-Type': 'application/json',
    },
});

export const movieAxiosInstance = axios.create({
    baseURL: "/api/movies/",
    headers : {
        'Content-Type': 'application/json',
    },
});

export const theatreAxiosInstance = axios.create({
    baseURL: "/api/theatres/",
    headers : {
        'Content-Type': 'application/json',
    },
});