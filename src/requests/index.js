import axios from "axios";


const { key } = process.env;

export const formRequest = axios.create({
    baseURL: "https://api.domain.com/",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${key}`
    },
});

export const request = axios.create({
    baseURL: "https://api.domain.com/"
});