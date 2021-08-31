import axios from "axios";

const JWT_TOKEN = process.env.JWT_TOKEN;

const baseURL = process.env.baseURL;
// const baseURL = "http://localhost:3000/";

export const formRequest = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
