import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.BASE_URL;
const JWT_TOKEN = process.env.JWT_TOKEN;

export const intersectionAPI = createApi({
    reducerPath: "intersectionAPI",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getIntersections: builder.query({
            query: name => ({url: name, method: 'GET', headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT_TOKEN}`
            }})
        })
    })
});

export const { useGetIntersectionsQuery } = intersectionAPI;