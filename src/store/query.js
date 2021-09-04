import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.BASE_URL;
const JWT_TOKEN = process.env.JWT_TOKEN;

export const myAPI = createApi({
    reducerPath: "myAPI",
    baseQuery: fetchBaseQuery({ baseUrl, headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`
    }}),
    endpoints: builder => ({
        getIntersections: builder.query({
            query: name => "intersection-inventories"
        })
    })
});

export const { useGetIntersectionsQuery } = myAPI;