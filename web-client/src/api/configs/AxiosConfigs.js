import axios from "axios"

export const api = axios.create();
const errorHandler = (error) => {
    const statusCode = error.response?.status
    if (statusCode && statusCode !== 401) {
        //console.log(error)
    }

    return Promise.reject(error)
}
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
});

api.interceptors.request.use(
    (config) => {
        const access =  JSON.parse(localStorage.getItem('access-key'));

        if (access?.token) {
            config.headers.Authorization = `Bearer ${access?.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);