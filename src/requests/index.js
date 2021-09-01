import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const JWT_TOKEN = process.env.JWT_TOKEN;
// const BASE_URL = "http://localhost:3000/";

export const formRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});
