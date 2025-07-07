import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = "https://e7e7-102-218-85-221.ngrok-free.app/v1";

const ApiConfig = axios.create({ baseURL, timeout: 5000 });


export default ApiConfig;
