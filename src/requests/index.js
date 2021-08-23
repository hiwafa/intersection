import axios from "axios";


const { JWT_TOKEN } = process.env;

const baseURL = "http://localhost:1337/";

export const formRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${JWT_TOKEN}`
    },
});

export const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});