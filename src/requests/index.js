import axios from "axios";


const { JWT_TOKEN } = process.env;

const baseURL = "https://intersection-backend.herokuapp.com/";

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