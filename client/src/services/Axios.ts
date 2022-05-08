import axios from "axios";
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

export default axios.create({
  baseURL: API_DOMAIN,
});

export const axiosPrivate = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
