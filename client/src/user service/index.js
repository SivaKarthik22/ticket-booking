import axios from 'axios';

export const userAxiosInstance = axios.create({
    baseURL: "/api/users/",
    headers : {
        'Content-Type': 'application/json',
    },
});