import axios, {AxiosInstance} from 'axios';

/**
 * Just exports an axios instance with the right API for the rest of the app to use.
 */

export const API = 'http://localhost:5000/api';

const network:AxiosInstance = axios.create({
    baseURL: API
})

export default network;
