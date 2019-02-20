import axios, {AxiosInstance} from 'axios';

/**
 * Just exports an axios instance with the right API for the rest of the app to use.
 */

export let API = process.env.REACT_APP_API;

export function configureAPI() {
    API = process.env.REACT_APP_API;
}
const network:AxiosInstance = axios.create({
    baseURL: API
})

export default network;
