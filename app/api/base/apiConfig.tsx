import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = "https://backend-test-mirantes.onrender.com/v1";

const ApiConfig = axios.create({ baseURL, timeout: 5000 });


export default ApiConfig;
